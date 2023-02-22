import React from 'react';
import styles from './Button.module.css';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { theme?: 'normal' | 'link' };

export default function Button({ children, theme, ...props }: Props) {
  return (
    <button
      {...props}
      className={`${styles.button} ${
        theme == 'link' ? styles.link : styles.normal
      }`}
    >
      {children}
    </button>
  );
}

export function ButtonContainer({ children }: { children: React.ReactNode }) {
  return (
    <div role="menubar" className={styles.container}>
      {children}
    </div>
  );
}
