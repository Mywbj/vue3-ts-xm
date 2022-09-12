import { ref } from "vue"
import BJPageContent from "@/components/page-content"

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof BJPageContent>>()

  function handleResetClick() {
    (pageContentRef.value as any)?.getPageData()
  }
  function handleQueryClick(queryInfo: any) {
    (pageContentRef.value as any)?.getPageData(queryInfo.value)
  }
  return {
    pageContentRef, handleResetClick, handleQueryClick
  }
}
