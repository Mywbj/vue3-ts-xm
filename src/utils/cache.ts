class LocalCache {
  setCache(key: string, value: any, isLocalSorage?: boolean) {
    if (!isLocalSorage) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      sessionStorage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string, isLocalSorage?: boolean) {
    let value: any = null
    if (!isLocalSorage) {
      value = localStorage.getItem(key)
    } else {
      value = sessionStorage.getItem(key)
    }
    return value ? JSON.parse(value) : ''
  }

  deleteCache(key: string, isLocalSorage?: boolean) {
    if (!isLocalSorage) {
      localStorage.removeItem(key)
    } else {
      sessionStorage.removeItem(key)
    }
  }

  clearCache(isLocalSorage?: boolean) {
    if (!isLocalSorage) {
      localStorage.clear()
    } else {
      sessionStorage.clear()
    }
  }
}
const cache = new LocalCache()

export default cache
