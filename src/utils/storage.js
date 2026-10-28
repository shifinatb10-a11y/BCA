export const asset = (name) => `/assets/${name}`

const memoryStore = {}

export const loadStorage = (key, fallback) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(`bca_${key}`)
      if (saved) return JSON.parse(saved)
    }
  } catch (e) {}
  return key in memoryStore ? memoryStore[key] : fallback
}

export const saveStorage = (key, value) => {
  memoryStore[key] = value
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(`bca_${key}`, JSON.stringify(value))
    }
  } catch (e) {}
}
