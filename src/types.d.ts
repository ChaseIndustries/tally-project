interface Starship {
  name: string,
  passengers: string,
  manufacturer: string,
  hyperdrive_rating: string,
  comments: string
}

interface AppContextProps {
  ships: Starship[],
  next: string | null,
  prev: string | null,
  error: string | null,
  loading: boolean,
  fetchData: (url?: string | null) => Promise<void>,
  favorites: Favorites,
  setFavorites: React.Dispatch<React.SetStateAction<Favorites>>,
  comments: Comments,
  setComments: Dispatch<SetStateAction<Comments>>
}

interface SWAPIResponse {
  previous: string | null;
  next: string | null;
  results: Starship[];
}

interface Comments {
  [key: string]: string
}

type Favorites = {[key: string]: Starship}