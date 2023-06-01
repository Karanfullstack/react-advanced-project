import React from "react";
import "./style.scss";
import {useFetch} from "../../hooks/useFetch";
import {useParams} from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";

const Details = () => {
  const {mediaType, id} = useParams();
  const {data: videos, loading} = useFetch(`/${mediaType}/${id}/videos`);
  const {data: credits, loading: creditsLoading} = useFetch(
    `/${mediaType}/${id}/credits`
  );
  console.log(credits?.cast);
  return (
    <div>
      <DetailsBanner video={videos?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={videos} loading={loading} />
    </div>
  );
};

export default Details;
