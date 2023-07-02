import { useContext } from "react";
import { AppContext } from "../App";
import Ships from "./Ships";

const Favorites = () => {
  const { favorites } = useContext(AppContext);
  return (
    <div>
      <h1>Favorites</h1>
      <Ships ships={Array.from(Object.values(favorites))} displayType="favorite" />
    </div>
  );
}

export default Favorites;