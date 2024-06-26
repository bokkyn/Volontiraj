import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pages.css'; 
import './Volonteri.css'; 
import UserContainer from './components/UserContainer'; 
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import UserContext from "../UserContext";
import { useContext } from "react";
import Rating from '@mui/material/Rating';
import Parallaxx from './components/Parallaxx';
import jedan from "./components/assets/4.jpg"



function Volonteri() {
  const [volonteri, setVolonteri] = useState([]);
  const [mjesta, postaviMjesta] = useState([]);
  const [zanimacije, postaviZanimacije] = useState([]);
  const [selectedZanimacija, setSelectedZanimacija] = useState('');
  const { userType } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    mjesto: '',
    zanimacija: '',
    mail: '',
    spol: ''
  });

  const [sortOrder, setSortOrder] = useState({
    surname: 'asc',
    city: 'asc'
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/mjesta"),
      axios.get("http://localhost:3001/zanimacije"),
      axios.get("http://localhost:3001/volonteri")
    ])
      .then(([rezMjesta, rezZanimacije, rezVolonteri]) => {
        postaviMjesta(rezMjesta.data);
        postaviZanimacije(rezZanimacije.data);
        setVolonteri(rezVolonteri.data);
        const initialRatings = {};
        rezVolonteri.data.forEach(volonter => {
            initialRatings[volonter.id] = volonter.ocjena || 0; 
        });
        setRatings(initialRatings);
    })
    .catch(err => console.log(err.message));
}, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = id => {
    axios.delete(`http://localhost:3001/volonteri/${id}`)
      .then(() => {
        setVolonteri(volonteri.filter(volonter => volonter.id !== id));
      })
      .catch(error => {
        console.error('Greška:', error);
      });
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    const dataToSend = {
      volonter: formData
    };
    axios.post('http://localhost:3001/volonteri', dataToSend)
      .then(response => {
        setVolonteri([...volonteri, response.data]);
        setFormData({
          ime: '',
          prezime: '',
          mjesto: '',
          zanimacija: '',
          mail: '',
          spol: ''
        });
      })
      .catch(error => {
        console.error('Greška u dodavanju volontera:', error);
      });
  };

  const sortBy = (key) => {
    const sortedVolonteri = [...volonteri].sort((a, b) => {
        if (sortOrder[key] === 'asc') {
            return a.volonter[key].localeCompare(b.volonter[key]);
        } else {
            return b.volonter[key].localeCompare(a.volonter[key]);
        }
    });
    setVolonteri(sortedVolonteri);
    setSortOrder({ ...sortOrder, [key]: sortOrder[key] === 'asc' ? 'desc' : 'asc' });
};

const sortBySurname = () => {
    sortBy('prezime');
};

const sortByCity = () => {
    sortBy('mjesto');
};


