import { isEmpty } from 'lodash';
import React, { useCallback } from 'react';

export default function SkillFilter({
  value,
  onChange,
  options,
}: {
  value: number | undefined;
  options: { id: number; name: string }[];
  onChange: (n: number | undefined) => void;
}) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (!isEmpty(e.target.value)) {
        onChange(Number(e.target.value));
      } else {
        onChange(undefined);
      }
    },
    [onChange],
  );

  return (
    <div>
      <label htmlFor="skills">Filter:</label>
      <select
        name="skills"
        aria-label="skills"
        size={1}
        onChange={handleChange}
        value={value}
      >
        <option value="">All skills</option>
        {options.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
    </div>
  );
}
