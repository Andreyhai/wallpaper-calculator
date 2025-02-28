import React from "react";
import "./InputBlock.scss";

interface InputBlockProps {
  label: string;
  unit: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBlock: React.FC<InputBlockProps> = ({ label, unit, value, onChange }) => {
  return (
    <article className="input-block">
      <label className="input-label">
        {label} <span className="input-unit">{unit}</span>
      </label>
      <input
        type="number"
        className="input-field"
        value={value}
        onChange={onChange}
        aria-label={`${label} в ${unit}`}
      />
    </article>
  );
};

export default InputBlock;
