import PropTypes from 'prop-types';

import styles from './card.module.css'

const UserCard = ({user, avatar, tweets, followers}) => {
  return (
    <li className={styles.card}>
      <img className={styles.avatar} src={avatar} alt={user} />
      <h3 className={styles.tweets}>{tweets} TWEETS</h3>
      <h4 className={styles.followers}>{followers} FOLLOWERS</h4>
      <button> FOLLOW</button>
    </li>
  )
}

export default UserCard 

UserCard.propTypes = {
  user: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  tweets: PropTypes.number.isRequired,
  followers: PropTypes.number.isRequired,
};