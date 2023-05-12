import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useFetch} from "../../../hooks/useFetch";
import {useSelector} from "react-redux";
import {ContentWrapper} from "../../../components/contentWrapper/ContentWrapper";
import {Img} from "../../../components/lazyLoaderImage/Img";
import "./style.scss";

const HeroBanner = () => {
  const {url} = useSelector((state) => state.home);
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // @Data Fetch From Custom Hook
  const {data, loading} = useFetch("/movie/upcoming");
  // @Code For Random Background Path and set to Background State
  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);
  console.log(background);
  // @ForSearchQuery and Navigate to Search Page
  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  console.log(query);
  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
        
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              onKeyUp={searchQueryHandler}
              onChange={(event) => setQuery(event.target.value)}
              pattern="Search for a Movie or TV show.."
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
