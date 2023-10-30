import React from 'react'
import Menu from './menu'

const Layout = ({ children }: any): React.JSX.Element => {
  return (
    <div id="route-root" style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ width: '200px' }}>
        <Menu />
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  )
}

export default Layout
