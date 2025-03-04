import React from "react";
import styles from "./ModalHello.module.scss";
import { motion } from "framer-motion";

interface IconButtonProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  openCalculator: () => void;
}

const ModalHello: React.FC<IconButtonProps> = ({
  icon: Icon,
  text,
  openCalculator
}) => {

  return (
    <motion.section
    initial={{ y: -100, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ type: "spring", stiffness: 100, duration: 0.8 }} 
    className={styles.modalWrapper}>
      <article className={styles.modalContent}>
        <h1>Калькулятор обоев</h1>
        <p>
          Онлайн-калькулятор расчета обоев поможет вам определить число рулонов,
          требуемых для оклеивания, с учетом окон и дверей. Чтобы получить
          точные результаты, просто укажите параметры помещения и размеры в
          специальной таблице. Наша программа также берет в учет повторение
          рисунка (раппорт), что позволяет оптимизировать расходы на материалы и
          клей.
        </p>
        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.03 }}
          onClick={openCalculator}
          className={styles.button}
        >
          <Icon className={styles.buttonIcon} aria-hidden="true" />
          <span>{text}</span>
        </motion.button>
      </article>
    </motion.section>
  );
};

export default ModalHello;
