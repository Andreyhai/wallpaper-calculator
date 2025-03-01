import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { ABOUT_ROUTE } from "../utils/PATHS";
import ModalHello from "../components/modal-hello/ModalHello";
import magicIcon from '../assets/magic-icon.svg?react'
import ModalCalculator from "../components/modal-calculator/ModalCalculator";
const Home: React.FC = () => {

  const [isHelloOpen, setIsHelloOpen] = useState<boolean>(true)

  const openCalculator = () => {
    setIsHelloOpen(false)
  }

  const closeCalculator = () => {
    setIsHelloOpen(true)
  }

  return (
    <div>
      {isHelloOpen && <ModalHello icon={magicIcon} text="Начать расчет материалов" openCalculator={openCalculator} />}
      {!isHelloOpen && <ModalCalculator icon={magicIcon} openCalculator={closeCalculator} />}

    </div>
  );
};

export default Home;
