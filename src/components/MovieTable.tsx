import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import {
  HTMLTable,
  Button,
  Intent,
  Spinner,
  NonIdealState,
} from "@blueprintjs/core";

interface Movie {
  poster: string;
  title: string;
  releaseDate: string;
  rating: number;
}

interface MovieTableProps {
  movies: Movie[];
  isLoading?: boolean; 
  isEmpty?: boolean; 
}

const MovieTable: React.FC<MovieTableProps> = ({
  movies,
  isLoading,
  isEmpty,
}) => {
  const columns: ColumnDef<Movie>[] = [
    {
      accessorKey: "poster",
      header: "Poster",
      cell: (info) => (
        <img
          src={info.getValue() as string}
          alt={info.row.original.title}
          style={{
            width: "50px",
            height: "auto",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        />
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "releaseDate",
      header: "Release Date",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: (info) => info.getValue(),
    },
  ];

  const table = useReactTable({
    data: movies,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Spinner size={40} />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div style={{ padding: "20px" }}>
        <NonIdealState
          icon="film"
          title="No Movies Found"
          description="There are no movies to display."
        />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <HTMLTable style={{ width: "100%", borderCollapse: "collapse" }} striped>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  style={{
                    textAlign: "left",
                    backgroundColor: "#2c3e50",
                    color: "#ffffff",
                    padding: "10px",
                    borderBottom: "2px solid #007BFF",
                  }}
                >
                  {typeof column.column.columnDef.header === "function"
                    ? column.column.columnDef.header(column.getContext())
                    : column.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              style={{ cursor: "pointer", transition: "background-color 0.3s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #e0e0e0",
                    verticalAlign: "middle",
                  }}
                >
                  {cell.column.columnDef.cell &&
                  typeof cell.column.columnDef.cell === "function"
                    ? cell.column.columnDef.cell(cell.getContext())
                    : cell.getValue()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </HTMLTable>

      {/* Pagination controls */}
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            icon="double-chevron-left"
            intent={Intent.PRIMARY}
            minimal
            style={{ marginRight: "5px" }}
          />
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            icon="chevron-left"
            intent={Intent.PRIMARY}
            minimal
            style={{ marginRight: "5px" }}
          />
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            icon="chevron-right"
            intent={Intent.PRIMARY}
            minimal
            style={{ marginRight: "5px" }}
          />
          <Button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            icon="double-chevron-right"
            intent={Intent.PRIMARY}
            minimal
          />
        </div>
        <span>
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
      </div>
    </div>
  );
};
export default MovieTable;
