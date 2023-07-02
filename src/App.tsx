import { createContext, useCallback, useMemo, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import './css/global.css';
import Favorites from "./components/Favorites";
import Layout from "./components/Layout";
import Api from "./api";
import Home from "./components/Home";

const INITIAL_APP_CONTEXT: AppContextProps = {
  loading:true,
  favorites: {},
  ships: [],
  setFavorites: () => {},
  next: null,
  prev: null,
  fetchData: async () => {},
  comments: {},
  setComments: () => {},
  error: null,
}

export const AppContext = createContext<AppContextProps>(INITIAL_APP_CONTEXT);

export default function App() {
  const [favorites, setFavorites] = useState<Favorites>({});
  const [data, setData] = useState<SWAPIResponse>();
  const [comments, setComments] = useState<Comments>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const next = useMemo(() => data?.next || null, [data]);
  const prev = useMemo(() => data?.previous || null, [data]);
  const ships = useMemo(() => data?.results || [], [data]);
  
  const fetchData = useCallback(async (url?: string | null) => {
    try {
      setLoading(true);
      const response = await Api.request(url || 'https://swapi.dev/api/starships/');
      setData(response);
    } catch (err) {
      console.error(err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AppContext.Provider value={{
      loading,
      fetchData,
      ships,
      next,
      prev,
      favorites,
      error,
      setFavorites,
      comments,
      setComments,
    }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      </AppContext.Provider>
  );
}


function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}