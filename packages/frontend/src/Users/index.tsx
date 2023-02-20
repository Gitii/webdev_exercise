import { useCallback, useEffect, useState } from 'react';
import AddUsers from './AddUsers';
import { fetchUsers } from './fetchUsers';
import RemoveUsers from './RemoveUsers';
import { User } from './User';
import { UserRow } from './UserRow';
import './Users.css';
import { UsersActions } from './UsersActions';
import { UsersTable } from './UsersTable';
import { UsersTableHeader } from './UsersTableHeader';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const loadUsers = useCallback(() => {
    fetchUsers().then(setUsers);
  }, []);
  useEffect(loadUsers, [loadUsers]);
  return (
    <div>
      <UsersTable>
        <UsersTableHeader />
        {users.map((user) => (
          <UserRow key={user.id} {...user} />
        ))}
      </UsersTable>
      <UsersActions>
        <AddUsers refetch={loadUsers} />
        <RemoveUsers refetch={loadUsers} />
      </UsersActions>
    </div>
  );
}
