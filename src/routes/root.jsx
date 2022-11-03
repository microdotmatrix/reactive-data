import { lazy, Suspense, useContext } from 'react'
import { useLoaderData, Link, Outlet } from "react-router-dom";
import Helmet from 'react-helmet';
import { Icon } from '@iconify-icon/react'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion';

import { getNotes } from "../utils/notes";
import { getCart } from '../utils/cart';
import { ShopContext } from '../context/store';
import { getSiteInfo, getNavMenu } from '../utils/api';

import Sidebar from '../components/Sidebar';
import DarkSwitch from '../components/DarkSwitch';

const Cart = lazy(() => import('../components/Cart'));

const SEO_OG_IMAGE_URL = null;

export async function loader() {
  const cart = await getCart()
  const notes = await getNotes()
  const menu = await getNavMenu()
  const wpInfo = await getSiteInfo()
  return { cart, notes, menu, wpInfo };
}

export default function Root() {
  let { cart, notes, wpInfo, menu } = useLoaderData()
  let { openCart } = useContext(ShopContext)
  return (
    <>
      <Helmet>
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <meta
          name="description"
          content={`Demo site using React Router v6.4 as a framework for data and routing with React 18.`}
        />
        <meta property="og:image" content={SEO_OG_IMAGE_URL} />
      </Helmet>
      <main className='relative flex w-full'>
        <aside className="relative py-8 justify-center flex flex-col items-center max-h-screen" style={{ flex: "2 0 0" }}>
          <Sidebar />
        </aside>
        <article id="content" className="flex flex-col h-full min-h-screen justify-center border-l border-l-slate-300 dark:border-l-zinc-900  px-12 pt-4 pb-6" style={{ flex: "6 0 0", height: "auto", margin: "auto" }}>
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </article>
      </main>

      <div className="absolute top-8 right-8 z-10 flex flex-row gap-8">
        <div className='theme-selector'>
          <DarkSwitch width="3em" style={{ cursor: 'pointer' }} />
        </div>
        <div className="cart-selector">
          <button onClick={() => openCart()}><Icon icon="mdi:cart" width="3em" /></button>
        </div>
      </div>
     
      <Suspense fallback={null}>
        <Cart />
      </Suspense>
    </>
  );
}
