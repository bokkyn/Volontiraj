import React, { useState, useContext } from 'react';
import './Pages.css'; 
import './Login.css';
import UserContext from '../UserContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Parallaxx from './components/Parallaxx';
import jedan from "./components/assets/1.png"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState("LOGIN");
  const { userType, setUserType } = useContext(UserContext);

  const setUserAsAdmin = () => {
    setUserType('admin');
  };

  const setUserAsUser = () => {
    setUserType('user');
  };

  const setUserAsLogout = () => {
    setUserType('logout');
  };


  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin' && password === 'admin') {
      console.log('Logged in as admin');
      setUserAsAdmin();
      setLoginType("ADMIN");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*\d).{8,}$/;
      
      if (!emailRegex.test(email)) {
        alert('Invalid email format');
        return;
      }

      if (!passwordRegex.test(password)) {
        alert('Password must contain at least one digit and be at least 8 characters long');
        return;
      }

      console.log('Logged in as user');
      setLoginType("USER");
      setUserAsUser();
    }
  };

  return (
    <div className="home-container">
            <Parallaxx naslov="VOLONTIRAJ!" ratio="3/1" image={jedan}></Parallaxx>
      
      <br></br>
      <br></br>
      <div className="header">
        <h2>PRIJAVA</h2>
      </div>
      {userType === 'logout' && (
        <div>
         
         
         <form className="form" onSubmit={handleLogin}>

  <div className="flex-column">
    <label>Email</label>
  </div>
  <div className="inputForm">
    <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg"><g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
    <input 
      type="text" 
      className="input" 
      placeholder="Email" 
      name="email" 
      value={email} 
      autoComplete='off'
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <div className="flex-column">
    <label>Lozinka</label>
  </div>
  <div className="inputForm">
    <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
    <input 
      type="password" 
      className="input" 
      placeholder="Lozinka" 
      name="password" 
      value={password} 
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>


  <div className="flex-row">
  <Popup
    trigger={open => (
      
      <span className="span">Zaboravili ste lozinku?</span>
    
    )}
    on={['hover', 'focus']}
    closeOnDocumentClick
    position="left center"
  >
    <span> Nema veze. Ionako ovdje nitko nema svoju lozinku. <br></br> Upiši što god želiš. <br></br> Da se prijaviš kao ADMIN:<br></br>email: admin<br></br> lozinka: admin </span>
  </Popup>
  
  </div>
  <button className="button-submit" type="submit">PRIJAVA</button>


  <Popup
    trigger={open => (
      
      <p className="p">Kako se prijaviti kao administrator?</p>
    
    )}
    on={['hover', 'focus']}
    closeOnDocumentClick
    position="left center"
  >
    <span> Da se prijaviš kao USER upiši ispravan mail i lozinku. <br></br> Da se prijaviš kao ADMIN:<br></br>email: admin<br></br> lozinka: admin </span>
  </Popup>


</form>

        </div>
      )}

            {userType=="admin" && (
              <div>
 

      <br></br>
      <p className='news-container'>Prijavljeni ste kao administrator! Sada uz pregled volontera, određene možete i brisati,
        ocijeniti, dodavati nove. Također, uz pregled akcija, neželjene možete ukloniti, a u akciju prijaviti članove
        koji su izrazili želju za sudjelovanjem.
        Ne zaboravite pogledati i sekciju "Udruge", gdje možete prihvatiti ili odbiti zahtjev za registracijom
        udruge koji su korisnici poslali.
      </p>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      
      </div>
      )
      }
                  {userType=="user" && (
      <p>Prijavljeni ste kao korisnik! Sada uz pregled volontera, određene možete dodavati nove. Samo napišite ime vas ili vaših
        prijatelja koje želite dodati u registar volontera i ispunite podatke.
         Također možete vidjeti aktivne, nadolazeće i gotove volonterske akcije,
         popis volonterskih udruga kojima se možete javiti, a možete ih i ocjeniti! 
                    Na naslovnici će te pronaći razne zanimljive podatke i članke o volontiranju,
                    kao i statistiku prijavljenih članova, organizacija i slično!
      </p>
      )
      }
                        {userType=="logout" && (
      <p>Prijavite se kako bi mogli registrirati vas ili vaše prijatelje u registar volontera SDŽ, 
        sudjelovati u raznim akcijama, ocijeniti volonterske udruge i još mnogo toga!
      </p>
      )
      }
            {userType!=="logout" && (
      <button className="sortiraj-button" onClick={setUserAsLogout}>Odjavite se</button>
      )
      }
  <br></br>
  <br></br>

    </div>
  );
}
  
export default Login;
