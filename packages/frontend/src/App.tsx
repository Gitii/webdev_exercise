import styles from './App.module.css';
import { Routes, Route, Link } from 'react-router-dom';
import Skills from './pages/skills/list';
import Users from './pages/users/list';
import NotFound from './pages/notFound';
import CreateSkill from './pages/skills/create';
import AssignSkills from './pages/users/assign';

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.appbar}>
        <h3>Platform Users</h3>
        <div>
          <Link to="/users">Users</Link>|<Link to="/skills">Skills</Link>
        </div>
      </div>
      <div className={styles.routeContainer}>
        <Routes>
          <Route path="/">
            <Route index element={<Users />} />
            <Route path="/skills/create" element={<CreateSkill />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/users" element={<Users />} />
            <Route
              path="/users/:userId/assignSkills"
              element={<AssignSkills />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
