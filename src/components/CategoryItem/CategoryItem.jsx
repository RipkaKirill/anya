import React from 'react'
import s from './CategoryItem.module.scss'

import plasticine from '../../assets/img/1.png'
import { Link } from 'react-router-dom'

const CategoryItem = ({ id, title, icon, backgroundColor, path, color }) => {
  return (
    <Link className={s.link} to={path}>
      <div style={{ backgroundColor }}
        className={s.item}>
        <div className={s.img}>
          <img src={icon} alt={title} />
        </div>
        <div style={color && { color }} className={s.title}>{title}</div>
      </div>
    </Link>
  )
}

export default CategoryItem