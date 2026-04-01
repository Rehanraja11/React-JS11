import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Naavbaar from './Header/Naavbaar'

const Home = () => {

  const Hero = () => (
  <header className="hero">
    <h1>Welcome to Our Modern React Site</h1>
    <p>Building beautiful user interfaces with ease.</p>
    <button className="cta-button">Get Started</button>
  </header>
);

const Features = () => {
  const features = ["Fast Performance", "Responsive Design", "Component-Based"];
  return (
    <section id="features" className="features-section">
      <h2>Why Choose Us?</h2>
      <div className="feature-list">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">{feature}</div>
        ))}
      </div>
    </section>
  );
};
  return(
    <>
  <Hero/>
  <Features/>
   </>
  )
}

const About = () => {
  return(
  <h1 style={{textAlign:'center'}}>About Page</h1>
  )
}


const Contact = () => {
  return(
  <h1 style={{textAlign:'center'}}>Contact Page</h1>
  )
}





const App = () => {

  return (
    <BrowserRouter>
    <Naavbaar/>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App  