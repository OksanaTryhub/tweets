import PropTypes from 'prop-types';

import UserCard from '../UserCard/UserCard'
import styles from './userList.module.css'

const UserList = ({users, loading, page, handleUnfollowClick, handleFollowClick}) => {
  return (
    <div className={styles.userList}>
      {!users.length && !loading && <p>There are no tweets yet</p>}
      {users.length && !loading && (
        users.slice(0, page * 3).map(({ id, user, tweets, followers, avatar }) => (
          <UserCard
            key={id}
            id={id}
            user={user}
            tweets={tweets}
            followers={followers}
            avatar={avatar}
            handleUnfollowClick={handleUnfollowClick}
            handleFollowClick={handleFollowClick}
          />
        ))
      )
      }
    </div>
  )
}

export default UserList

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      tweets: PropTypes.number.isRequired,
      followers: PropTypes.number.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  handleUnfollowClick: PropTypes.func.isRequired,
  handleFollowClick: PropTypes.func.isRequired,
};