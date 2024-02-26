import React, { FC } from 'react'

import styles from './Actor.module.css'
import Image from 'next/image'
import actor from '.'

interface ActorProps {
  picture: string
  name: string
  actorName: string
}
const Actor: FC<ActorProps> = ({ picture, name, actorName }) => {
  return (
    <div className={styles.actor}>
      <div className={styles.actor_picture}>
        <Image
          src={picture}
          alt={name}
          fill={true}
          style={{ objectFit: 'cover' }}
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </div>
      <div className={styles.actor_content}>
        <h3 className={styles.actor_name}>{name}</h3>
        <p className={styles.actor_actorName}>{actorName}</p>
      </div>
    </div>
  )
}

export default Actor
