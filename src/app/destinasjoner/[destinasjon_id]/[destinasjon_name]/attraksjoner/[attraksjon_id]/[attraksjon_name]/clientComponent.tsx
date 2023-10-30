'use client'

import { serverUrl } from '@/utils/fetchUtils'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function ClientComponent(): React.JSX.Element {
  const { attraksjon_id } = useParams()
  const [details, setDetails] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const loadDetails = async () => {
    setIsLoading(true)
    setIsError(false)
    const res = await fetch(`${serverUrl}/Attraksjon/${attraksjon_id}`)
    if (!res.ok) {
      setIsLoading(false)
      setIsError(true)
      return
    }
    const jsonDetails = await res.json()
    setDetails(jsonDetails)
    setIsLoading(false)
  }
  return (
    <div>
      {!isLoading && !details && (
        <button data-testid="load-button" onClick={() => loadDetails()}>
          Vis detaljer
        </button>
      )}
      {isError && 'Kunne ikke laste klient-data'}
      {isLoading && 'Laster...'}
      {details && (
        <div data-testid="details-div">{JSON.stringify(details)}</div>
      )}
    </div>
  )
}
