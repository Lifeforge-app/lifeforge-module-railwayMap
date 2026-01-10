import { memo } from 'react'

import Header from './components/Header'
import MapView from './components/Maps'
import './index.css'
import RailwayMapProvider from './providers/RailwayMapProvider'

function RailwayMap() {
  return (
    <RailwayMapProvider>
      <Header />
      <MapView />
    </RailwayMapProvider>
  )
}

export default memo(RailwayMap)
