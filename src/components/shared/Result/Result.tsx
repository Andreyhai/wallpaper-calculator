import React from "react";
import styles from "./Result.module.scss";

interface ResultItem {
    label: string;
    value: string;
}

interface ResultProps {
    results: ResultItem[];
}

const Result: React.FC<ResultProps> = ({ results }) => {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>Результаты</h1>
            <article className={styles.resultContainer}>
                {results.map((result, index) => (
                    <div key={index} className={styles.resultItem}>
                        <h2 className={styles.resultValue}>{result.value}</h2>
                        <p className={styles.resultLabel}>{result.label}</p>
                    </div>
                ))}
            </article>
            <div className={styles.buttonGroup}>
                <button className={styles.resetButton}>Сбросить параметры</button>
                <button className={styles.catalogButton}>Перейти в каталог</button>
            </div>
        </section>
    );
};

export default Result;
