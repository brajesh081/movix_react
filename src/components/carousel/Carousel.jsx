import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
// import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import Img from "../lazyLoadImages/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";


const Carousel = ({ data, loading, endpoint }) => {

  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount = dir === "left" ? container.scrollLeft  - (
      container.offsetWidth + 20) : container.scrollLeft  + (
        container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth"
    });
  }

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock">
          <div className="textBlock">
            <div className="title"></div>
            <div className="date"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")} />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")} />
        {
          !loading ? (
            <div className="carouselItems"
            ref={carouselContainer}>
              {
                data?.map((item) => {
                  const posterUrl = item.poster_path ?
                    url.poster + item.poster_path :
                    PosterFallback;
                  return (
                    <div key={item.id}
                      onClick={() => {
                        navigate(`/${item.media_type || endpoint}/${item.id}`)
                      }}
                      className="carouselItem">
                      <div className="posterBlock">
                        <Img src={posterUrl}></Img>
                        <CircleRating rating={item.vote_average.toFixed(1)} />
                        <Genres data={item.genre_ids.slice(0,2)} />
                      </div>
                      <div className="textBlock">
                        <span className="title">
                          {item.title || item.name}
                        </span>
                        <span className="date">
                          { dayjs(item.release_date).format(
                            "MMM D,YYYY"
                          ) }
                        </span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          ) :
            (
              <div
               className="loadingSkeleton"
              >
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
              </div>
            )
        }
      </ContentWrapper>
    </div>
  )
}

export default Carousel