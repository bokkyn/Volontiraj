import "./Podaci.css"

function Podaci(props) {
    return (
        
        <div>
         <span className="data">{props.podatak}:</span> <span className="value">{props.value}</span>
        </div>
       
      
    )
}

export default Podaci