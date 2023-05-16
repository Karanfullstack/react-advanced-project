import React, {useRef} from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import {ContentWrapper} from "../contentWrapper/ContentWrapper";
import {Img} from "../lazyLoaderImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss";

const Carousel = ({data, loading}) => {
  const carouselContainer = useRef();
  const {url} = useSelector((state) => state.home);
  const navigate = useNavigate();

  const skitem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton">
          <div className="textBlock">
            <div className="title skeleton"></div>
            <div className="date skeleton"></div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" />

        <BsFillArrowRightCircleFill className="carouselRighttNav arrow " />
        {loading ? (
          <div className="loadingSkeleton">
          {skitem()}
          {skitem()}
          {skitem()}
          {skitem()}
          {skitem()}
          </div>
        ) : (
          <div className="carouselItems">
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div key={item.id} className="carouselItem">
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.name || item.title}</span>
                    <span className="date">
                      {dayjs(item.release_Date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
