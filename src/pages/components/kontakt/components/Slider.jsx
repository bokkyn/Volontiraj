import "./slider.css"
function Slider(props){

    return(
        
        <div className="background">
            <span className="skill">{props.skill}</span>
        <div className="sliderBackgound">
             <div className="sliderForeground" style={{ width: props.number }}>
            <span className="broj">{props.number}</span>
            
            </div>
        </div>
        </div>

    )
}

export default Slider