const filterByZanimacija = (zanimacija) => {
  setSelectedZanimacija(zanimacija);
};

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [ratings, setRatings] = useState({});

  const handleRatingChange = (id, newValue) => {
    setRatings({ ...ratings, [id]: newValue }); 
    console.log(`${newValue}`);
    const updatedVolonteri = volonteri.map(volonter => {
        if (volonter.id === id) {
            return {
                ...volonter,
                ocjena: newValue 
            };
        }
        return volonter;
    });
    setVolonteri(updatedVolonteri);

    axios.put(`http://localhost:3001/volonteri/${id}`, updatedVolonteri.find(volonter => volonter.id === id))
        .then(response => {
            console.log('Rating updated successfully:', response.data);
        })
        .catch(error => {
            console.error('Error updating rating:', error);
        });
};


  const filteredVolonteri = volonteri.filter((volonter) => {
    const fullName = `${volonter.volonter.ime} ${volonter.volonter.prezime}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const opisi = [
    "Volontiram već nekoliko godina i mogu reći da je to jedno od najboljih iskustava u mom životu.",
    "Pomaganje drugima i zajednici mi puno znači, volontiranje mi omogućava da to učinim na način koji je istodobno i zanimljiv i ispunjavajući.",
    "Volontiram u lokalnoj bolnici, gdje sam pomažem medicinskom osoblju u njihovim svakodnevnim zadacima.",
    "Volontirajući imam priliku upoznati mnoge zapanjujuće ljude i naučiti se nekim novim vještinama.",
    "Volontiranjem, osjećam se kao da doprinosim nečemu većem od sebe i da pomažem svojoj zajednici.",
    "Sudjelovanje u volontiranju me naučilo važnosti timskog rada i međusobne podrške, što mi pomaže u svim aspektima života.",
    "Volontiranje mi otvara vrata novim prilikama i mogućnostima za osobni i profesionalni razvoj, te me inspirira da budem bolja verzija sebe.",
    "Kroz volontiranje se može shvatiti koliko je važno biti svjestan potreba drugih i kako možemo zajedno graditi bolje društvo za sve nas."
  ];
  
  const RandomOpis = () => {
    const randomIndex = Math.floor(Math.random() * opisi.length);
    return opisi[randomIndex];
  };

  return (
    <div className="home-container">
 <Parallaxx naslov="VOLONTERI!" ratio="4/1" image={jedan}></Parallaxx>
     
      <div className="search">

      <div className='opcije'>
      <div className="filter-zanimacija">
        <select
          value={selectedZanimacija}
          onChange={(e) => filterByZanimacija(e.target.value)}
        >
          <option value="">Svi</option>
          {zanimacije.map(zanimacija => (
            <option key={zanimacija.id} value={zanimacija.zanimacija.ime}>
              {zanimacija.zanimacija.ime}
            </option>
          ))}

        </select>
      </div>
          <button onClick={sortBySurname} className='sortiraj-button'>Sortiraj po prezimenu</button>
          <button onClick={sortByCity} className='sortiraj-button'>Sortiraj po mjestu</button>
        
      
        <input
        className="search__input"
          type="text"
          placeholder="Pretraži po imenu"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      </div>
      <div className="volonteri-container">
        {filteredVolonteri.filter(volonter => !selectedZanimacija || volonter.volonter.zanimacija === selectedZanimacija).map(volonter => (
          <div>
          <UserContainer
            key={volonter.id}
            image={`https://xsgames.co/randomusers/avatar.php?g=${volonter.volonter && volonter.volonter.spol === 'M' ? 'male' : 'female'}&email=${encodeURIComponent(volonter.volonter && volonter.volonter.mail)}`}
            name={`${volonter.volonter.ime} ${volonter.volonter.prezime}`}
            location={volonter.volonter.mjesto}
            onClickDelete={() => handleDelete(volonter.id)}
            className="container"
          >


      
      <Rating 
      name={`rating-${volonter.id}`} 
      value={ratings[volonter.id] || 0} 
      onChange={(event, newValue) => handleRatingChange(volonter.id, newValue)} 
      precision={0.5}
      disabled={userType !== 'admin'}/>


              <br></br>
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
                  <div className="header"> {`${volonter.volonter.ime} ${volonter.volonter.prezime}`} </div>
                  <p>LOKACIJA: {volonter.volonter.mjesto} </p>
                  <p>ZANIMACIJA: {volonter.volonter.zanimacija} </p>
                  <div className="content">
                    {' '}
                    <p>{RandomOpis()}</p>
                  </div>
                  <p>KONTAKT MAIL: {volonter.volonter.mail} </p>
                </div>
              )}
            </Popup>

          </UserContainer>
          </div>
        ))}
      </div>
      <div className="add-volonter-form">
        
        <Popup
    trigger={open => (
      
      <h2>PRIJAVI VOLONTERA</h2>
    
    )}
    on={['hover', 'focus']}
    closeOnDocumentClick
    position="left center"
  >
    <span> Logiraj se kako bi dodao volontere! </span>
  </Popup>
        {(userType=="user" || userType=="admin") && <form onSubmit={handleSubmit}>
          <input type="text" name="ime" placeholder="Ime" value={formData.ime} onChange={handleChange} required/>
          <input type="text" name="prezime" placeholder="Prezime" value={formData.prezime} onChange={handleChange} required />
          <select
            name='mjesto'
            value={formData.mjesto}
            onChange={handleChange}
            required
          >
            <option value=''> Odaberi mjesto </option>
            {mjesta.map(mjesto => (
              <option key={mjesto.id} value={mjesto.mjesto.ime}>
                {mjesto.mjesto.ime}
              </option>
              
            ))}
          </select>
          <input type="email" name="mail" placeholder="Email" value={formData.mail} onChange={handleChange} required />
          <select
            name='zanimacija'
            value={formData.zanimacija}
            onChange={handleChange}
            required
          >
            <option value=''> Odaberi zanimaciju </option>
            {zanimacije.map(zanimacija => (
              <option key={zanimacija.id} value={zanimacija.zanimacija.ime}>
                {zanimacija.zanimacija.ime}
              </option>
            ))}
          </select>
          <div className="gender">
            <label>
              Muškarac
              <input
                type="radio"
                name="spol"
                value="M"
                checked={formData.spol === 'M'}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Žena
              <input
                type="radio"
                name="spol"
                value="F"
                checked={formData.spol === 'F'}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <button type="submit">PRIJAVI VOLONTERA</button>
        </form>}

      </div>

    </div>
  );
}

export default Volonteri;
