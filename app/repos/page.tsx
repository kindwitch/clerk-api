import Link from 'next/link'
import React from 'react'
import { FaCodeBranch, FaEye, FaStar } from 'react-icons/fa'

const username = 'bradtraversy'
//const username = 'lbcsultan'

export default async function reposPage() {
  // 1. SSG: Static Site Generation
  // const response = await fetch(`http://api.github.com/users/${username}/repos`)

  // 2.SSG: Server-side rendering
  // const response = await fetch(`http://api.github.com/users/${username}/repos`)
  // {cache: 'no-store'}

  // 3.ISR: Incremental Static Generation
  const response = await fetch(
    `http://api.github.com/users/${username}/repos`,
    {
      next: {
        revalidate: 60,
      },
    }
  )

  await new Promise((resolve) => setTimeout(resolve, 1000))
  const repos = await response.json()
  // console.log(repos)

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Repos</h2>
      <ul>
        {
          /*eslint-disable @typescript-eslint/no-explicit-any*/
          repos.map((repo: any) => (
            <li key={repo.id} className="bg-gray-100 m-4 rounded-md">
              <Link href={`/repos/${repo.name}`}>
                <h3 className="text-xl font-bold">{repo.name}</h3>
                <p>{repo.description}</p>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <FaStar /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCodeBranch /> {repo.forks_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaEye /> {repo.watchers_count}
                  </span>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
    </>
  )
}
