import React from 'react'
import s from './Categories.module.scss'
import CategoryItem from '../CategoryItem/CategoryItem'

import { links } from '../../links'

const Categories = () => {
  return (
    <div className={s.categories}>
      <div className={s.row}>
        {
          links.map(el => (
            <CategoryItem key={el.id} {...el} />
          ))
        }
      </div>
    </div>

  )
}

export default Categories