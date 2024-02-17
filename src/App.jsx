import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { Suspense } from "react";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });

  return (
    <QueryClientProvider client={client}>
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center font-semibold">
            Loading...
          </div>
        }
      >
        <RouterProvider router={routes} />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
