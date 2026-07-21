import { createViewMode } from '@lifeforge/ui'

export const ViewMode = createViewMode({
  modes: [
    { icon: 'tabler:list', value: 'list' },
    { icon: 'tabler:grid-dots', value: 'grid' }
  ],
  selectorProps: {
    display: { base: 'none', md: 'flex' }
  }
})
