import React from 'react'

import s from './Sidebar.module.scss'

const menu = ['Общественные обсуждения', 'Озерецкая амбулатория', 'Почта', 'Дом культуры', 'Школа', 'Детский сад', 'Общественный транспорт', 'Магазины', 'Услуги', 'Объявления', 'Фермерские продукты']

const Sidebar = () => {
  return (
    <div className={s.sidebar}>
      <p className={s.title}>Меню</p>
      <ul className={s.menu}>
        {
          menu.map((title, id) => (
            <li key={id}>
              <a href="#">{title}</a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Sidebar