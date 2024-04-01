import { useEffect } from "react";
import "./styles.scss";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfigration, getGenres } from "./store/homeSlice";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


export default function App() {

  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration').then((res) => {
      console.log('res: ', res);
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }
      dispatch(getApiConfigration(url));
    })
  }

  const genresCall = async () => {
    let promises = [];
    let endpoints = ['tv', 'movie'];
    let allGenres = {};

    endpoints.forEach((url) => promises.push(fetchDataFromApi(`/genre/${url}/list`)));

    const data = await Promise.all(promises);
    data.map(({genres}) => {
      return genres.map((item) => {
        return allGenres[item.id] = item;
      });
    });
    
    dispatch(getGenres(allGenres));
  }

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, [])

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:mediaType/:id" element={<Details />}></Route>
        <Route path="/search/:query" element={<SearchResult />}></Route>
        <Route path="/explore/:mediaType" element={<Explore />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
