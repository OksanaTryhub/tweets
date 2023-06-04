import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './filter.module.css'

const Filter = ({ onFilterChange }) => {
  const [isFilterVisible, setFilterVisible] = useState(false);

  const handleClick = () => {
    setFilterVisible(prevState => !prevState);
  };

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    onFilterChange(selectedValue);
  };

  return (
    <div>
      <button onClick={handleClick} className={styles.filterBtn}>Filter</button>
      {isFilterVisible &&
        <div className={styles.selectWrapper}>
            <button value="show-all" onClick={handleOptionChange} className={styles.selectBtn}>Show All</button>
            <button value="follow" onClick={handleOptionChange} className={styles.selectBtn}>Follow</button>
            <button value="followings" onClick={handleOptionChange} className={styles.selectBtn}>Followings</button>
        </div>
      }
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  initialValue: PropTypes.string.isRequired,
};