import { lazy, Suspense, useContext } from 'react'
import { useLoaderData, Link, Outlet } from "react-router-dom";
import { Icon } from '@iconify/react'
import { AnimatePresence } from 'framer-motion';

import { getNotes } from "../utils/notes";
import { getCart } from '../utils/cart';
import { ShopContext } from '../context/store';

import Sidebar from '../components/Sidebar';
import DarkSwitch from '../components/DarkSwitch';

const Cart = lazy(() => import('../components/Cart'));

export async function loader() {
  const cart = await getCart()
  const notes = await getNotes()
  return { cart, notes };
}

export default function Root() {
  let { cart, notes } = useLoaderData()
  let { openCart } = useContext(ShopContext)
  return (
    <>
      <main className='relative flex w-full'>
        <aside className="relative py-8 border-r border-r-slate-300 dark:border-r-zinc-900 justify-center flex flex-col items-center max-h-screen" style={{ flex: "2 0 0" }}>
          <Sidebar />
        </aside>
        <article className="flex flex-col px-12 pt-20 pb-6" style={{ flex: "6 0 0", height: "auto", minHeight: "50%", margin: "auto" }}>
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
