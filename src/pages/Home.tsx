import React from "react";
// import { Link } from "react-router-dom";
// import { ABOUT_ROUTE } from "../utils/PATHS";
import ModalHello from "../components/modal-hello/ModalHello";
import magicIcon from '../assets/magic-icon.svg?react'
const Home: React.FC = () => {
  return (
    <div>
      {/* <div>Home Page</div>
      <Link to={ABOUT_ROUTE}>to About page</Link> */}
      <ModalHello icon={magicIcon} text="Начать расчет материалов" onClick={() => {}} />
    </div>
  );
};

export default Home;
