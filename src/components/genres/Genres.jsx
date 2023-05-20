import React from "react";
import {useSelector} from "react-redux";
import "./style.scss";
const Genres = ({data}) => {
  const {genres} = useSelector((state) => state.home);

  if (!genres) {
    return;
  }
  return (
    <div className="genres">
      <>
        {data.map((g) => {
          return (
            <React.Fragment>
              <div key={g} className="genre">
                {genres?.[g]?.name}
              </div>
            </React.Fragment>
          );
        })}
      </>
    </div>
  );
};

export default Genres;
