import { ref } from "vue"
import BJPageModal from "@/components/page-modal"

type callbackFn = (...args: any) => void
export function usePageModal(newCallback?: callbackFn, editCallback?: callbackFn) {
  const pageModalRef = ref<InstanceType<typeof BJPageModal>>()
  const defaultInfo = ref({})

  function handleNewBtnClick() {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      newCallback?.()
      pageModalRef.value.setDialogTitle('新增')
      pageModalRef.value.dialogVisible = true
    }
  }

  function handleEditBtnClick(item: any) {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      editCallback?.(item)
      pageModalRef.value.setDialogTitle('编辑')
      pageModalRef.value.dialogVisible = true
    }
  }

  return {
    pageModalRef,
    defaultInfo,
    handleNewBtnClick,
    handleEditBtnClick
  }
}
