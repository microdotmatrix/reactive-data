import { NavLink, Link } from 'react-router-dom';

export default function Nav() {
  return (
    <>
      <nav className='flex flex-col justify-center items-center gap-2'>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/shop">Shop</NavLink>
      </nav>
    </>
  )
}