import React from 'react';
import './Pages.css'; 
import CenterMode from './components/CenterMode';
import Counter from './components/Counter';
import Newsletter from './components/Newsletter';


function Home() {
  return (
    <div className="home-container">
      <div className="header">
        <h1>Naslovnica</h1>
      </div>
      <CenterMode></CenterMode>
      <div className="news-container">
        
      </div>
      <Counter name="Broj dostupnih volontera" page='http://localhost:3001/volonteri'></Counter>
      <Counter name="Broj prijavljenih udruga" page='http://localhost:3001/udruge'></Counter>
      <Counter name="Broj prijavljenih akcija" page='http://localhost:3001/akcije'></Counter>
      <br></br>
      <Newsletter></Newsletter>
    </div>
   
  );
}

export default Home;
