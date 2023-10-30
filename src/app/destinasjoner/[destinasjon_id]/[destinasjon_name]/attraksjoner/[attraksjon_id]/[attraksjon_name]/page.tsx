import ClientComponent from './clientComponent'

export default function Page({
  params,
}: {
  params: { attraksjon_name: string }
}): JSX.Element {
  return (
    <div>
      Detalj-slug: {params.attraksjon_name}
      <ClientComponent />
    </div>
  )
}
