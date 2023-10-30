'use client'

import { serverUrl } from '@/utils/fetchUtils'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function NyDestinasjonForm() {
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [erFormSynlig, setErFormSynlig] = React.useState<boolean>(false)
  const [navn, setNavn] = React.useState<string>('')

  const postData = () => {
    setIsSaving(true)
    fetch(`${serverUrl}/Destinasjon/`, {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({
        navn: navn,
      }),
    })
      .then(() => {
        setNavn('')

        setErFormSynlig(false)
        setIsSaving(false)
        router.refresh()
      })
      .catch(() => {
        setIsSaving(false)
      })
  }

  if (isSaving) {
    return <div>Lagrer...</div>
  }

  return (
    <div>
      {!erFormSynlig && (
        <button
          data-testid="ny-destinasjon"
          onClick={() => setErFormSynlig(true)}
        >
          Legg til ny destinasjon
        </button>
      )}
      {erFormSynlig && (
        <div>
          <div>
            <label>
              Navn:
              <input
                data-testid="destinasjon-navn"
                value={navn}
                onChange={(event) => setNavn(event.target.value)}
              />
            </label>
          </div>

          <button
            onClick={() => postData()}
            data-testid="lagreknapp"
            disabled={!navn}
          >
            Lagre
          </button>
          <button onClick={() => setErFormSynlig(false)}>Avbryt</button>
        </div>
      )}
    </div>
  )
}
