import React from 'react'
import NyDestinasjonForm from './nydestinasjonForm'

export default function Page(): React.JSX.Element {
  return (
    <div>
      <div>Velg destinasjon til venstre</div>
      <NyDestinasjonForm />
    </div>
  )
}
