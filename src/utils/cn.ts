/**
 * Combines class names using a simple approach
 * This is a minimal implementation without external dependencies
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
