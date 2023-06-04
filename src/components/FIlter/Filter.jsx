import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './filter.module.css'

const Filter = ({ onFilterChange }) => {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const filterRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setFilterVisible(prevState => !prevState);
  };

  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setFilterVisible(false);
    }
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    onFilterChange(value);
    setSelectedValue(value);
  };

  return (
    <div ref={filterRef} className={styles.container} >
      <button onClick={handleClick} className={styles.filterBtn}>Filter</button>
      {isFilterVisible &&
        <div className={styles.selectWrapper }>
            <button 
            value="show-all" 
            onClick={handleOptionChange} 
            className={`${styles.selectBtn} ${selectedValue === 'show-all' ? styles.active : ''}`}
            >
              Show All
            </button>
            <button 
            value="follow" 
            onClick={handleOptionChange} 
            className={`${styles.selectBtn} ${selectedValue === 'follow' ? styles.active : ''}`}
            >
              Follow
            </button>
          <button
            value="followings"
            onClick={handleOptionChange}
            className={`${styles.selectBtn} ${selectedValue === 'followings' ? styles.active : ''}`}
          >
            Followings</button>
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