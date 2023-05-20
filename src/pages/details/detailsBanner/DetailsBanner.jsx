import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import "./style.scss";
import {ContentWrapper} from "../../../components/contentWrapper/ContentWrapper";
import {useFetch} from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import {Img} from "../../../components/lazyLoaderImage/Img";
import PosterFallback from "../../../assets/no-poster.png";
import {PlayIcon} from "./PlayIcon";

const DetailsBanner = ({video, crew}) => {
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const {mediaType, id} = useParams();
  const {data, loading} = useFetch(`/${mediaType}/${id}`);
  const {url} = useSelector((state) => state.home);
  const _genre = data?.genres?.map((g) => g.id);
  console.log(_genre);

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title} (${dayjs(
                        data.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>
                    <Genres data={_genre} />
                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <div className="playbtn">
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>
                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}

                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Dte: </span>
                          <span className="text">{data.release_date}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
