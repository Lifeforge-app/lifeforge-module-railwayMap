import { lazy } from 'react'

import { createForgeModuleClient } from '@lifeforge/federation'

import contract from './contract'

const { forgeAPI, ...manifest } = createForgeModuleClient({
  routes: {
    '/': lazy(() => import('@/pages/MapList')),
    '/map/:id': lazy(() => import('@/pages/MapView'))
  },
  contract
})

export default manifest

export { forgeAPI }
