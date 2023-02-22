import { isError } from 'lodash';
import styles from './ErrorView.module.css';

export default function ErrorView({ error }: { error: unknown }) {
  return (
    <div className={styles.alert}>
      <h1>An error has occurred!</h1>
      <p>{isError(error) ? error.message : String(error)}</p>
    </div>
  );
}
