import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import * as api from '../../shared/users-api';
import UserCard from '../../components/Card/Card';
import {save, load} from '../../shared/storage'


const Tweets = () => {
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followings, setFollowings] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;

  useEffect(() => {  
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const total = await api.getTotalPages();
   
        const data = await api.getUsers(page);
         page === 1
        ? setLoadedUsers(data)
          : setLoadedUsers(prevState => {
            // console.log("prevState", prevState)
            // console.log("DATA", data)
            return [...prevState, ...data]
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
      fetchUsers();
  }, [page]);
 

  const updateUserFollowers = async (id, data) => {
    try {
      const updatedUser = await api.updateUserFollowers(id, data);
      return updatedUser.followers;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const handleFollowClick = async (tweetId) => {
    try {
      const updatedTweets = loadedUsers.map((tweet) => {
        if (tweet.id === tweetId) {
          const savedIds = load('followings');
          console.log("savedIds", savedIds)
       
          if (!savedIds.includes(tweetId)) {
            save('followings', [...savedIds, tweetId])
          }
          return { ...tweet, followers: tweet.followers + 1, following: true };

        }
        return tweet;
      });
      setLoadedUsers(updatedTweets);

      updateUserFollowers(tweetId, {
        followers: updatedTweets.find((tweet) => tweet.id === tweetId).followers,
      })
 
    } catch (error) {
      console.error(error);      
    }
  };

  const handleUnfollowClick = async (tweetId) => {
    try {
      const updatedTweets = loadedUsers.map((tweet) => {
        if (tweet.id === tweetId) {
          const savedIds = load('followings');
          console.log("savedIds---", savedIds)
          if (savedIds.includes(tweetId)) {
            save('followings', savedIds.filter(id => id !== tweetId))
          }
          return { ...tweet, followers: tweet.followers - 1, following: false };
        }
        return tweet;
      });
      setLoadedUsers(updatedTweets);

      updateUserFollowers(tweetId, {
        followers: updatedTweets.find((tweet) => tweet.id === tweetId).followers,
      })
 
    } catch (error) {
      console.error(error);      
    }
  };

  const loadMoreUsers = () => { 
    setSearchParams({ page: Number(page) + 1 });

  };

  return (
    <div>
      <h1>Tweets</h1>
      {loading && <p>...Loading</p>}
      {loadedUsers.length && !loading ? (
        loadedUsers.map(({ id, user, tweets, followers, avatar }) => (
          <UserCard
            key={id}
            id={id}
            user={user}
            tweets={tweets}
            followers={followers}
            avatar={avatar}
            isFollowing={followings[id]}
            handleUnfollowClick={handleUnfollowClick}
            handleFollowClick={handleFollowClick}
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