import React, { useState, useContext } from 'react';
import './Pages.css'; 
import './Login.css';
import UserContext from '../UserContext';

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
      <div className="header">
        <h2>PRIJAVA</h2>
      </div>
      {userType === 'logout' && (
        <div>
          <form className="form" onSubmit={handleLogin}>
            <div className="title">
              Dobrodošli<br />
            </div>
            <input 
              className="input" 
              name="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              className="input" 
              name="password" 
              placeholder="Password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button-confirm" type="submit">PRIJAVA</button>
          </form>
        </div>
      )}
      {userType!=="logout" && (
      <button className="button-logout" onClick={setUserAsLogout}>Odjavite se</button>
      )
      }
            {userType=="admin" && (
      <p>Prijavljeni ste kao administrator! Sada uz pregled volontera, određene možete i brisati,
        ocijeniti, dodavati nove. Također, uz pregled akcija, neželjene možete ukloniti, a u akciju prijaviti članove
        koji su izrazili želju za sudjelovanjem.
        Ne zaboravite pogledati i sekciju "Udruge", gdje možete prihvatiti ili odbiti zahtjev za registracijom
        udruge koji su korisnici poslali.
      </p>
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


    </div>
  );
}
  
export default Login;
