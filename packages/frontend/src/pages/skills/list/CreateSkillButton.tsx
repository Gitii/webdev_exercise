import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';

export default function CreateSkill() {
  const navigate = useNavigate();
  const handleClick = useCallback(() => navigate('/skills/create'), [navigate]);

  return <Button onClick={handleClick}>Create Skill</Button>;
}
