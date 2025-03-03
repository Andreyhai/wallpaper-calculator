import React from "react";
import styles from "./AddBlock.module.scss";

interface AddBlockProps {
//   onClick: () => void;
    title: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    addWindow2Array: () => void;
}

const AddBlock: React.FC<AddBlockProps> = ({title, icon: Icon, addWindow2Array}) => {
  return (
    <article className={styles.addWindow} onClick={addWindow2Array}>
      <article className={styles.iconContainer}>
      <Icon className={styles.icon} aria-hidden="true" />
      </article>
      <p className={styles.text}>{title}</p>
    </article>
  );
};

export default AddBlock;
