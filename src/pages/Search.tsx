import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  InputGroup,
  Spinner,
  Card,
  Elevation,
  Button,
  H5,
  Icon,
  Classes,
} from "@blueprintjs/core";
import Header from "../components/Header";

const fetchSearchResults = async (query: string, page: number) => {
  if (!query) return { results: [], total_pages: 0 };
 
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
  const url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&language=en-US&page=${page}&include_adult=false`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return {
    results: data.results.map((movie: any) => ({
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      title: movie.title,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
    })),
    total_pages: data.total_pages,
  };
};

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 

  // Debouncing input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); 

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const { data, isLoading, error } = useQuery<any, Error>(
    ["searchResults", debouncedQuery, currentPage],
    () => fetchSearchResults(debouncedQuery, currentPage),
    {
      enabled: !!debouncedQuery,
      onSuccess: (fetchedData) => {
        setTotalPages(fetchedData.total_pages); 
      },
    }
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bp3-dark">
      <Header title="Search Movies" showBackButton={true} />

      <div style={{ padding: "20px", textAlign: "center" }}>
        <InputGroup
          placeholder="Search for movies..."
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(1); 
          }}
          value={query}
          large
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "10px 0",
            borderRadius: "5px",
          }}
          className={Classes.FILL}
        />
      </div>

      {/* Loading spinner */}
      {isLoading && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Spinner intent="primary" />
        </div>
      )}

      {/* Error message */}
      {error && <div>Error fetching movies: {error.message}</div>}

      {/* Movie Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          padding: "20px",
          justifyItems: "center",
        }}
      >
        {data?.results?.map((movie) => (
          <Card
            key={movie.title}
            elevation={Elevation.THREE}
            interactive={true}
            style={{
              width: "200px",
              backgroundColor: "#30404d",
              color: "#f5f8fa",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              style={{
                width: "100%",
                borderRadius: "8px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            <H5
              style={{
                color: "#f5f8fa",
                fontWeight: 600,
                textAlign: "center",
                marginBottom: "5px",
              }}
            >
              {movie.title}
            </H5>
            <p
              style={{
                fontSize: "12px",
                textAlign: "center",
                color: "#ced9e0",
              }}
            >
              Release Date: {movie.releaseDate}
            </p>
            <p
              style={{
                fontSize: "12px",
                textAlign: "center",
                color: "#ced9e0",
              }}
            >
              Rating: {movie.rating} <Icon icon="star" color="#f29d49" />
            </p>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      {data?.results?.length > 0 && (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <Button
            icon="arrow-left"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            large
            style={{ marginRight: "10px" }}
          >
            Previous
          </Button>
          <span
            style={{
              lineHeight: "38px",
              color: "#f5f8fa",
              fontSize: "16px",
              margin: "0 10px",
            }}
          >
            Page {currentPage} of {totalPages}
          </span>
          <Button
            icon="arrow-right"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            large
            style={{ marginLeft: "10px" }}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Search;
