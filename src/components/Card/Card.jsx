//UserCard.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './card.module.css'

const UserCard = ({ user, avatar, tweets, followers=0, onClick }) => {
  const [currentFollowers, setCurrentFollowers] = useState(followers);
  const [isFollowing, setIsFollowing] = useState(false);

   const handleFollowClick = () => {
    if (isFollowing) {
      setCurrentFollowers(currentFollowers - 1);
    } else {
      setCurrentFollowers(currentFollowers + 1);
    }
    setIsFollowing(!isFollowing);
    onClick();
  };

  return (
    <li className={styles.card}>
      <img className={styles.avatar} src={avatar} alt={user} />
      <h3 className={styles.tweets}>{tweets} TWEETS</h3>
      <h4 className={styles.followers}>{currentFollowers} FOLLOWERS</h4>
      <button onClick={handleFollowClick}>
        {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
      </button>
    </li>
  );
};

export default UserCard 

UserCard.propTypes = {
  user: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  tweets: PropTypes.number.isRequired,
  followers: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
