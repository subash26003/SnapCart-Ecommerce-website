import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    const [showMenu , setShowMenu] = useState(false)
    const {setShowSearch , getCartCount,navigate,token,setToken,setCartItems} = useContext(ShopContext)

    const handleLogout = () =>{
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        navigate('/login')
    }
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <Link to="/"><img src={assets.logo} className='w-36' alt="logo"/></Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className="nav-links flex flex-col items-center gap-1" > 
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'  />
            </NavLink>
            <NavLink to='/collection' className="nav-links flex flex-col items-center gap-1" > 
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'  />
            </NavLink>
            <NavLink to='/about' className="nav-links flex flex-col items-center gap-1" > 
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'  />
            </NavLink>
            <NavLink to='/contact' className="nav-links flex flex-col items-center gap-1" > 
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'  />
            </NavLink>
        </ul>
        <div className='flex items-center gap-5'>
            <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="search-icon" />
            <div className='group relative'>
                <img onClick={() => token ? null : navigate('/login') } src={assets.profile_icon} className='w-5 cursor-pointer' alt="profile-icon" />
                {/* Dropdown menu */}
                {token && (
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-3'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700 rounded'>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                            <p onClick={handleLogout} className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                    </div>
                )}
                
            </div>
            <Link to="/cart"  className='relative'>
                <img onClick={() => setShowSearch(true)} src={assets.cart_icon} className='w-5' alt="cart-icon" />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 aspect-square leading-4 text-center bg-black text-white text-[10px] rounded-full'>{getCartCount()}</p>
            </Link>
            <img onClick={() => setShowMenu(true)} src={assets.menu_icon} className='cursor-pointer sm:hidden w-5' alt="Hamburger-icon" />
        </div>
        {/* {Mobile Menu} */}
        <div className={`'hidden sm:w-0 absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${showMenu ? 'w-full' : 'w-0'} '`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={() => setShowMenu(false)} className='flex items-center gap-2 cursor-pointer px-4 py-4'>
                    <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="dropdown-icon" />
                    <p>Back</p>
                </div>
                <NavLink onClick={() => setShowMenu(false)} to='/' className="nav-links py-4 px-4 border-b">HOME</NavLink>
                <NavLink onClick={() => setShowMenu(false)} to='/collection' className="nav-links py-4 px-4 border-b">COLLECTION</NavLink>
                <NavLink onClick={() => setShowMenu(false)} to='/about' className="nav-links py-4 px-4 border-b">ABOUT</NavLink>
                <NavLink onClick={() => setShowMenu(false)} to='/contact' className="nav-links py-4 px-4 border-b">CONTACT</NavLink>
            </div>
        </div>
    </div>
  )
}

export default Navbar