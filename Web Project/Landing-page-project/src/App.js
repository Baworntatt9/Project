import React from "react";
import "./styles.css";
import NavBar from "./components/NavBar";
import CountdownTimer from "./components/CountdownTimer";
import Rating from "./components/Rating";

const App = () => {
  return (
    <>
      <NavBar />
      <section id="home" className="hero">
        <h1>Smart Thermal Bottle </h1>

        <p>A very cool thermal bottle made by us.</p>

        <img id="picBottle1" src="/image/sb1.png" alt="Bottle1" />
        <img id="picBottle1" src="/image/sb2.png" alt="Bottle2" />
        <img id="picBottle2" src="/image/sb3.png" alt="Bottle3" />
        <img id="picBottle2" src="/image/sb4.png" alt="Bottle4" />
        <br />
        <br />
        <button id="now">Buy Now</button>
      </section>

      <section id="features" className="features">
        <div>
          <h3>Temperature Retention</h3>
          <p>Keeps your drinks hot or cold for hours.</p>
        </div>
        <div>
          <h3>Premium Quality</h3>
          <p>Made with high-grade stainless steel, mined by Boon.</p>
        </div>
        <div>
          <h3>Eco-Friendly</h3>
          <p>No plastic wastes.</p>
        </div>
      </section>

      <section id="benefits" className="features">
        <div>
          <h3>Lightweight</h3>
          <p>Feels like feather.</p>
        </div>
        <div>
          <h3>Spill-Proof Lid</h3>
          <p>Silicone rubber seals, No leakage.</p>
        </div>
        <div>
          <h3>Stylish Look</h3>
          <p> Modern elegance, perfect for everyday use.</p>
        </div>
      </section>
      <section id="flash sales" className="fs">
        <div className="fs-content">
          <CountdownTimer initialTime={3600} />
          <p>We sell it for 25 satang each, buy now!</p>
          <button className="fs-button">Shop Now</button>
        </div>
      </section>

      <section id="rate us" className="cta">
        <div>
          <h1 id="Ru">Rate Us</h1>
          <Rating />
        </div>
      </section>

      <footer>
        <p>&copy; 2024 Boon's Thermal Bottle. All rights reserved.</p>
      </footer>
    </>
  );
};

export default App;
