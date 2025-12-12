export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
  ABOUT: '/about',
  NOT_FOUND: '*',
} as const

export type RouteKey = keyof typeof ROUTES
