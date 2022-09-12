import { IFilters } from "./global/register-properties/types"
// 自定义全局模板
export {}
declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: IFilters
    $store: any
  }
}
