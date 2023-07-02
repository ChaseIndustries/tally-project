import { useContext, useEffect } from "react";
import Ships from "./Ships";
import { AppContext } from "../App";
import styles from '../css/home.module.css'

const Home = () => {
  const { ships, fetchData } = useContext(AppContext);

  useEffect(() => {
    fetchData();
  }, [fetchData])
  
  return (
    <div className={styles.root}>
      <h1>Starship List</h1>
      <Ships ships={ships} />
    </div>
  );
}

export default Home;