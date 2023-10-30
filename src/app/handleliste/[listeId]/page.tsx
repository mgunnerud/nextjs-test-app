import { serverUrl } from '@/utils/fetchUtils'
import { Suspense } from 'react'
import NewItemForm from './newItemForm'
import ListItem from './listItem'

interface Handleliste {
  id: number
  guid: string
  navn: string
  items: HandlelisteItems[]
}

interface HandlelisteItems {
  id: number
  guid: string
  navn: string
  completedDate: Date | null
  handlelisteId: number
}

const getData = async (listeId: string): Promise<Handleliste> => {
  try {
    const res = await fetch(`${serverUrl}/Handleliste/${listeId}`, {
      cache: 'no-store',
    })
    return res.json()
  } catch {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
}

const AwaitableComponent = async (props: {
  listeId: string
}): Promise<React.JSX.Element> => {
  const data = await getData(props.listeId)
  return (
    <div
      style={{
        padding: '1rem',
        fontSize: '2rem',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      {data.items.length === 0 && <div>(listen er tom)</div>}
      {data.items.map((listItem) => {
        return <ListItem key={listItem.id} item={listItem} />
      })}
      <NewItemForm />
    </div>
  )
}

export default async function Page({
  params,
}: {
  params: { listeId: string }
}): Promise<React.JSX.Element> {
  return (
    <Suspense fallback="Loading...">
      <AwaitableComponent listeId={params.listeId} />
    </Suspense>
  )
}
