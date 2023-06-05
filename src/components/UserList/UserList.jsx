import PropTypes from "prop-types";

import UserCard from "../UserCard/UserCard";
import styles from "./userList.module.css";
import Loader from "../Loader/Loader";

const UserList = ({ users, loading, page, handleUnfollowClick, handleFollowClick }) => {
  return (
    <div className={styles.userList}>
     {users.length && !loading ? (
  users
    .slice(0, page * 3)
    .map(({ id, user, tweets, followers, avatar }) => (
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
) : (
  !users.length && !loading && 
  <div className={styles.textWrapper}>
    <p className={styles.text}>There are no tweets yet</p>
    <Loader/>
  </div>
)}

    </div>
  );
};

export default UserList;

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
  page: PropTypes.number.isRequired,
  handleUnfollowClick: PropTypes.func.isRequired,
  handleFollowClick: PropTypes.func.isRequired,
};
