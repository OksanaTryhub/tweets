// import styles from './tweets.module.css'

import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

import * as api from '../../shared/users-api'
import UserCard from "../../components/Card/Card";

const Tweets = () => {
  const [users, setUsers] = useState([]); 
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await api.getUsers();
        setUsers(data);
        setLoadedUsers(data.slice(0, 3));
        
      } catch (error) {
        console.log(error);
      } finally { 
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const loadMoreUsers = () => {
    const nextUsers = users.slice(loadedUsers.length, loadedUsers.length + 3);
    setLoadedUsers([...loadedUsers, ...nextUsers]); 

    if (loadedUsers.length + nextUsers.length >= users.length) {
      setShowLoadMore(false);
    }
  };

  return (
    <div>
      <h1>
        Tweets
      </h1>
      {loading&& <p>...Loading</p>}
      {loadedUsers?.length && !loading ? loadedUsers.map(({ id, user, tweets, followers, avatar }) => (
        <UserCard
          key={id}
          user={user}
          tweets={tweets}
          followers={followers}
          avatar={avatar}          
         /> 
      )) : <p>NOBODY</p>}
      {showLoadMore && <button onClick={loadMoreUsers}>Load more</button>}
   

      <button >
        <Link to="/" >Back</Link>
      </button>
    </div>
  )
}

export default Tweets