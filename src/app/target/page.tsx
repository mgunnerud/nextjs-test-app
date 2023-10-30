import { serverUrl } from '@/utils/fetchUtils'
import React, { Suspense } from 'react'

interface WeatherData {
  date: string
  temperatureC: number
  summary: string
}

const getData2 = async (): Promise<WeatherData[]> => {
  try {
    const res = await fetch(`${serverUrl}/WeatherForecast`)
    return res.json()
  } catch {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
}

const AwaitableComponent = async (): Promise<React.JSX.Element> => {
  const data2 = await getData2()
  return (
    <div>
      {data2.map((x) => {
        return <div key={x.date}>{x.summary}</div>
      })}
    </div>
  )
}

export default async function Page(): Promise<React.JSX.Element> {
  return (
    <div>
      <div>Target page2</div>
      <Suspense fallback="Loading...">
        <AwaitableComponent />
      </Suspense>
    </div>
  )
}
