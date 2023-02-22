import React from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';

export default function ManageSkillsButton({ userId }: { userId: number }) {
  const navigate = useNavigate();
  const handleClick = useCallback(
    () => navigate(`/users/${userId}/assignSkills`),
    [navigate],
  );

  return (
    <Button theme="link" onClick={handleClick}>
      Assign Skills
    </Button>
  );
}
