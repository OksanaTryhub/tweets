import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import * as api from '../../shared/users-api';
import UserCard from '../../components/Card/Card';


const Tweets = () => {
  const [users, setUsers] = useState([]);
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followings, setFollowings] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(true);
  // const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;

  useEffect(() => { 
    console.log(page)
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const total = await api.getTotalPages();
        console.log(total)
 
        const data = await api.getUsers(page);
 
        console.log(data.length)
        setUsers(data);
        setLoadedUsers(prevState => [...prevState, ...data]);

        const savedFollowings = JSON.parse(localStorage.getItem('followings')) || [];
        setFollowings(savedFollowings);

        // if (data.length <= 3) {
        //   setShowLoadMore(false);
        // }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    // if (page > 1) {
      fetchUsers();
    // }
  }, [page]);
 
  useEffect(() => {
    // Сохранение данных в localStorage при изменении состояния followings
    localStorage.setItem('followings', JSON.stringify(followings));
  }, [followings]);

  const updateUserFollowers = async (id, data) => {
    try {
      const updatedUser = await api.updateUserFollowers(id, data);
      return updatedUser.followers;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const handleFollowClick = () => {
    console.log("CLICK ON FOLLOW")
  
  }

  const loadMoreUsers = () => { 
    setSearchParams({ page: Number(page) + 1 });
    // setPage(prevState => prevState + 1)
    
    // const nextUsers = users.slice(loadedUsers.length, loadedUsers.length + 3);
    // setLoadedUsers((prevUsers) => [...prevUsers, ...nextUsers]);

    // if (loadedUsers.length + nextUsers.length >= users.length) {
    //   setShowLoadMore(false);
    // }
  };

  return (
    <div>
      <h1>Tweets</h1>
      {loading && <p>...Loading</p>}
      {loadedUsers.length && !loading ? (
        loadedUsers.map(({ id, user, tweets, followers, avatar }) => (
          <UserCard
            key={id}
            user={user}
            tweets={tweets}
            followers={followers}
            avatar={avatar}
            isFollowing={followings[id]}
            onClick={() => handleFollowClick(id, followers, loadedUsers.findIndex((user) => user.id === id))}
          />
        ))
      ) : (
        <p>NOBODY</p>
      )}
      {showLoadMore && <button onClick={loadMoreUsers}>Load more</button>}

      <button>
        <Link to="/">Back</Link>
      </button>
    </div>
  );
};

export default Tweets;