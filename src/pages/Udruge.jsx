import './Pages.css'; 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UdrugeContainer from './components/UdrugeContainer';
import UdrugeContainerNePr from './components/UdrugeContainerNePr';
import { useContext } from 'react';
import UserContext from '../UserContext';
import Rating from '@mui/material/Rating';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Parallaxx from './components/Parallaxx';
import image from "./components/assets/2.jpg"


function Udruge() {
  const { userType } = useContext(UserContext);
  const [udruge, setUdruge] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [mjesta, postaviMjesta] = useState([]);
  const [ratings, setRatings] = useState({});

  const [formData, setFormData] = useState({
    ime: '',
    mjesto: '',
    mail: '',
    sluzbeno:false
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.all([
      axios.get("http://localhost:3001/mjesta"),
      axios.get("http://localhost:3001/udruge")
    ])
    .then(axios.spread((mjestaResponse, udrugeResponse) => {
      postaviMjesta(mjestaResponse.data);
      setUdruge(udrugeResponse.data);
      const initialRatings = {};
      udrugeResponse.data.forEach(udruga => {
          initialRatings[udruga.id] = udruga.ocjena || 0; 
      });
      setRatings(initialRatings)
    }))
    .catch(error => {
      console.error('Greška:', error);
    });
  }, []);
  const [votedIds, setVotedIds] = useState([]);

  const handleRatingChange = (id, newValue) => {
      if (votedIds.includes(id)) {
          alert("Već ste ocjenili ovu udrugu.");
          return;
      }
      setRatings({ ...ratings, [id]: newValue });
  
      setVotedIds([...votedIds, id]);
      const updatedUdruge = udruge.map(udruga => {
          if (udruga.id === id) {
              const newTotalRating = (udruga.ocjena || 0) * udruga.brojOcjena + newValue;
              const newNumberOfRatings = (udruga.brojOcjena || 0) + 1;
              const newAverageRating = newTotalRating / newNumberOfRatings;
  
              console.log(`ocjena: ${newValue}`);
              console.log(`zbroj ${newTotalRating}`);
              console.log(`broj glasova ${newNumberOfRatings}`);
              return {
                  ...udruga,
                  ocjena: newAverageRating, 
                  brojOcjena: newNumberOfRatings 
              };
          }
          return udruga;
      });
      setUdruge(updatedUdruge);
      axios.put(`http://localhost:3001/udruge/${id}`, updatedUdruge.find(udruga => udruga.id === id))
          .then(response => {
              console.log('Ocjenjeno:', response.data);
          })
          .catch(error => {
              console.error('Greška:', error);
          });
  };
  
  const handleSort = (option) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortOrder('asc'); 
    }
  };

  const handleDelete = id => {
    axios.delete(`http://localhost:3001/udruge/${id}`)
      .then(() => {
        setUdruge(udruge.filter(udruga => udruga.id !== id));
      })
      .catch(error => {
        console.error('Greška u brisanju:', error);
      });
  };

  const handlePrihvati = id => {
    const updatedUdruga = udruge.find(udruga => udruga.id === id);
    if (updatedUdruga) {
      updatedUdruga.udruga.sluzbeno = true;
      axios.put(`http://localhost:3001/udruge/${id}`, updatedUdruga)
       .then(() => {
          setUdruge(udruge.map(udruga => udruga.id === id? updatedUdruga : udruga));
        })
       .catch(error => {
          console.error('Greška:', error);
        });
    }
  };


  const sortedUdruge = [...udruge].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' ? a.udruga.ime.localeCompare(b.udruga.ime) : b.udruga.ime.localeCompare(a.udruga.ime);
    } else if (sortBy === 'city') {
      return sortOrder === 'asc' ? a.udruga.mjesto.localeCompare(b.udruga.mjesto) : b.udruga.mjesto.localeCompare(a.udruga.mjesto);
    }
    return 0;
  });

  const handleSubmit = e => {
    e.preventDefault();
    const dataToSend = {
      udruga: formData
    };
    axios.post('http://localhost:3001/udruge', dataToSend)
      .then(response => {
        setUdruge([...udruge, response.data]);
        setFormData({
          ime: '',
          mjesto: '',
          mail: '',
          sluzbeno:false
        });
      })
      .catch(error => {
        console.error('Greška:', error);
      });
      alert("Zahtjev poslan na odobrenje administratoru.")
  };

  return (
    <div className="home-container">
      
      <Parallaxx naslov="UDRUGE!" ratio="4/1" image={image}></Parallaxx>
      
      <Popup
    trigger={open => (
      
<h1>Kako registrirati udrugu?</h1>


    
    )}
    on={['hover', 'focus']}
    closeOnDocumentClick
    position="left center"
  >
    <span> Logirajte se da registrirate udrugu. Admin prijavu treba prihvatiti. </span>
  </Popup>
  <p>Svaki prijavljeni građanin može poslati zahtjev za registracijom udruge. Nakon što ispuni sve podatke, prijava se šalje na odobrenje administratoru. </p>
<p>Administrator može vidjeti sve prijave, te ih prihvatiti ili odbiti.</p>

      <div className="opcije">
        <div>
          <button onClick={() => handleSort('name')} className='sortiraj-button'>Sortiraj po imenu</button>
          <button onClick={() => handleSort('city')} className='sortiraj-button'>Sortiraj po mjestu</button>
        </div>
      </div>
      <div className="udruge-container">
      {sortedUdruge.map(udruga => (
  udruga.udruga.sluzbeno ? (
    <div key={udruga.id} className="udruga-container">
      <UdrugeContainer
        name={udruga.udruga.ime}
        mjesto={udruga.udruga.mjesto}>
        <Rating 
        name={`rating-${udruga.id}`} 
        value={ratings[udruga.id] || 0}
        onChange={(event, newValue) => handleRatingChange(udruga.id, newValue)} 
        precision={0.5}
        disabled={userType== "logout"}
       
      /> 
      <p>({udruga.brojOcjena})</p>
        </UdrugeContainer>

      
    </div>
  ) : null
))}
      </div>
      <br></br>
      {userType=="admin" && <div className="nesluzbene-udruge-container">
 
      {sortedUdruge.map(udruga => (
  !udruga.udruga.sluzbeno ? (
    <div key={udruga.id} className="nesluzbena-udruga-container">
      <UdrugeContainerNePr
        name={udruga.udruga.ime}
        mjesto={udruga.udruga.mjesto}
        onClickDelete={() => handleDelete(udruga.id)}
        onClickPrihvati={()=>handlePrihvati(udruga.id)}
      />
    </div>
  ) : null
))}
      </div>}
  <br></br>
      {userType == "user" && 
      <div className="add-akcija-form">
        <h2>REGISTRIRAJ UDRUGU</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="ime" placeholder="Ime" value={formData.ime} onChange={handleChange} />
          <input type="mail" name="mail" placeholder="Mail" value={formData.mail} onChange={handleChange} />
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
          <button type="submit" className='sortiraj-button'>REGISTRIRAJ UDRUGU</button>
        </form>
      </div>
      }
<br></br>
    </div>
  );
}

export default Udruge;



