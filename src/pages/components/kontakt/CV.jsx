
import Podaci from './components/Podaci.jsx';
import Profilna from './components/Profilna.jsx';
import Okvir from "./components/Okvir.jsx"
import Slider from "./components/Slider.jsx"
import Naslov from "./components/Naslov.jsx"

function CV() {
  return (
    <div>
      <Profilna link="https://d112y698adiu2z.cloudfront.net/photos/production/user_photos/002/693/965/datas/profile.jpg"></Profilna>
      <Okvir>
        <Naslov tekst="Borna Goreta"></Naslov>
      <Podaci podatak="Grad" value="Split" ></Podaci>
      <Podaci podatak="Srednja škola" value="3. gimnazija Split" ></Podaci>
      <Podaci podatak="Fakultet" value="FESB" ></Podaci>
      <Podaci podatak="IG" value="bokkyn" ></Podaci>
      <Podaci podatak="GitHub" value="https://github.com/bokkyn" ></Podaci>
      </Okvir>
      <br></br>

    </div>
  );
}

export default CV;
