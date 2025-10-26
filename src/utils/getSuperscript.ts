export function getSuperscript(num: number): string {
  const superscripts = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
  return String(num)
    .split('')
    .map((d) => superscripts[parseInt(d)])
    .join('');
}
