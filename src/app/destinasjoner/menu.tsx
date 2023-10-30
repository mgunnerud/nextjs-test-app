import React, { Suspense } from 'react'
import InternalLink from './link'
import Link from 'next/link'
import { serverUrl } from '@/utils/fetchUtils'

interface DestinasjonData {
  id: number
  navn: string
  coords?: number[]
}

const getData = async (): Promise<DestinasjonData[]> => {
  const res = await fetch(`${serverUrl}/Destinasjon`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Kunne ikke hente data')
  }

  return res.json()
}

const AwaitableComponent = async (): Promise<React.JSX.Element> => {
  const data2 = await getData()
  return (
    <div>
      <div data-testid="destinasjon-liste">
        {data2.map((x) => {
          return <InternalLink key={x.id} id={x.id} destinasjonNavn={x.navn} />
        })}
      </div>
      <Link
        href={`/destinasjoner/`}
        style={{ marginTop: '1rem', display: 'inline-block' }}
      >
        + ny destinasjon
      </Link>
    </div>
  )
}

export default function Menu(): React.JSX.Element {
  return (
    <Suspense fallback="Laster destinasjoner...">
      <AwaitableComponent />
    </Suspense>
  )
}
