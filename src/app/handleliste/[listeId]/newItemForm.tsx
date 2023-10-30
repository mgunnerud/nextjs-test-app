'use client'

import { serverUrl } from '@/utils/fetchUtils'
import { useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function NewItemForm(): JSX.Element {
  const router = useRouter()
  const params = useParams()
  const inputRef = useRef<HTMLInputElement>(null)
  const [textValue, setTextValue] = useState<string>('')
  const [isSaving, setIsSaving] = useState<boolean>(false)

  const postData = () => {
    setIsSaving(true)
    fetch(`${serverUrl}/Handleliste/${params.listeId}/items`, {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({
        navn: textValue,
      }),
    })
      .then(() => {
        setTextValue('')
        setIsSaving(false)
        router.refresh()
      })
      .catch(() => {
        setIsSaving(false)
      })
  }

  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
      {isSaving && <div>Lagrer...</div>}
      <input
        autoFocus
        ref={inputRef}
        value={textValue}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            postData()
          }
        }}
        onChange={(event) => setTextValue(event.target.value)}
      />
      <button
        disabled={isSaving}
        style={{ padding: '0.5rem' }}
        onClick={postData}
      >
        Lagre
      </button>
    </div>
  )
}
