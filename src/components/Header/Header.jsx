import React, { useState, useRef } from 'react'
import s from './Header.module.scss'

import panda from '../../assets/img/panda.png'
import { NavLink, useNavigate } from 'react-router-dom'

const navLinks = [
  {
    id: 1,
    title: 'Главная',
    path: '/'
  },
  {
    id: 2,
    title: 'Статистика',
    path: 'statistics'
  },
  {
    id: 3,
    title: 'Избранное',
    path: 'favorite'
  }
]
const Header = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef()
  const onSearch = () => {
    navigate(`/all?search=${searchValue}`);
    setSearchValue('')
    inputRef.current.blur()
  }

  return (
    <header className={s.header}>
      <div className={s.container + " container"}>
        <div className={s.headerTop}>
          <div className={s.logo}>
            <img src={panda} alt="" />
          </div>
          <div className={s.searchBlock}>
            <input ref={inputRef} onKeyDown={(e) => e.keyCode === 13 ? onSearch() : null} className={s.search} type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <button onClick={onSearch} className={s.button}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
        <div className={s.headerBottom}>
          {navLinks.map((link) => (
            <NavLink key={link.id} className={s.link} to={link.path} >{link.title}</NavLink>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header