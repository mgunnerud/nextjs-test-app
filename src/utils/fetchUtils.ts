export const fetchJsonData = async <T>(url: string): Promise<T> => {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Kunne ikke hente data')
  }
  return res.json()
}

const localServerUrl = 'http://localhost:5081'
const azureServerUrl = 'https://mjg-reise-app-v2.azurewebsites.net'
export const serverUrl =
  process.env.NODE_ENV === 'development' ? localServerUrl : azureServerUrl
