import React, { useState } from "react";
import styles from "./EditBlock.module.scss";

interface EditBlockProps {
  //   onClose: () => void;
  index: number;
  title: string;
  removeWindow: (index: number) => void;
  lastWidth: string;
  lastHeight: string;
}

const EditBlock: React.FC<EditBlockProps> = ({
  title,
  removeWindow,
  lastWidth,
  lastHeight,
  index
}) => {
  const [height, setHeight] = useState<string>(lastHeight);
  const [width, setWidth] = useState<string>(lastWidth);

  return (
    <div className={styles.windowBlock}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <button className={styles.closeButton} onClick={() => removeWindow(index)}>
          ✖
        </button>
      </div>
      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <label>Высота м</label>
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Ширина м</label>
          <input
            type="text"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditBlock;
