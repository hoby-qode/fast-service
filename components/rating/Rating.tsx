import React from 'react'
import styles from './Rating.module.css'
const Rating = ({ number }: { number: number }) => {
  return (
    <div className={styles.rating}>{number}%</div>
    // <div className="relative w-32 h-32">
    //   <svg className="absolute top-0 left-0 transform -rotate-90" width="100" height="100" viewBox="0 0 100 100">
    //     <circle className="text-gray-200" cx="50" cy="50" r="45" fill="none" strokeWidth="10" />
    //     <circle className="text-blue-500" cx="50" cy="50" r="45" fill="none" strokeWidth="10" strokeDasharray={`${number}, 100`} strokeLinecap="round" />
    //   </svg>
    //   <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
    //     <span className="text-2xl font-bold text-blue-500">{number}%</span>
    //   </div>
    // </div>
  )
}

export default Rating
