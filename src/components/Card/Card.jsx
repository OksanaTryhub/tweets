//UserCard.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './card.module.css'
import { load } from '../../shared/storage';

const UserCard = ({ id, user, avatar, tweets, followers=0, handleUnfollowClick, handleFollowClick }) => {
  const [isFollowing, setIsFollowing] = useState(() => {
        const savedIds = load('followings');
       return !savedIds.includes(id) ? false : true
  });

  const handleButtonClick  = async () => {
    if (isFollowing) {
      await handleUnfollowClick(id);
      setIsFollowing(false);
    } else {
      await handleFollowClick(id);
      setIsFollowing(true);
    }
  };

  return (
    <li className={styles.card}>
      <img className={styles.avatar} src={avatar} alt={user} />
      <h3 className={styles.tweets}>{tweets} TWEETS</h3>
      <h4 className={styles.followers}>{followers} FOLLOWERS</h4>
      <button onClick={handleButtonClick }>
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
  // onClick: PropTypes.func.isRequired,
};
