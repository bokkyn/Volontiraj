import React from "react";
import "./Parallax.css"
import { Parallax, ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

import { useState, useEffect } from "react";


function Parallaxx(props) {

  const [fontSize, setFontSize] = useState(700); 

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newSize = 700 - (scrollPosition * 0.5); 
      setFontSize(newSize);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
 
  return (
    <>
      <ParallaxBanner style={{ aspectRatio:props.ratio}}>
        <ParallaxBannerLayer className="banner" image={props.image} speed={-50} />
        <Parallax speed={-40}>
          <div className="slow">
            <p className="naslov" style={{ fontSize: `${fontSize}%` }}>{props.naslov}</p>
          </div>
        </Parallax>
      </ParallaxBanner>
    </>
  );
}

export default Parallaxx;