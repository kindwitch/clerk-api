import Link from 'next/link'

interface RepoProps {
  name: string
}

const RepoDirs: React.FC<RepoProps> = async ({ name }) => {
  const username = 'bradtraversy'
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const response = await fetch(
    `http://api.github.com/repos/${username}/${name}`
  )
  const contents = await response.json()
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  const dirs = contents.filter((content: any) => content.type === 'dir')
  console.log(dirs)

  return (
    <div className="mt-2">
      <h3 className="text-xl font-bold">Directories</h3>
      <ul>
        {dirs.map((dir: any) => (
          <li key={dir.path}>
            <Link
              className="underline"
              href={`https://github.com/${username}/${name}/tree/master/${dir.path}`}
            >
              {dir.path}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default RepoDirs
