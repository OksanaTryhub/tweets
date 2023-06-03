import { useState } from 'react';
import PropTypes from 'prop-types';

const Filter = ({ onFilterChange, initialValue }) => {
  const [selectedOption, setSelectedOption] = useState(initialValue);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onFilterChange(selectedValue);
  };

  return (
    <select value={selectedOption} onChange={handleOptionChange}>
      <option value="show-all">Show All</option>
      <option value="follow">Follow</option>
      <option value="followings">Followings</option>
    </select>
  );
};

export default Filter;

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  initialValue: PropTypes.string.isRequired,
};