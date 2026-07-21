import { lazy } from 'react'

import { createForgeModule } from '@lifeforge/federation'

import contract from './contract'

const { forgeAPI, ...manifest } = createForgeModule({
  routes: {
    '/': lazy(() => import('@/pages/MapList')),
    '/map/:id': lazy(() => import('@/pages/MapView'))
  },
  contract
})

export default manifest

export { forgeAPI }
