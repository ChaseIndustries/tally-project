import Ship from "./Ship";
import Pagination from "./Pagination";
import styles from '../css/ships.module.css'
import { AppContext } from "../App";
import { useContext } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const Ships = ({ ships, displayType = 'list' }: { ships: Starship[], displayType?: 'list' | 'favorite' }) => {
  const { loading } = useContext(AppContext)
  if (!ships.length && !loading) {
    return <h2 data-testid="no-results">Nothing to see here, <Link to="/">move along...</Link></h2>
  }
  return (
    <div className={styles.root}>
      {loading && <div className={styles.loadingWrapper}><Loader /></div>}
      <div className={styles.list}>
        {ships.map((ship) => (
          <Ship ship={ship} key={ship.name} displayType={displayType} />
        ))}
      </div>
      {displayType === 'list' && !!ships.length && <Pagination />}
    </div>
  );
}

export default Ships;