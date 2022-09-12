import { App } from "vue"
import type { IFilters } from './types'
import { formUtcString } from "@/utils/date-form"

// 全局挂载一些东西
export function registerProperties(app: App) {
  const $filters: IFilters = {
    formatTime(value) {
      return formUtcString(value)
    }
  }
  app.config.globalProperties.$filters = $filters
}
