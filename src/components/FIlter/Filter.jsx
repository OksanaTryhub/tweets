import { useState } from 'react';

const TweetFilterDropdown = ({ onFilterChange, initialValue }) => {
  const [selectedOption, setSelectedOption] = useState(initialValue);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onFilterChange(selectedValue);
  };

  return (
    <select value={selectedOption} onChange={handleOptionChange}>
      <option value="show all">Show All</option>
      <option value="follow">Follow</option>
      <option value="followings">Followings</option>
    </select>
  );
};

export default TweetFilterDropdown;