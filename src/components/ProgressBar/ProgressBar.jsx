import React from 'react'
import s from './ProgressBar.module.scss'

const ProgressBar = ({ percent, size = 220, background, color = 'gray', thickness = 15, fontSize = 30 }) => {
  let circumference = 2 * Math.PI * (size / 2 - 2 * thickness);
  return (
    <div className={s.progress}>
      <svg style={{margin: `-${thickness}px`}} className={s.bg} width={size} height={size} >
        <circle className={s.background} stroke={background} strokeWidth={thickness} cx={size / 2} cy={size / 2} r={size / 2 - 2 * thickness} fill='transparent' />
        <circle className={s.ring}
          stroke={color}
          strokeWidth={thickness}
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 2 * thickness}
          fill='transparent'
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - percent / 100 * circumference}
        />
      </svg>
      <span style={{ fontSize: `${fontSize}px` }} className={s.percent} >{percent}%</span>
    </div>
  )
}

export default ProgressBar