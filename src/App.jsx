import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Events from "./components/Events/Events.jsx";
import EventDetails from "./components/Events/EventDetails.jsx";
import NewEvent from "./components/Events/NewEvent.jsx";
import EditEvent from "./components/Events/EditEvent.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from './util/http.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/events" />,
  },
  {
    path: "/events",
    element: <Events />,

    children: [
      {
        path: "/events/new",
        element: <NewEvent />,
      },
    ],
  },
  {
    path: "/events/:id",
    element: <EventDetails />,
    children: [
      {
        path: "/events/:id/edit",
        element: <EditEvent />,
      },
    ],
  },
]);



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

// Tanstack Query - A library that helps with sending HTTP requests and keeping your frontend UI in sync
// u can use useEffect and useFetch for API calls but tanstack simplify your code and  make it more readable
// useQuery() sends http request and tells us about loading and if there is error
// tanstack manages data, errors, caching and much more ( to send http request we have to write code )
// queryKey - when again and again sends data It also allows queries with the same key to avoid
// unnecessary fetches by leveraging the cached response.
// queryKey -  It also helps maintain consistent state throughout your app
// save response in JS memory(comp state manged by React) called cached data and the react query used this
// cached data to avoid unecessary calls
// staleTime - when no uncessary calls will hit default is 0 
// gcTime - this make sure that data in cache will kept default is 5 mins 
// useMutation -> sents request when u tell it to sent thats why we use it for submit form
// queryClient.invalidateQueries({queryKey: ['events']}); --->>  this will invalidate all the queries with key ['events']
// when on edit event we get data in details page with same key and when edit modal open its directly shows data 
// bcz data was in cache already thats how improve performance