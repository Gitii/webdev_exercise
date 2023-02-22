import { isError } from 'lodash';
import styles from './ErrorView.module.css';

export default function ErrorView({ error }: { error: string | Error }) {
  return (
    <div role="alert" className={styles.alert}>
      <h1>An error has occurred!</h1>
      <p role="contentinfo">{isError(error) ? error.message : String(error)}</p>
    </div>
  );
}
