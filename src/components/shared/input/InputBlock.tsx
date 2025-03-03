import React from "react";
import styles from "./InputBlock.module.scss";

interface InputBlockProps {
  label: string;
  unit: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBlock: React.FC<InputBlockProps> = ({ label, unit, value, onChange }) => {
  return (
    <article className={styles.inputBlock}>
      <label className={styles.inputLabel}>
        {label} <span className={styles.inputUnit}>{unit}</span>
      </label>
      <input
        type="number"
        className={styles.inputField}
        value={value}
        onChange={onChange}
        aria-label={`${label} в ${unit}`}
      />
    </article>
  );
};

export default InputBlock;
