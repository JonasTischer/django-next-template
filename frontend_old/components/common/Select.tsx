import React from 'react';

interface Props {
  options?: { value: string; label: string }[];
  // ... any other props you may need
}

const Select: React.FC<Props> = ({ options = []/* other props */ }) => {
  return (
    <select /* other props */>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
