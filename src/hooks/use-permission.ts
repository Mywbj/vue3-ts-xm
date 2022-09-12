import { useStore } from "@/store";

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = permissions.find(item => item === `system:${pageName}:${handleName}`)
  return !!verifyPermission
}
