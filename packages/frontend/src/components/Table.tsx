import styles from './Table.module.css';

export interface Props<T> {
  rows: T[];
  toRow: (row: T) => React.ReactNode[];
  getRowKey: (row: T) => string | number;
  header: React.ReactNode[];
}

export default function Table<T>(props: Props<T>) {
  return (
    <table className={styles.styled}>
      <thead>
        <tr>
          {props.header.map((h) => (
            <th key={String(h)}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((r) => (
          <tr key={props.getRowKey(r)}>
            {props.toRow(r).map((c, i) => (
              <td key={`${props.getRowKey(r)}-${i}`}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
