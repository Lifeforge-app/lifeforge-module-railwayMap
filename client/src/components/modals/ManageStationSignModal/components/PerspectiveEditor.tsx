import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

interface Coord {
  x: number
  y: number
}

export interface Coords {
  topLeft: Coord
  topRight: Coord
  bottomRight: Coord
  bottomLeft: Coord
}

interface PerspectiveEditorProps {
  imageDataUrl: string
  imageWidth: number
  imageHeight: number
  coords: Coords
  onCoordsChange: (coords: Coords) => void
}

function validateCoords(coords: Coords, imgW: number, imgH: number): string | null {
  for (const p of Object.values(coords)) {
    if (p.x < 0 || p.x > imgW || p.y < 0 || p.y > imgH) {
      return 'Points must be within image bounds'
    }
  }

  const points = [
    coords.topLeft,
    coords.topRight,
    coords.bottomRight,
    coords.bottomLeft
  ]

  const crossProduct = (o: number, a: number, b: number) =>
    (points[a].x - points[o].x) * (points[b].y - points[o].y) -
    (points[a].y - points[o].y) * (points[b].x - points[o].x)

  const signs = [
    crossProduct(0, 1, 2),
    crossProduct(1, 2, 3),
    crossProduct(2, 3, 0),
    crossProduct(3, 0, 1)
  ]

  const pos = signs.every(s => s > 0)
  const neg = signs.every(s => s < 0)

  if (!pos && !neg) {
    return 'Points must form a convex quadrilateral'
  }

  const area =
    Math.abs(
      (points[0].x * points[1].y -
        points[1].x * points[0].y +
        points[1].x * points[2].y -
        points[2].x * points[1].y +
        points[2].x * points[3].y -
        points[3].x * points[2].y +
        points[3].x * points[0].y -
        points[0].x * points[3].y) /
        2
    )

  if (area < imgW * imgH * 0.01) {
    return 'Selected area is too small'
  }

  return null
}

export { validateCoords }

function PerspectiveEditor({
  imageDataUrl,
  imageWidth,
  imageHeight,
  coords,
  onCoordsChange
}: PerspectiveEditorProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const coordsRef = useRef(coords)
  const dimsRef = useRef({ imageWidth, imageHeight })

  coordsRef.current = coords
  dimsRef.current = { imageWidth, imageHeight }

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    svg.selectAll('*').remove()

    const g = svg.append('g')

    g.append('image')
      .attr('href', imageDataUrl)
      .attr('width', imageWidth)
      .attr('height', imageHeight)

    const keys = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'] as const

    const minDim = Math.min(imageWidth, imageHeight)
    const s = Math.sqrt(minDim / 800)
    const radius = Math.max(10, 10 * s)
    const strokeW = Math.max(2, 2.5 * s)
    const fontSize = Math.max(11, 14 * s)
    const labelDx = radius * 2
    const labelDy = -radius * 1.5
    const labelStrokeW = Math.max(2, 3 * s)

    const polygon = g
      .append('polygon')
      .attr('fill', 'rgba(0, 120, 255, 0.15)')
      .attr('stroke', '#0078ff')
      .attr('stroke-width', strokeW)

    const updatePolygon = () => {
      const c = coordsRef.current

      polygon.attr(
        'points',
        `${c.topLeft.x},${c.topLeft.y} ${c.topRight.x},${c.topRight.y} ${c.bottomRight.x},${c.bottomRight.y} ${c.bottomLeft.x},${c.bottomLeft.y}`
      )
    }

    updatePolygon()

    keys.forEach(key => {
      const circle = g
        .append('circle')
        .attr('cx', coords[key].x)
        .attr('cy', coords[key].y)
        .attr('r', radius)
        .attr('fill', '#ffffff')
        .attr('stroke', '#0078ff')
        .attr('stroke-width', strokeW)
        .style('cursor', 'move')

      const label = g
        .append('text')
        .attr('x', coords[key].x + labelDx)
        .attr('y', coords[key].y + labelDy)
        .attr('fill', '#ffffff')
        .attr('font-size', fontSize)
        .attr('stroke', '#000000')
        .attr('stroke-width', labelStrokeW)
        .attr('paint-order', 'stroke')
        .text(`${Math.round(coords[key].x)}, ${Math.round(coords[key].y)}`)

      const drag = d3
        .drag<SVGCircleElement, unknown>()
        .on('drag', function (event) {
          const { imageWidth: w, imageHeight: h } = dimsRef.current

          const newX = Math.max(0, Math.min(w, event.x))
          const newY = Math.max(0, Math.min(h, event.y))

          d3.select(this).attr('cx', newX).attr('cy', newY)

          const newCoords = { ...coordsRef.current }

          newCoords[key] = { x: Math.round(newX), y: Math.round(newY) }
          coordsRef.current = newCoords
          onCoordsChange(newCoords)

          label
            .attr('x', newX + labelDx)
            .attr('y', newY + labelDy)
            .text(`${Math.round(newX)}, ${Math.round(newY)}`)

          updatePolygon()
        })

      circle.call(drag as never)
    })

    return () => {
      svg.selectAll('*').remove()
    }
  }, [imageDataUrl])

  return (
    <svg
      ref={svgRef}
      style={{ maxWidth: '100%', borderRadius: '0.5rem' }}
      viewBox={`0 0 ${imageWidth} ${imageHeight}`}
    />
  )
}

export default PerspectiveEditor
