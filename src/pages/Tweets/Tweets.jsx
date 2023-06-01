// import styles from './tweets.module.css'

import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

import * as api from '../../shared/users-api'
import UserCard from "../../components/Card/Card";

const Tweets = () => {
   const [users, setUsers] = useState([]); 
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        // setLoading(true);
        const data = await api.getUsers();
        await setUsers(data)
        await console.log("users=>", users)
      } catch (error) {
        console.log(error);
      } finally {
        console.log("finally")
        // setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>
        Tweets
      </h1>
      {users?.length ? users.map(({ id, user, tweets, followers, avatar }) => (
        <UserCard
          key={id}
          user={user}
          tweets={tweets}
          followers={followers}
          avatar={avatar}          
         />

        
      )) : <p>NOBODY</p>}
      <button >
        <Link to="/" >Back</Link>
      </button>
    </div>
  )
}

export default Tweets