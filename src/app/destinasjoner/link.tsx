'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LinkComponent = ({
  id,
  destinasjonNavn,
}: {
  id: number
  destinasjonNavn: string
}): React.JSX.Element => {
  const pathname = usePathname()

  const isActive = pathname.indexOf(id.toString()) > -1
  return (
    <div>
      <Link
        href={`/destinasjoner/${id}/${destinasjonNavn.toLowerCase()}/attraksjoner/`}
        style={isActive ? { textDecoration: 'underline' } : undefined}
      >
        {destinasjonNavn}
      </Link>
    </div>
  )
}

export default LinkComponent
