import React from "react";
import styles from "./EditBlock.module.scss";
import { motion } from "framer-motion"; // Импортируем framer-motion


interface EditBlockProps {
  //   onClose: () => void;
  index: number;
  title: string;
  removeWindow: (index: number) => void;
  lastWidth: string;
  lastHeight: string;
  updateDoor: (index: number, field: "width" | "height", value: string) => void;
}

const EditBlock: React.FC<EditBlockProps> = ({
  title,
  removeWindow,
  lastWidth,
  lastHeight,
  index,
  updateDoor
}) => {

  return (
    <motion.article
    initial={{ x: -100, opacity: 0 }}  
      animate={{ x: 0, opacity: 1 }}  
      transition={{ type: "spring", stiffness: 100, duration: 0.8 }}  
    className={styles.windowBlock}>
      <article className={styles.header}>
        <h3>{title}</h3>
        <button className={styles.closeButton} onClick={() => removeWindow(index)}>
          ✖
        </button>
      </article>
      <article className={styles.inputs}>
        <article className={styles.inputGroup}>
          <label>Высота м</label>
          <input
            type="text"
            value={lastHeight}
            onChange={(e) => updateDoor(index, "height", e.target.value)}
          />
        </article>
        <article className={styles.inputGroup}>
          <label>Ширина м</label>
          <input
            type="text"
            value={lastWidth}
            onChange={(e) => updateDoor(index, "width", e.target.value)}
          />
        </article>
      </article>
    </motion.article>
  );
};

export default EditBlock;
