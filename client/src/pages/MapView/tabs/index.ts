import { createTabbedView } from '@lifeforge/ui'

const MapTabbedView = createTabbedView({
  useNuqs: true,
  tabs: [
    {
      id: 'map',
      name: 'tabs.map',
      icon: 'tabler:map'
    },
    {
      id: 'stations',
      name: 'tabs.stations',
      icon: 'tabler:map-pin'
    }
  ]
})

export default MapTabbedView
