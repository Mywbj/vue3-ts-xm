import bjRequest from "@/service"
import { IDataType } from "@/service/types"

export function getPageListData(url: string, queryInfo: any) {
  return bjRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return bjRequest.delete<IDataType>((url as any))
}

export function createPageDataAction(url: string, data: any) {
  return bjRequest.post<IDataType>({
    url,
    data
  })
}

export function editPageDataAction(url: any, data: any) {
  return bjRequest.patch<IDataType>({
    url,
    data
  })
}
