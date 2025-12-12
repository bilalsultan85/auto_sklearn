export type Theme = 'light' | 'dark' | 'system'

export type Language = 'en' | 'ar'

export interface AppState {
  theme: Theme
  language: Language
  isRtl: boolean
}
