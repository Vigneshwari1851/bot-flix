import React from "react";
import { useQuery } from "react-query";
import MovieTable from "../components/MovieTable";
import { Spinner, NonIdealState } from "@blueprintjs/core";
import Header from "../components/Header";

const fetchTrendingMovies = async () => {
   const apiKey = import.meta.env.VITE_TMDB_API_KEY;
   const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
   const url = `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.results.map((movie: any) => ({
    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    title: movie.title,
    releaseDate: movie.release_date,
    rating: movie.vote_average,
  }));
};

const Home: React.FC = () => {
  const { data, isLoading, error } = useQuery<any[], Error>(
    "trendingMovies",
    fetchTrendingMovies
  );

  if (isLoading) return <Spinner intent="primary" />;
  if (error)
    return (
      <NonIdealState
        title="Error fetching movies"
        description={error.message}
      />
    );

  return (
    <div>
      <Header title="The Movies" showSearchButton={true} />{" "}
      <MovieTable movies={data} />
    </div>
  );
};

export default Home;
