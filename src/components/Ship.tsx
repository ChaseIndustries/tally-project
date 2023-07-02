import { useCallback, useContext, useState } from 'react';
import styles from '../css/ship.module.css';
import { AppContext } from '../App';
import debounce from 'lodash.debounce'

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<img key={i} src={'/images/full_star.svg'} alt="Star" />);
  }
  if (hasHalfStar) {
    stars.push(<img key="half" src={'/images/half_star.svg'} alt="Half Star" />);
  }
  return <div>{stars}</div>;
};

const Ship = ({ ship, displayType }: { ship: Starship, displayType: 'list' | 'favorite' }) => {
  const { favorites, setFavorites, comments, setComments } = useContext(AppContext);
  const {
    name,
    manufacturer,
    hyperdrive_rating,
    passengers
  } = ship;
  const [comment, setComment] = useState(comments[name]);

  const toggleFavorite = useCallback(() => {
    if (favorites[name]) {
      delete favorites[name]
    } else {
      favorites[name] = ship;
    }
    setFavorites({ ...favorites });
  }, [favorites, name, setFavorites, ship]);

  const handleCommentChange = useCallback((value: string) => {
    // debounce is used for performance, incase we have a list of 1000 ships, 
    //we don't want to update the entire app state on every keystroke
    setComment(value);
    debounce(() => {
      setComments({
        ...comments,
        [name]: value
      });
    }, 100)();
  },[comments, name, setComments]);

  return (
    <div className={styles.root}>
    <div className={styles.ship}>
      <div className={styles.details}>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.manufacturer}>{manufacturer}</div>
        <div className={styles.rating}>
          <StarRating rating={Number(hyperdrive_rating
  )} />
          </div>
        <div className={styles.capacity}>Passengers: {passengers}</div>
      </div>
      <div className={styles.image}>
        <div className={styles.addFavorite}>
          <img src={favorites[name] ? "/images/full_heart.svg" : "/images/empty_heart.svg"} alt="Heart" role="button" onClick={toggleFavorite} />
        </div>
        <img src="/images/starship.jpg" alt="Starship" />
      </div>
      </div>
      {displayType === 'favorite' &&
        (
        <textarea className={styles.input} placeholder="Add text" value={comment} onChange={(e) => handleCommentChange(e.target.value)} />
        )
      }
      </div>
  )
};

export default Ship;