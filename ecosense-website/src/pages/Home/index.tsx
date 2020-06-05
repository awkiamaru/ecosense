import React from "react";
import { FiLogIn } from "react-icons/fi";
import logo from "../../assets/logo.svg";
import "./styles.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Logo ecosense" />
        </header>

        <main>
          <h1>Your market of collect recyclable waste</h1>
          <p>We help people find collect points </p>

          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>Register collect point</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
