import { Link, Outlet } from "react-router-dom";
import styles from '../css/layout.module.css';
import { useContext } from "react";
import { AppContext } from "../App";

const Layout = () => {
  const { error } = useContext(AppContext);
  return (
    <div className={styles.root}>
      <nav className={styles.nav} role="navigation">
        <Link to="/"><img src="/images/home_logo.jpg" title="Go home" alt="Home"/></Link>
        <Link className={styles.favoritesLink} to="/favorites">View Favorites</Link>  
      </nav>
      <main className={styles.main}>
        {error && <div className={styles.error} role="banner">{error}</div>}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;