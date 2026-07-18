import * as d3 from 'd3'
import type { MapLine } from '../../../providers/RailwayMapProvider'
import roundedPolygon from './roundedPolygon'

function renderLines({
  g,
  lines
}: {
  g: d3.Selection<SVGGElement | null, unknown, null, undefined>
  lines: MapLine[]
}) {
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]

    if (line.path.length === 0) continue

    const path = roundedPolygon(
      line.path.map(p => ({ x: p[0], y: p[1] })),
      5
    )

    g.append('path')
      .attr('class', `line-path-${index}`)
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', line.color)
      .attr('stroke-width', 5)
      .attr('stroke-linecap', 'round')
  }
}

export default renderLines
