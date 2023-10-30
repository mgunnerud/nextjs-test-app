'use client'

import { serverUrl } from '@/utils/fetchUtils'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

export default function NyAttraksjonForm() {
  const router = useRouter()
  const { destinasjon_id } = useParams()
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [erFormSynlig, setErFormSynlig] = React.useState<boolean>(false)
  const [navn, setNavn] = React.useState<string>('')
  const [type, setType] = React.useState<number>(0)

  const postData = () => {
    setIsSaving(true)
    fetch(`${serverUrl}/Attraksjon`, {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({
        navn: navn,

        type: type,
        destinasjonId: destinasjon_id,
      }),
    })
      .then(() => {
        setNavn('')

        setType(0)
        setErFormSynlig(false)
        setIsSaving(false)
        router.refresh()
      })
      .catch(() => {
        setIsSaving(false)
      })
  }

  if (isSaving) {
    return <div>Lagrer attraksjon...</div>
  }

  return (
    <div>
      {!erFormSynlig && (
        <button
          data-testid="ny-attraksjon"
          onClick={() => setErFormSynlig(true)}
        >
          Legg til ny attraksjon
        </button>
      )}
      {erFormSynlig && (
        <div>
          <div>
            <label>
              Navn:
              <input
                data-testid="attraksjon-navn"
                value={navn}
                onChange={(event) => setNavn(event.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Type:
              <select
                data-testid="attraksjon-type"
                value={type}
                onChange={(event) => setType(+event.target.value)}
              >
                <option value={1}>Middag</option>
                <option value={2}>Museum</option>
                <option value={3}>Butikk</option>
                <option value={4}>Lunsj</option>
                <option value={5}>Frokost</option>
                <option value={6}>Øl</option>
                <option value={7}>Turmal</option>
                <option value={8}>Is</option>
                <option value={9}>Annet</option>
              </select>
            </label>
          </div>
          <button
            onClick={() => postData()}
            data-testid="lagreknapp"
            disabled={!navn}
          >
            Lagre attraksjon
          </button>
          <button onClick={() => setErFormSynlig(false)}>Avbryt</button>
        </div>
      )}
    </div>
  )
}
