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
      <div className="header">
        <h1>Volonteri</h1>
      </div>
      <div className="search">
        <input
        className="search__input"
          type="text"
          placeholder="Pretraži po imenu"
          value={searchQuery}
          onChange={handleSearchChange}
        /><svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
        <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
        </g>
    </svg>
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
              trigger={<button className="opsirnije-button"> Opširnije </button>}
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
        <h2>PRIJAVI VOLONTERA</h2>
        {(userType=="user" || userType=="admin") && <form onSubmit={handleSubmit}>
          <input type="text" name="ime" placeholder="Ime" value={formData.ime} onChange={handleChange} required/>
          <input type="text" name="prezime" placeholder="Prezime" value={formData.prezime} onChange={handleChange} required />
          <select
            name='mjesto'
            value={formData.mjesto}
            onChange={handleChange}
            required
          >
            <option value=''>--Odaberi mjesto--</option>
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
            <option value=''>--Odaberi zanimaciju--</option>
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
        <div>
          <button onClick={sortBySurname}>Sortiraj po prezimenu {sortOrder.surname === 'asc' ? '▲' : '▼'}</button>
          <button onClick={sortByCity}>Sortiraj po mjestu {sortOrder.city === 'asc' ? '▲' : '▼'}</button>
        </div>
      </div>
      <div className="filter-zanimacija">
        <h2>Filter:</h2>
        <select
          value={selectedZanimacija}
          onChange={(e) => filterByZanimacija(e.target.value)}
        >
          <option value="">All</option>
          {zanimacije.map(zanimacija => (
            <option key={zanimacija.id} value={zanimacija.zanimacija.ime}>
              {zanimacija.zanimacija.ime}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Volonteri;
