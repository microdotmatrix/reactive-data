// Import global stylesheet
import "./styles/main.scss";

// Import React's lazy and suspense modules for loading async components
// Import Router functions
import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, useRouteError } from "react-router-dom";

// Synchronous route and loader elements
import Root, { loader as rootLoader } from "./routes/root";
import NewNote, { action as newNoteAction } from "./routes/notes/new";
import Note, {
  loader as noteLoader,
  action as noteAction,
} from "./routes/notes/note";

import { getHomePage, getAboutPage } from './utils/api';

import { loader as blogLoader } from "./routes/blog";
import { loader as postLoader } from "./routes/blog/$slug";
import { loader as shopLoader } from './routes/shop';
import { loader as productLoader } from './routes/shop/$handle'
import Contact from './routes/contact';
import Error from './routes/404';

// Asynchronous route elements, lazy loaded with dynamic import for route based code splitting
const Home = lazy(() => import('./routes/home'));
const About = lazy(() => import('./routes/about'));
const Blog = lazy(() => import('./routes/blog'));
const Post = lazy(() => import('./routes/blog/$slug'));
const Shop = lazy(() => import('./routes/shop'));
const Product = lazy(() => import('./routes/shop/$handle'));

// Page loading fallback element and Shop Context Provider
import Loading from './components/Loading';
import ShopProvider from "./context/store";

// Configuration of React Router v6 data router
// Paths defining route url structures, errorElements to handle Error Boundary responses
// Loaders used for route-specific dynamic data fetching and loading
// Actions control route-specific dynamic data submission handling


let router = createBrowserRouter([
  {
    // Root element loads as parent route wrapping the site's pages in a global layout and context loader
    path: "/",
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorBoundary />,
    children: [
      {
        // Home page element
        index: true,
        loader: 
          async () => {
            const page = await getHomePage()
            if (!page) {
              throw <Error />
            }
            return page;
          },
        errorElement: <ErrorBoundary />,
        element: (
          <Suspense fallback={<Loading />}> 
            <Home />
          </Suspense>
        )
      },
      {
        // About page element
        path: "/about",
        loader:
          async () => {
            const page = await getAboutPage()
            if (!page) {
              throw <Error />
            }
            return page;
          }
        ,
        errorElement: <ErrorBoundary />,
        element: (
          <Suspense fallback={<Loading />}> 
            <About />
          </Suspense>
        )
      },
      {
        // Blog page element, loader function fetching data from WordPress API using GraphQL
        path: "/blog",
        loader: blogLoader,
        errorElement: <ErrorBoundary />,
        element: (
          <Suspense fallback={<Loading />}> 
            <Blog />
          </Suspense>
        )
      },
      {
        // Dynamic route for viewing individual post loaded from WordPress API
        path: "/blog/:slug",
        loader: postLoader,
        errorElement: <ErrorBoundary />,
        element: (
          <Suspense fallback={<Loading />}>
            <Post />
          </Suspense>
        )
      },
      {
        // Shop page element, loader function fetching data from Shopify Storefront API
        path: "/shop",
        loader: shopLoader,
        errorElement: <ErrorBoundary />,
        element: (
          <Suspense fallback={<Loading />}>
            <Shop />
          </Suspense>
        )
      },
      {
        // Dynamic route for viewing individual product details loaded from Shopify API
        path: "/shop/:handle",
        loader: productLoader,
        errorElement: <ErrorBoundary />,
        element: (
          <Suspense fallback={<Loading />}>
            <Product />
          </Suspense>
        )
      },
      {
        // Contact page element
        // TODO: Add route action for handling email form submission
        path: "/contact",
        element: <Contact />
      },
      {
        // Create note function for submitting input data to local cache storage
        // Kept from original example repo forked from Remix-Run/React-Router
        path: "/new",
        element: <NewNote />,
        action: newNoteAction,
      },
      {
        // Dynamic route for viewing individual notes loaded from local storage cache
        // Kept from original example repo forked from Remix-Run/React-Router
        path: "/note/:noteId",
        element: <Note />,
        loader: noteLoader,
        action: noteAction,
        errorElement: <h2>Note not found</h2>,
      },
      {
        path: "/*",
        element: <Error />
      }
    ],
  },
]);

// Customized ErrorBoundary to act as fallback element for data-router elements
// Will print formatted message explaining error function in context
function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return (
    <div>
      <h2>Uh oh, Spaghetti-O</h2>
      <span className="font-semibold text-red-800">Error:</span> <span>{error.message}</span>
    </div>
  );
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

// App function as foundation for site router
export default function App() {
  return (
    <ShopProvider>
      <RouterProvider router={router} />
    </ShopProvider>
  );
}
