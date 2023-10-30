import React, { Suspense } from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { fetchJsonData, serverUrl } from '@/utils/fetchUtils'
import NyAttraksjonForm from './nyAttraksjonForm'

enum AttraksjonType {
  Middag = 1,
  Museum = 2,
  Butikk = 3,
  Lunsj = 4,
  Frokost = 5,
  Ol = 6,
  Turmal = 7,
  Is = 8,
  Annet = 9,
}

const AttraksjonNavn = {
  [AttraksjonType.Middag]: 'Middag',
  [AttraksjonType.Museum]: 'Museum',
  [AttraksjonType.Butikk]: 'Butikk',
  [AttraksjonType.Lunsj]: 'Lunsj',
  [AttraksjonType.Frokost]: 'Frokost',
  [AttraksjonType.Ol]: 'Øl',
  [AttraksjonType.Turmal]: 'Turmål',
  [AttraksjonType.Is]: 'Iskrem',
  [AttraksjonType.Annet]: 'Annet',
}

interface AttraksjonData {
  id: number
  navn: string
  type: AttraksjonType
  coords?: number[]
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  // fetch data
  const destinasjonData = await getDestinasjonData(params.destinasjon_id)

  return {
    title: `Attraksjoner i ${destinasjonData.navn}`,
  }
}

const getDestinasjonData = async (
  destinasjonId: string
): Promise<{ navn: string }> => {
  return fetchJsonData<{ navn: string }>(
    `${serverUrl}/Destinasjon/${destinasjonId}`
  )
}

const getData = async (destinasjon_id: string): Promise<AttraksjonData[]> => {
  return fetchJsonData<AttraksjonData[]>(
    `${serverUrl}/Destinasjon/${destinasjon_id}/attraksjoner/`
  )
}

const AwaitableComponent = async (props: {
  destinasjonId: string
  destinasjonNavn: string
}): Promise<React.JSX.Element> => {
  const data2 = await getData(props.destinasjonId as string)
  return (
    <div>
      <div data-testid="attraksjon-list">
        {data2.map((x) => {
          return (
            <div key={x.id}>
              <Link
                href={`/destinasjoner/${props.destinasjonId}/${
                  props.destinasjonNavn
                }/attraksjoner/${x.id}/${x.navn
                  .toLowerCase()
                  .replaceAll(' ', '_')}`}
              >{`${x.navn} - ${AttraksjonNavn[x.type]}`}</Link>
            </div>
          )
        })}
      </div>
      <NyAttraksjonForm />
    </div>
  )
}

const NameSuspenseComponent = async (props: {
  destinasjonId: string
}): Promise<React.JSX.Element> => {
  const destinasjonData = await getDestinasjonData(props.destinasjonId)
  return (
    <div>Destinasjon-attraksjoner komponent for {destinasjonData.navn}</div>
  )
}

export default async function Page({
  params,
}: {
  params: { destinasjon_id: string; destinasjon_name: string }
}): Promise<React.JSX.Element> {
  const destinasjon_id = params.destinasjon_id
  const destinasjon_name = params.destinasjon_name
  return (
    <div>
      <div>
        <Suspense fallback="Laster destinasjon...">
          <NameSuspenseComponent destinasjonId={destinasjon_id} />
        </Suspense>
      </div>
      <br />
      <Suspense fallback="Laster attraksjoner...">
        <AwaitableComponent
          destinasjonId={destinasjon_id}
          destinasjonNavn={destinasjon_name}
        />
      </Suspense>
    </div>
  )
}
