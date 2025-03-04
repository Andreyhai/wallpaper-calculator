import React from "react";
import styles from "./InputBlock.module.scss";

interface InputBlockProps {
  label: string;
  unit: string;
  value: string | number;
  ErrorText: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBlock: React.FC<InputBlockProps> = ({ label, unit, value, ErrorText, onChange }) => {

  

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
        style={{
          border: ErrorText ? '1px solid red' : ''
        }}
      />
    </article>
  );
};

export default InputBlock;
