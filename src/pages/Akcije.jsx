import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Pages.css';
import AkcijaContainer from './components/AkcijaContainer';
import UserContext from '../UserContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Parallaxx from './components/Parallaxx';
import jedan from "./components/assets/1.png"


function Akcije() {
  const [akcije, setAkcije] = useState([]);
  const [value, setValue] = useState("");
  const [mjesta, postaviMjesta] = useState([]);
  const [volonteri, setVolonteri] = useState([]);
  const [organizatori, setOrganizatori] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    ime: "",
    mjesto: "",
    pocetak: "",
    kraj: "",
    opis: "",
    organizator: "",
    volonteri: []
  });

  const { userType } = useContext(UserContext);

  const [sortOrder, setSortOrder] = useState({
    pocetak: 'asc',
    city: 'asc'
  });
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredAkcije = akcije.filter((akcija) => {
    const fullName = `${akcija.akcija.ime}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/mjesta"),
      axios.get("http://localhost:3001/udruge"),
      axios.get("http://localhost:3001/akcije"),
      axios.get("http://localhost:3001/volonteri")
    ])
      .then(([rezMjesta, udruge, akcije, volonteri]) => {
        postaviMjesta(rezMjesta.data);
        setOrganizatori(udruge.data);
        setAkcije(akcije.data);
        setVolonteri(volonteri.data);
      })
      .catch(error => {
        console.error('Greška:', error);
      });
  }, []);
  

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (new Date(formData.kraj) < new Date(formData.pocetak)) {
      alert('AKcija mora početi prije nego završi.');
      return;
    }
  
    const dataToSend = {
      akcija: formData
    };
  
    axios.post('http://localhost:3001/akcije', dataToSend)
      .then(response => {
        setAkcije([...akcije, response.data]);
        setFormData({
          ime: "",
          mjesto: "",
          pocetak: "",
          kraj: "",
          opis: "",
          organizator: "",
          volonteri: []
        });
      })
      .catch(error => {
        console.error('Greška dodavanja akcije:', error);
      });
  };
  

  const sortBy = (key) => {
    const sortedakcije = [...akcije].sort((a, b) => {
        if (sortOrder[key] === 'asc') {
            return a.akcija[key].localeCompare(b.akcija[key]);
        } else {
            return b.akcija[key].localeCompare(a.akcija[key]);
        }
    });
    setAkcije(sortedakcije);
    setSortOrder({ ...sortOrder, [key]: sortOrder[key] === 'asc' ? 'desc' : 'asc' });
};

const SortByTime = () => {
    sortBy('pocetak');
};

const sortByCity = () => {
    sortBy('mjesto');
};

  const handleDelete = id => {
    axios.delete(`http://localhost:3001/akcije/${id}`)
      .then(() => {
        setAkcije(akcije.filter(akcija => akcija.id !== id));
      })
      .catch(error => {
        console.error('Greška u brisanju akcije:', error);
      });
  };

  const addVolunteer = (akcijaId, volunteerName) => {
    const akcijaToUpdate = akcije.find((akcija) => akcija.id === akcijaId);
    if (!akcijaToUpdate) {
      console.error(`Akcija nije pronađena`);
      return;
    }
  
    
    const currentVolonteri = akcijaToUpdate.akcija.volonteri || [];
    if (currentVolonteri.includes(volunteerName)) {
      alert("Volonter je već dodan za ovu akciju.");
      return;
    }
    const updatedVolonteri = [...currentVolonteri, volunteerName];
  
    axios.patch(`http://localhost:3001/akcije/${akcijaId}`, {
      akcija: { ...akcijaToUpdate.akcija, volonteri: updatedVolonteri },
    })
      .then(() => {
        const updatedAkcije = akcije.map((akcija) => {
          if (akcija.id === akcijaId) {
            return {
              ...akcija,
              akcija: {
                ...akcija.akcija,
                volonteri: updatedVolonteri,
              },
            };
          }
          return akcija;
        });
        setAkcije(updatedAkcije);
        setValue("");
      })
      .catch((error) => {
        console.error('Greška dodavanja volontera:', error);
      });
    alert("Dodan volonter: " + volunteerName)
  };
  
  function Label(startDate, endDate) {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > today) {
        return <span style={{color: 'green'}}>Slijedi</span>;
    } else if (end < today) {
        return <span style={{color: 'red'}}>Završilo</span>;
    } else {
        return null;
    }
}
  return (
    <div className="home-container">
       <Parallaxx naslov="AKCIJE!" ratio="4/1" image={jedan}></Parallaxx>
      <div className="header">
        <br></br>
        <p className='news-container'>Pogledajte "Više" kako bi saznali više podataka o akciji, kao i prijavljene volontere. Administrator može dodavati volontere u akcije.</p>
      </div>
      <div className='opcije'>
        <button onClick={SortByTime} className='sortiraj-button' >Sortiraj po datumu</button>
        <button onClick={sortByCity} className='sortiraj-button' >Sortiraj po gradu</button>
      
      <div className="search">
        <input
        className="search__input"
          type="text"
          placeholder="Pretraži po imenu"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      </div>
      <div className="akcije-container">
        {akcije && filteredAkcije.map(akcija => (
          <AkcijaContainer
            key={akcija.id}
            name={`${akcija.akcija.ime}`}
            location={akcija.akcija.mjesto}
            onClickDelete={() => handleDelete(akcija.id)}
          >
            <p>{Label(akcija.akcija.pocetak,akcija.akcija.kraj)}</p>
            <Popup
              trigger={<button className="opsirnije-button"> VIŠE </button>}
              modal
              nested
            >
              {close => (
                <div className="modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <div className="header"> {akcija.akcija.ime} </div>
                  <p>LOKACIJA: {akcija.akcija.mjesto} </p>
                  <p>TRAJANJE: {akcija.akcija.pocetak} do {akcija.akcija.kraj} </p>
                  <p>OPIS: {akcija.akcija.opis} </p>
                  <div className="content">
                    {' '}
                    <p>{akcija.akcija.volonteri.join(', ')}</p>
                  </div>
                  <p>ORGANIZATOR: {akcija.akcija.organizator} </p>


               {(userType=="admin") && <div>  <select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ width: '200px' }}
            >
              <option value="">Odaberi volontera</option>
              {volonteri.map(item => (
                <option key={item.id}>{`${item.volonter.ime} ${item.volonter.prezime}`}</option>
              ))}
            </select>
            <button onClick={() => addVolunteer(akcija.id, value)} className='sortiraj-button'>DODAJ VOLONTERA</button> </div>
          }
            </div>

           
              )}
            </Popup>
          </AkcijaContainer>
        ))}
      </div>
      {userType === "admin" &&
        <div className="add-akcija-form">
          <h2>PRIJAVI AKCIJU</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="ime" placeholder="Ime" value={formData.ime} onChange={handleChange} required />
            <input type="text" name="opis" placeholder="Opis" value={formData.opis} onChange={handleChange} required />
            <input type="date" name="pocetak" placeholder="Početak" value={formData.pocetak} onChange={handleChange} required />
            <input type="date" name="kraj" placeholder="Kraj" value={formData.kraj} onChange={handleChange} required />
            <select
              name='mjesto'
              value={formData.mjesto}
              onChange={handleChange}
              required
            >
              <option value=''>Odaberi mjesto</option>
              {mjesta.map(mjesto => (
                <option key={mjesto.id} value={mjesto.mjesto.ime}>
                  {mjesto.mjesto.ime}
                </option>
              ))}
            </select>


            <select
              name='organizator'
              value={formData.organizator}
              onChange={handleChange}
              required
            >
              <option value=''>Odaberi organizatora</option>
              {organizatori.map(organizator => (
                <option key={organizator.id} value={organizator.udruga.ime}>
                  {organizator.udruga.ime}
                </option>
              ))}
            </select>

            <button type="submit" className='sortiraj-button'>PRIJAVI AKCIJU</button>
          </form>

        </div>
      }
   <br></br>
    </div>
 
  );
}

export default Akcije;
