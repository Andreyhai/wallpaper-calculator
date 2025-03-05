import React from "react";
import styles from "./Result.module.scss";
import { motion } from "framer-motion"; // Импортируем framer-motion

interface ResultItem {
  label: string;
  value: string;
}

interface ResultProps {
  results: ResultItem[];
  reset: () => void;
  openModalSend: () => void;
}

const Result: React.FC<ResultProps> = ({ results, reset, openModalSend }) => {
  return (
    <motion.section
      key={JSON.stringify(results)}
      initial={{ y: -100, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, duration: 0.8 }}
      className={styles.section}
    >
      <h1 className={styles.title}>Результаты</h1>
      <article className={styles.resultContainer}>
        {results.map((result, index) => (
          <article key={index} className={styles.resultItem}>
            <h2 className={styles.resultValue}>{result.value}</h2>
            <p className={styles.resultLabel}>{result.label}</p>
          </article>
        ))}
      </article>
      <article className={styles.buttonGroup}>
        <button className={styles.resetButton} onClick={reset}>Сбросить параметры</button>
        <button className={styles.catalogButton}>Перейти в каталог</button>
        <button className={styles.buttonSend} onClick={openModalSend}>Отправить на почту</button>
      </article>
    </motion.section>
  );
};

export default Result;
