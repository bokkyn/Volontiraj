import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "./Container";
import dva from "./assets/2.jpg"
import jedan from "./assets/1.png"
import tri from "./assets/3.jpg"
import cetiri from "./assets/4.jpg"
import "./CenterMode.css"

function CenterMode() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
        <Container image={jedan} naslov="Kako Volontiranje Utječe na Psihološko Blagostanje" tekst="Volontiranje je čin altruizma koji ima dubok i višestruki utjecaj na psihološko blagostanje pojedinca. Kroz svoju sposobnost da pomogne drugima ili doprinese zajednici, volontiranje može pozitivno utjecati na mentalno zdravlje pojedinca na različitim razinama.

Prvo, volontiranje može pružiti osjećaj svrhe i zadovoljstva. Kada se pojedinac angažira u aktivnostima volontiranja, osjeća se korisnim i važnim za druge ljude i zajednicu. Taj osjećaj svrhe može pomoći u poboljšanju samopouzdanja i samopoštovanja, jer pojedinac shvaća da njegovi napori imaju stvaran utjecaj na svijet oko njega.

Drugo, volontiranje može pružiti priliku za socijalnu interakciju i izgradnju međuljudskih odnosa. Kroz volontiranje, pojedinac može upoznati ljude sličnih interesa i vrijednosti, što može dovesti do novih prijateljstava i podrške. Ova socijalna povezanost može imati pozitivan utjecaj na emocionalno blagostanje pojedinca, pružajući mu osjećaj pripadnosti i podrške u teškim vremenima.

Treće, volontiranje može potaknuti osjećaj zahvalnosti i empatije. Rad s ljudima koji su u potrebi može potaknuti osobu da cijeni svoje vlastite privilegije i postane zahvalnija za ono što ima. Također, suočavanje s izazovima i poteškoćama drugih može potaknuti empatiju i saosjećanje kod pojedinca, što može povećati razumijevanje i suosjećajnost prema drugima.

Četvrto, volontiranje može pružiti priliku za osobni razvoj i učenje novih vještina. Kroz volontiranje, pojedinac može razviti vještine kao što su timski rad, komunikacija, upravljanje vremenom i rješavanje problema. Ovi novi izazovi i postignuća mogu povećati samopouzdanje i osjećaj kompetentnosti kod pojedinca.

Na kraju, volontiranje može imati i fizičke koristi za mentalno zdravlje. Aktivnosti volontiranja često uključuju fizičku aktivnost ili kretanje, što može doprinijeti smanjenju stresa i poboljšanju općeg osjećaja blagostanja.

Ukratko, volontiranje može imati dubok i pozitivan utjecaj na psihološko blagostanje pojedinca kroz pružanje osjećaja svrhe i zadovoljstva, poticanje socijalne interakcije i izgradnje odnosa, poticanje zahvalnosti i empatije, pružanje prilike za osobni razvoj i učenje novih vještina, te pružanje fizičkih koristi za mentalno zdravlje. Stoga, poticanje i podržavanje volontiranja može biti važan dio programa za poboljšanje psihološkog blagostanja pojedinaca i zajednica u cjelini."></Container>
        </div>
        <div>
        <Container image={dva} naslov="Kako Iskustvo Dobrovoljnog Rada Obogaćuje Karijeru" tekst="Često se podcijenjuje koliko volontiranje može imati pozitivan uticaj na karijeru pojedinca. Iskustvo dobrovoljnog rada obogaćuje karijeru na nekoliko načina. Prvo, pruža priliku za razvoj novih vještina i stjecanje iskustva koje može biti korisno u profesionalnom kontekstu. Drugo, volontiranje omogućuje izgradnju mreže kontakata i povezivanje s ljudima u sličnim ili povezanim područjima. Treće, angažman u volonterskim aktivnostima može pokazati poslodavcima vašu predanost, inicijativu i sposobnost timskog rada. Ukratko, dobrovoljni rad može dodati vrijednost vašoj karijeri pružajući priliku za osobni razvoj, povećanje profesionalne mreže i demonstraciju vaših vještina i sposobnosti."></Container>
        </div>
        <div>
        <Container image={tri} naslov="Tehnologija i Dobro: Volontiranje u Digitalnom Dobu" tekst="U digitalnom dobu, tehnologija je transformirala način na koji ljudi volontiraju i pružila nove mogućnosti za dobročinstvo. Ovo moderno doba donosi brojne inovacije koje omogućuju ljudima da volontiraju na daljinu, povežu se s organizacijama širom svijeta i pruže podršku u hitnim situacijama.

Virtualno volontiranje postaje sve popularnije putem raznih platformi, omogućujući ljudima da volontiraju iz udobnosti vlastitog doma. Crowdsourcing platforme olakšavaju brzu organizaciju i podršku u hitnim situacijama, dok društvene mreže omogućuju organizacijama da dosegnu veći broj ljudi i mobiliziraju ih za volontiranje.

Aplikacije za mobilne uređaje često nude korisnicima jednostavan pristup informacijama o volonterskim prilikama i omogućuju praćenje napretka. Online edukacija i resursi pružaju volonterima mogućnost da razvijaju svoje vještine i znanje kako bi još učinkovitije pridonosili svojim zajednicama."></Container>
        </div>
        <div>
        <Container image={cetiri} naslov="Dobrovoljni Rad Povezuje Različite Generacije" tekst="Volontiranje je aktivnost koja povezuje ljude svih uzrasta i generacija. Dobrovoljni rad povezuje različite generacije kroz zajedničku svrhu i aktivnosti. Kroz volontiranje, mladi i stariji ljudi mogu dijeliti iskustva, učiti jedni od drugih i izgraditi međugeneracijsko razumijevanje i poštovanje. Ova međusobna interakcija doprinosi jačanju zajednice i promicanju solidarnosti među generacijama."></Container>
        </div>
      </Slider>
    </div>
  );
}

export default CenterMode;
