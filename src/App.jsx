import Navbar from "./Navbar"
import Footer from "./Footerr"
import Akcije from "./pages/Akcije"
import Home from "./pages/Home"
import Kontakt from "./pages/Kontakt"
import Udruge from "./pages/Udruge"
import Volonteri from "./pages/Volonteri"
import Login from "./pages/Login"
import { Route, Routes } from "react-router-dom"
import UserContext, { UserProvider } from './UserContext';
import "./App.css"
import { ParallaxProvider } from "react-scroll-parallax"

function App() {
  return (
    <>
    <ParallaxProvider>
     <UserProvider>

     <Navbar />
     
      
     <div className="container">
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/akcije" element={<Akcije />} />
         <Route path="/kontakt" element={<Kontakt />} />
         <Route path="/udruge" element={<Udruge />} />
         <Route path="/volonteri" element={<Volonteri />} />
         <Route path="/login" element={<Login />} />
       </Routes>
     </div>
     <Footer />
     </UserProvider>
     </ParallaxProvider>
    
    </>
  )
}

export default App