import React, { FC } from "react"

import styles from "./Gender.module.css"
import Link from "next/link"
import Image from "next/image"

interface GenreProps {
    tags_picto: {
        imagetag: null | {
            sourceUrl : string
        }
    }
    name: string
    slug: string
}
const Gender = ({ genres }: { genres: Array<GenreProps> }) => {
    
    return (
        <div className={styles.genre}>
            <h2>Genres</h2>
            <div className={styles.cards}>
                {genres.map((genre: GenreProps, key: number) => (
                    <Card
                        icon={genre.tags_picto.imagetag?.sourceUrl}
                        name={genre.name}
                        href={`/produits/${genre.slug}`}
                        key={key}
                    />
                ))}
            </div>
        </div>
    )
}

const Card = ({ icon, name, href }:{icon?: string | null;name: string;href: string}) => {
    return (
        <Link href={href} className={styles.card} passHref>
           <div className={styles.cardContent}>
            { icon && 
                <div className={styles.cardPicto}>
                    <Image
                        src={icon}
                        alt={name}
                        width={54}
                        height={54}
                        style={{ objectFit: "cover" }}
                    />
                </div> }
                <span className={styles.title}>{name}</span>
           </div>
        </Link>
    )
}
export default Gender
