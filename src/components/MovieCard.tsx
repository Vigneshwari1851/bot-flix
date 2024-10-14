import React from "react";
import { Card, Elevation } from "@blueprintjs/core";

interface MovieCardProps {
  title: string;
  poster: string;
  releaseDate: string;
  rating: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  poster,
  releaseDate,
  rating,
}) => {
  return (
    <Card
      elevation={Elevation.TWO}
      style={{
        margin: "10px",
        width: "200px",
        transition: "transform 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img
        src={poster}
        alt={title}
        style={{ width: "100%", borderRadius: "5px 5px 0 0" }}
      />
      <div style={{ padding: "10px" }}>
        <h5 style={{ margin: "0 0 5px 0", fontSize: "1.1em" }}>{title}</h5>
        <p style={{ margin: "5px 0", fontSize: "0.9em" }}>
          Release Date: {releaseDate}
        </p>
        <p style={{ margin: "5px 0", fontSize: "0.9em" }}>Rating: {rating}</p>
      </div>
    </Card>
  );
};

export default MovieCard;
