import { User } from './User';

export function UserRow({ id, name }: User) {
  return (
    <div className="users-table__row">
      <div>{id}</div>
      <div>{name}</div>
    </div>
  );
}
