import { forgeRouter, writeContractFileToClient } from '@lifeforge/server-utils'

import * as mapsRoutes from './routes/maps'
import * as signsRoutes from './routes/signs'

const routes = forgeRouter({
  maps: mapsRoutes,
  signs: signsRoutes
})

writeContractFileToClient(routes, import.meta.dirname)

export default routes
