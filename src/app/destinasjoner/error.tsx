'use client'
import React from 'react'

const Error = ({ reset }: any): React.JSX.Element => {
  return (
    <div>
      <div>Noe gikk feil</div>
      <button onClick={() => reset()}>Prøv igjen</button>
    </div>
  )
}

export default Error
