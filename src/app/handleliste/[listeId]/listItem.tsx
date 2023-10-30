'use client'

import { serverUrl } from '@/utils/fetchUtils'
import { useParams } from 'next/navigation'
import { useState } from 'react'

interface ListItemProps {
  item: any
}

export default function ListItem({ item }: ListItemProps): JSX.Element {
  const params = useParams()
  const [isError, setIsError] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<boolean>(!!item.completedDate)

  const toggleChecked = () => {
    setIsError(false)
    setIsChecked((prev) => !prev) // optimistic update
    fetch(`${serverUrl}/Handleliste/${params.listeId}/items/${item.guid}`, {
      method: 'PUT',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({
        ...item,
        completedDate: isChecked ? null : new Date(),
      }),
    })
      .then(() => {})
      .catch(() => {
        setIsChecked((prev) => !prev) // reset back to old state on error
        setIsError(true)
      })
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <input
        type="checkbox"
        onChange={() => toggleChecked()}
        checked={isChecked}
        id={item.guid}
        style={{ height: '2rem', width: '2rem' }}
      />
      <label
        htmlFor={item.guid}
        style={
          isChecked
            ? {
                textDecoration: 'line-through',
                opacity: 0.4,
              }
            : undefined
        }
      >
        {item.navn}
      </label>
      {isError && (
        <div style={{ color: 'red' }}>Kunne ikke oppdatere liste</div>
      )}
    </div>
  )
}
