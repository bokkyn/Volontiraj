import './Naslov.css'; 
const Naslov = (props) => {
  return (
    <div className="naslov-container">
      <h1 className="naslov-heading">{props.tekst}</h1>
      <div className="naslov-line"></div>
    </div>
  );
};

export default Naslov;