import React, { useState } from "react";
import styles from "./ModalError.module.scss";
import { motion } from "framer-motion";

interface ModalErrorProps {
  title: string;
  onClose: () => void;
}

const ModalError: React.FC<ModalErrorProps> = ({ title, onClose }) => {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <motion.article
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        transition={{ type: "spring", stiffness: 50, damping: 10, duration: 0.3 }}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // Чтобы клик внутри модалки не закрывал её
      >
        <article className={styles.header}>
          <h3>{title}</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ✖
          </button>
        </article>
      </motion.article>
    </div>
  );
};

export default ModalError;
