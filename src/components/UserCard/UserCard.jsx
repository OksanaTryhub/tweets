import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './userCard.module.css'
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

  const formattedFollowers = followers.toLocaleString('en-US');
  const formattedTweets = tweets.toLocaleString('en-US');
  
  return (
    <li className={styles.card}>
        <div className={styles.divider} />
        <div className={styles.outerRing}>
          <div className={styles.innerRing}></div>
        </div>
        <img className={styles.logo} src='images/logo.png' />
        <img className={styles.avatar} src={avatar} alt={user} />

      <div className={styles.infoWrapper}>
        <h3 className={styles.tweets}>{formattedTweets} TWEETS</h3>
        <h4 className={styles.followers}>{formattedFollowers} FOLLOWERS</h4>
        <button onClick={handleButtonClick } className={`${styles.button} ${isFollowing ? styles.following : styles.follow}`}>
          {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
        </button>
     </div>
    </li>
  );
};

export default UserCard 

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  tweets: PropTypes.number.isRequired,
  followers: PropTypes.number.isRequired,
  handleUnfollowClick: PropTypes.func.isRequired,
  handleFollowClick: PropTypes.func.isRequired,
};
