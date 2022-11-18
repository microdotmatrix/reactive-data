import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ShopContext } from '_x/store';

export default function Nav() {
  const { isNavOpen, closeNav } = useContext(ShopContext)
  return (
    <>
      <nav className='flex flex-col justify-center items-center gap-2'>
        <NavLink to="/about" onClick={() => closeNav()}>About</NavLink>
        <NavLink to="/contact" onClick={() => closeNav()}>Contact</NavLink>
        <NavLink to="/blog" onClick={() => closeNav()}>Blog</NavLink>
        <NavLink to="/shop" onClick={() => closeNav()}>Shop</NavLink>
      </nav>
    </>
  )
}