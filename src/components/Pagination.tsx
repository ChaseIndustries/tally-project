import { useCallback, useContext, useState } from "react";
import { AppContext } from "../App";
import styles from '../css/pagination.module.css'

const Pagination = () => {
  const { next, prev, fetchData, loading } = useContext(AppContext);
  const handlePaginationClick = useCallback(async (url: string | null) => {
    window.scrollTo(0,0);
    await fetchData(url);
  }, [fetchData])

  return (
    <div className={styles.root}>
      <button className={styles.button} onClick={() => handlePaginationClick(prev)} disabled={!prev || loading}>
        Previous page
      </button>
      <button className={styles.button} onClick={() => handlePaginationClick(next)} disabled={!next || loading}>
        Next page
      </button>
    </div>
  );
}

export default Pagination;
