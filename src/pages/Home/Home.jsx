import { Link, useNavigate } from "react-router-dom"
import styles from './home.module.css'

const Home = () => {
  const navigate = useNavigate();

   const tweetsRedirect = () => {
    navigate('/tweets');
  }
  return (
    <div className={styles.container}>
      <Link to='https://goit.global/ua/'>
        <img className={styles.logo} src='images/logo.png'/>
      </Link>
      <div className={styles.text}>
        <h1>Welcome to our social media application for interesting leisure!</h1>
        <h2>Join us and embark on your journey into the captivating world of tweets right now!</h2>
      </div>
      <div className={`${styles.flyWrap} ${styles.flyWrap1}`}>
        <img src="images/card1.png" alt="Moving Image" className={styles.flyCard1}/>
      </div>
      <div className={`${styles.flyWrap} ${styles.flyWrap2}`}>
        <img src="images/card2.png" alt="Moving Image" className={styles.flyCard2}/>
      </div>
      <div className={`${styles.flyWrap} ${styles.flyWrap3}`}>
        <img src="images/card3.png" alt="Moving Image" className={styles.flyCard3}/>
      </div>
      <div className={ styles.flyWrap4 }>
        <img src="images/card3.png" alt="Moving Image" className={styles.flyCard4}/>
      </div>
      <button className={styles.button} onClick={tweetsRedirect}>Go to Tweets </button>
    </div>
  )
}

export default Home