import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import {useFetch} from "../../../hooks/useFetch";

const Similar = ({mediaType, id}) => {
  const {data, loading, error} = useFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";
  const endPoint = mediaType === "movie" ? "movie" : "tv";
  return (
    <Carousel
      title={title}
      data={data?.results}
      loading={loading}
      endPoint={endPoint}
    />
  );
};

export default Similar;
