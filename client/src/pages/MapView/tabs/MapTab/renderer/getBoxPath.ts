function getBoxPath(
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  d: number,
  position: 'first' | 'middle' | 'last' | 'single'
): string {
  if (position === 'single') {
    return `M ${x + r},${y} L ${x + w - r},${y} C ${x + w + d},${y}, ${x + w + d},${y + h}, ${x + w - r},${y + h} L ${x + r},${y + h} C ${x - d},${y + h}, ${x - d},${y}, ${x + r},${y} Z`
  }

  if (position === 'first') {
    return `M ${x + r},${y} L ${x + w},${y} L ${x + w},${y + h} L ${x + r},${y + h} C ${x - d},${y + h}, ${x - d},${y}, ${x + r},${y} Z`
  }

  if (position === 'last') {
    return `M ${x},${y} L ${x + w - r},${y} C ${x + w + d},${y}, ${x + w + d},${y + h}, ${x + w - r},${y + h} L ${x},${y + h} Z`
  }

  return `M ${x},${y} L ${x + w},${y} L ${x + w},${y + h} L ${x},${y + h} Z`
}

export default getBoxPath
