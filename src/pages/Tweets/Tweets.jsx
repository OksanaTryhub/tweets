import { useEffect, useState } from 'react';
import {
  Link,
  useSearchParams
} from 'react-router-dom';
import * as api from '../../shared/users-api';
import UserCard from '../../components/Card/Card';
import { save, load } from '../../shared/storage'
import TweetFilterDropdown from '../../components/FIlter/Filter';


const Tweets = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  // const [visible, setVisible] = useState(3);
  const [loading, setLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [generalTotalPages, setGeneralTotalPages] = useState(0);

  const [page, setPage] = useState(searchParams.get('page') || 1);
  const [filter, setFilter] = useState(searchParams.get('filter') || 'show all');
  // const page = searchParams.get('page') || 1;
  // const filter = searchParams.get('filter') || 'show all';

  // const totalPages = Math.ceil(filteredUsers.length / 3)

  useEffect(() => {

    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const data = await api.getAllUsers();
        setUsers(data)
        setFilteredUsers(data)

        const totalPages = Math.ceil(data.length / 3)
        setGeneralTotalPages(totalPages)
        if (page < totalPages) {
          setShowLoadMore(true)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    fetchAllUsers()
  }, [])

  useEffect(() => {
    searchParams.set('page', page)
    searchParams.set('filter', filter)
    setSearchParams(searchParams)

    const savedIds = load('followings');
    console.log("savedIdsFilter", savedIds)
    if (filter === 'show all') {
      setFilteredUsers(users)
    }
    if (filter === 'followings') {
      setFilteredUsers(users.filter(({ id }) => savedIds.includes(id)))
    }
    if (filter === 'follow') {
      setFilteredUsers(users.filter(({ id }) => !savedIds.includes(id)))
    }


  }, [filter, page, searchParams, setSearchParams, users])

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
      const updatedTweets = users.map((tweet) => {
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
      setUsers(updatedTweets);

      updateUserFollowers(tweetId, {
        followers: updatedTweets.find((tweet) => tweet.id === tweetId).followers,
      })
 
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollowClick = async (tweetId) => {
    try {
      const updatedTweets = users.map((tweet) => {
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
      setUsers(updatedTweets);

      updateUserFollowers(tweetId, {
        followers: updatedTweets.find((tweet) => tweet.id === tweetId).followers,
      })
 
    } catch (error) {
      console.error(error);
    }
  };
  
  const loadMoreUsers = () => {
      setPage(prevState => prevState +1)
      // setVisible(prevState => prevState + 3)
      // const newPage = visible / 3 + 1;
      // searchParams.set('page', newPage)
      // setSearchParams(searchParams)
      // const totalPages = Math.ceil(filteredUsers.length / 3)
 
      // if (newPage >= totalPages) {
      //   setShowLoadMore(false)
      // }
    };

  const handleFilterChange = (selectedOption) => {
    setPage(1)
    setFilter(selectedOption)
    //   setShowLoadMore(true)
    // }

    // console.log("selectedOption", selectedOption)
    // setVisible(3)
    // searchParams.set('page', 1)
    //   setSearchParams(searchParams);

    //   const savedIds = load('followings');
    // console.log("savedIdsFilter", savedIds)
    // if (selectedOption === 'show all') {
    //   setFilteredUsers(users)
    //    searchParams.set('filter', 'show all')
    //   setSearchParams(searchParams)
    // }
    // if (selectedOption === 'followings') {
    //   setFilteredUsers(users.filter(({ id }) => savedIds.includes(id)))
    //    searchParams.set('filter', 'followings')
    //   setSearchParams(searchParams)
    // }
    // if (selectedOption === 'follow') {
    //   setFilteredUsers(users.filter(({ id }) => !savedIds.includes(id)))
    //   searchParams.set('filter', 'follow')
    //   setSearchParams(searchParams)
    // }
  };

  return (
    <div>
      <h1>Tweets</h1>
      <TweetFilterDropdown onFilterChange={handleFilterChange} initialValue={filter}/>
      {loading && <p>...Loading</p>}
      {filteredUsers.length && !loading ? (
        filteredUsers.slice(0,page*3).map(({ id, user, tweets, followers, avatar }) => (
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
//==========================
// import { useEffect, useState } from 'react';
// import {
//   Link,
//   useLocation,
//   useNavigate
// } from 'react-router-dom';
// import * as api from '../../shared/users-api';
// import UserCard from '../../components/Card/Card';
// import { save, load } from '../../shared/storage'
// import TweetFilterDropdown from '../../components/FIlter/Filter';

// const Tweets = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const page = Number(queryParams.get('page')) || 1;
//   const selectedOption = queryParams.get('filter') || 'show all';
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [visible, setVisible] = useState(3);
//   const [loading, setLoading] = useState(false);
//   const [filter, setFilter] = useState(selectedOption);
//   const [showLoadMore, setShowLoadMore] = useState(false);

//   const newPage = visible / 3 + 1;
//   queryParams.set('page', newPage);
//   const totalPages = Math.ceil(filteredUsers.length / 3); 

//   useEffect(() => {
//     const fetchAllUsers = async () => {
//       try {
//         setLoading(true);
//         const data = await api.getAllUsers();
//         setUsers(data);
//         setFilteredUsers(data);
//         if (data?.length > 3) {
//           setShowLoadMore(true);
//         }
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAllUsers();
//   }, []);

//   useEffect(() => {
//     const savedIds = load('followings');
//     if (selectedOption === 'show all') {
//       setFilter('show all')
//       setFilteredUsers(users);
//     } else if (selectedOption === 'followings') {
//       setFilter('followings')
//       setFilteredUsers(users.filter(({ id }) => savedIds.includes(id)));
//     } else if (selectedOption === 'follow') {
//       setFilter('follow')
//       setFilteredUsers(users.filter(({ id }) => !savedIds.includes(id)));
//     }
//   }, [users, selectedOption]);

//   const updateUserFollowers = async (id, data) => {
//     try {
//       const updatedUser = await api.updateUserFollowers(id, data);
//       return updatedUser.followers;
//     } catch (error) {
//       console.error('Error:', error);
//       throw error;
//     }
//   };

//   const handleFollowClick = async (tweetId) => {
//     try {
//       const updatedTweets = users.map((tweet) => {
//         if (tweet.id === tweetId) {
//           const savedIds = load('followings');
//           if (!savedIds.includes(tweetId)) {
//             save('followings', [...savedIds, tweetId]);
//           }
//           return { ...tweet, followers: tweet.followers + 1, following: true };
//         }
//         return tweet;
//       });
//       setUsers(updatedTweets);

//       updateUserFollowers(tweetId, {
//         followers: updatedTweets.find((tweet) => tweet.id === tweetId).followers,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleUnfollowClick = async (tweetId) => {
//     try {
//       const updatedTweets = users.map((tweet) => {
//         if (tweet.id === tweetId) {
//           const savedIds = load('followings');
//           if (savedIds.includes(tweetId)) {
//             save('followings', savedIds.filter((id) => id !== tweetId));
//           }
//           return { ...tweet, followers: tweet.followers - 1, following: false };
//         }
//         return tweet;
//       });
//       setUsers(updatedTweets);

//       updateUserFollowers(tweetId, {
//         followers: updatedTweets.find((tweet) => tweet.id === tweetId).followers,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const loadMoreUsers = () => {
//     setVisible((prevState) => prevState + 3);
    
//     // const queryParams = new URLSearchParams(location.search);

    
//       navigate(`?${queryParams.toString()}`);

//     if (newPage >= totalPages) {
//       setShowLoadMore(false);
//     }
//   };

//   // const loadMoreUsers = () => {
//   //     setVisible(prevState => prevState + 3)
//   //     const newPage = visible / 3 + 1;
//   //     searchParams.set('page', newPage)
//   //     setSearchParams(searchParams)
//   //     const totalPages = Math.ceil(filteredUsers.length / 3)
 
//   //     if (newPage >= totalPages) {
//   //       setShowLoadMore(false)
//   //     }
//   // };
  

//   const handleFilterChange = (selectedOption) => {
//     if (filteredUsers.length > 3) {
//       setShowLoadMore(true);
//     }

//     const queryParams = new URLSearchParams(location.search);
//     queryParams.set('page', 1);
//     queryParams.set('filter', selectedOption);
//     navigate(`?${queryParams.toString()}`);

//     const savedIds = load('followings');
//     if (selectedOption === 'show all') {
//       setFilteredUsers(users);
//     } else if (selectedOption === 'followings') {
//       setFilteredUsers(users.filter(({ id }) => savedIds.includes(id)));
//     } else if (selectedOption === 'follow') {
//       setFilteredUsers(users.filter(({ id }) => !savedIds.includes(id)));
//     }
//   };

//   return (
//     <div>
//       <h1>Tweets</h1>
//       <TweetFilterDropdown onFilterChange={handleFilterChange} initialValue={filter } />
//       {loading && <p>...Loading</p>}
//       {filteredUsers.length && !loading ? (
//         filteredUsers.slice(0, page * 3).map(({ id, user, tweets, followers, avatar }) => (
//           <UserCard
//             key={id}
//             id={id}
//             user={user}
//             tweets={tweets}
//             followers={followers}
//             avatar={avatar}
//             handleUnfollowClick={handleUnfollowClick}
//             handleFollowClick={handleFollowClick}
//           />
//         ))
//       ) : (
//         <p>NOBODY</p>
//       )}
//       {showLoadMore && <button onClick={loadMoreUsers}>Load more</button>}

//       <button>
//         <Link to="/">Back</Link>
//       </button>
//     </div>
//   );
// };

// export default Tweets;
