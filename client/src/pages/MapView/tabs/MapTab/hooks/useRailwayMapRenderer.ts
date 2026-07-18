/* eslint-disable react-compiler/react-compiler */
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

import { usePersonalization } from '@lifeforge/ui'

import { useRailwayMapContext } from '@/providers/RailwayMapProvider'
import renderLines from '../renderer/renderLines'
import renderStations from '../renderer/renderStations'
import { setupZooming } from '../utils/zoomUtils'

export function useRailwayMapRenderer() {
  const { derivedTheme, bgTempPalette } = usePersonalization()
  const darkMode = derivedTheme === 'dark'

  const {
    map,
    routeMapSVGRef: svgRef,
    routeMapGRef: gRef,
    selectedStation,
    setSelectedStation,
    centerStation
  } = useRailwayMapContext()

  const isInitializedRef = useRef(false)

  const lines = map?.lines || []
  const stations = map?.stations || []

  useEffect(() => {
    if (!svgRef.current || isInitializedRef.current || !centerStation) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const g = svg.append('g')
    gRef.current = g.node() as SVGGElement

    setupZooming(svg, g, centerStation)
    isInitializedRef.current = true

    return () => {
      svg.selectAll('*').remove()
      isInitializedRef.current = false
    }
  }, [svgRef, gRef, centerStation])

  useEffect(() => {
    if (!gRef.current || !isInitializedRef.current) return

    const g = d3.select(gRef.current)
    g.selectAll('*').remove()

    renderLines({
      g,
      lines
    })

    renderStations({
      g,
      stations,
      lines,
      bgTempPalette,
      darkMode,
      selectedStation,
      setSelectedStation,
      svgRef,
      gRef,
      centerStation
    })
  }, [map, bgTempPalette, darkMode, selectedStation, centerStation])
}
