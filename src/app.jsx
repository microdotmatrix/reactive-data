import "./styles/main.scss";
import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, useRouteError } from "react-router-dom";

import Root, { loader as rootLoader } from "./routes/root";
import NewNote, { action as newNoteAction } from "./routes/new";
import Note, {
  loader as noteLoader,
  action as noteAction,
} from "./routes/note";
import { loader as blogLoader } from "./routes/blog";
import { loader as postLoader } from "./routes/blog/$slug";
import { loader as shopLoader } from './routes/shop';
import { loader as productLoader } from './routes/shop/$handle'
import Contact from './routes/contact';
import Error from './routes/404';

const Home = lazy(() => import('./routes/home'));
const About = lazy(() => import('./routes/about'));
const Blog = lazy(() => import('./routes/blog'));
const Post = lazy(() => import('./routes/blog/$slug'));
const Shop = lazy(() => import('./routes/shop'));
const Product = lazy(() => import('./routes/shop/$handle'));

import Loading from './components/Loading';
import ShopProvider from "./context/store";
let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        errorElement: <ErrorBoundary />,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: "about",
        errorElement: <ErrorBoundary />,
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        )
      },
      {
        path: "blog",
        loader: blogLoader,
        errorElement: <ErrorBoundary />,
        element: 
          <Suspense fallback={<Loading />}>
            <Blog />
          </Suspense>,
      },
      {
        path: "blog/:slug",
        loader: postLoader,
        errorElement: <ErrorBoundary />,
        element: 
          <Suspense fallback={<Loading />}>
            <Post />
          </Suspense>
      },
      {
        path: "shop",
        loader: shopLoader,
        errorElement: <ErrorBoundary />,
        element: 
          <Suspense fallback={<Loading />}>
            <Shop />
          </Suspense>
      },
      {
        path: "shop/:handle",
        loader: productLoader,
        errorElement: <ErrorBoundary />,
        element: 
          <Suspense fallback={<Loading />}>
            <Product />
          </Suspense>
      },
      {
        path: "contact",
        element:
          <Contact />
      },
      {
        path: "new",
        element: <NewNote />,
        action: newNoteAction,
      },
      {
        path: "note/:noteId",
        element: <Note />,
        loader: noteLoader,
        action: noteAction,
        errorElement: <h2>Note not found</h2>,
      },
      {
        path: "/*",
        element:
          <Error />
      }
    ],
  },
]);

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

export default function App() {
  return (
    <ShopProvider>
      <RouterProvider router={router} />
    </ShopProvider>
  );
}
