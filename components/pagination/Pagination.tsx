'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Pagination = ({
  postsPerPage,
  totalPosts,
}: {
  postsPerPage: number
  totalPosts: number
}) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  const searchParams = useSearchParams()

  const pageCurrent: number = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1

  return (
    <ul className="d-flex align-items-center gap-10">
      {pageCurrent > 1 ? (
        <li className="list-style-none">
          <Link href={`?page=${pageCurrent - 1}`} className="prev btn">
            {`<`}
          </Link>
        </li>
      ) : (
        ''
      )}

      {pageNumbers.length > 1
        ? pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-number list-style-none ${
                number === pageCurrent ? 'active' : ''
              }`}
            >
              <Link href={`?page=${number}`} className="page-number-link btn">
                {number}
              </Link>
            </li>
          ))
        : ''}

      {pageCurrent == pageNumbers.length ? (
        ''
      ) : (
        <li className="list-style-none">
          <Link href={`?page=${pageCurrent + 1}`} className="next btn">
            {`>`}
          </Link>
        </li>
      )}
    </ul>
  )
}

export default Pagination
