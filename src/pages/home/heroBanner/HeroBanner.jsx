import React, { useEffect, useState } from 'react'
import './style.scss';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImages/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {

  const [backgrond, setBackground] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch('/movie/upcoming');

  useEffect(() => {
    const bg = url.backdrop +
      data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
    console.log(bg, backgrond);
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === 'Enter' && query.length) {
      navigate(`/search/${query}`);
    }
  }

  return (
    <div className="heroBanner">
      {!loading &&
        <div className="backdrop-img">
          <Img src={backgrond}></Img>

        </div>}

      <div className="opacity-layer">
        
      </div>

      <ContentWrapper>

        <div className="heroBannerContent">
          <span className="title">
            Welcome
          </span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover.
            Explore now.

            <div className="searchInput">
              <input
                type="text"
                placeholder='Search for a movie or tv show...'
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <button>Search</button>
            </div>

          </span>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner