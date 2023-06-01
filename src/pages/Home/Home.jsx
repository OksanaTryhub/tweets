// import styles from './home.module.css'

import { Link } from "react-router-dom"

 

const Home = () => {
 
  return (
    <div>
      <h1>Home</h1>
      <button >
        <Link to="/tweets" >Go to Tweets</Link>
      </button>
    </div>
  )
}

export default Home