import { useLocation } from 'react-router-dom';
import ErrorView from '../../components/ErrorView';

export default function () {
  const location = useLocation();

  return (
    <div>
      <ErrorView error={`Unknown route ${location.pathname}`} />
    </div>
  );
}
