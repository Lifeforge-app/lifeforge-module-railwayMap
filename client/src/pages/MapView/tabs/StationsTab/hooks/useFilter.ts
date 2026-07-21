import {
  parseAsString,
  useQueryState,
  useQueryStates
} from 'nuqs'
import { useEffect, useState } from 'react'

export default function useFilter() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    parseAsString.withDefault('')
  )

  const [initialLoading, setInitialLoading] = useState(true)

  const [filter, setFilter] = useQueryStates({
    line: parseAsString.withDefault(''),
    sort: parseAsString.withDefault('name')
  })

  useEffect(() => {
    if (initialLoading) setInitialLoading(false)
  }, [filter, searchQuery])

  const updateFilter = (
    key: keyof typeof filter,
    value: string
  ) => {
    setFilter(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return {
    searchQuery,
    setSearchQuery,
    ...filter,
    updateFilter,
    initialLoading
  }
}
