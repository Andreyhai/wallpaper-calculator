import React from "react";
import styles from "./ModalHello.module.scss"; // Импортируем стили
import { motion } from "framer-motion"; // Импортируем framer-motion

interface IconButtonProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  onClick?: () => void;
}

const ModalHello: React.FC<IconButtonProps> = ({
  icon: Icon,
  text,
  onClick,
}) => {
  return (
    <motion.div
    initial={{ y: -100, opacity: 0 }}  // Начальное положение и прозрачность
      animate={{ y: 0, opacity: 1 }}  // Конечное положение и прозрачность
      transition={{ type: "spring", stiffness: 100, duration: 0.8 }}  // Пружинная анимация
    className={styles.modalWrapper}>
      <div className={styles.modalContent}>
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
          whileTap={{ scale: 0.9 }} // Сжимается при клике
          transition={{ duration: 0.03 }}
          onClick={onClick}
          className={styles.button}
        >
          <Icon className={styles.buttonIcon} aria-hidden="true" />
          <span>{text}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ModalHello;
