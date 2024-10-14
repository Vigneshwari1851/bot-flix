import React from "react";
import { InputGroup } from "@blueprintjs/core";

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ query, setQuery }) => {
  return (
    <InputGroup
      placeholder="Search for movies..."
      onChange={(e) => setQuery(e.target.value)}
      value={query}
      large
      style={{ maxWidth: "600px", margin: "0 auto", marginBottom: "20px" }}
    />
  );
};

export default SearchInput;
