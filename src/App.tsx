import React from "react";
import AppRouter from "./router/routes"; 
import { QueryClientProvider, QueryClient } from "react-query";
import "@blueprintjs/core/lib/css/blueprint.css";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <AppRouter />
      </div>
    </QueryClientProvider>
  );
};

export default App;
