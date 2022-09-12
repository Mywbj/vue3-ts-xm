import { IBreadcrumb } from '@/base-ui/breadcrumb'
import type { IMenuItem } from '@/service/login/types'
import type { RouteRecordRaw } from 'vue-router'
export function mapMenusToRouter(userMenus: IMenuItem[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.先加载默认所有routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /.ts/)
  routeFiles.keys().forEach(key => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // 2.根据菜单获取需要添加的routes
  function recursionMenus(menus: IMenuItem[]) {
    for (const muneItem of menus) {
      if (muneItem.type === 2) {
        const route = allRoutes.find(item => item.path === muneItem.url)
        if (route) {
          routes.push(route)
        }
      } else {
        recursionMenus(muneItem.children)
      }
    }
  }
  recursionMenus(userMenus)
  return routes
}

type PathMapType = IMenuItem | undefined
export function pathMapToMenu(userMenus: IMenuItem[], currentPath: string, breadcrumbs?: IBreadcrumb[]): PathMapType {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu: PathMapType = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function pathMapBreadcrumbs(userMenus: IMenuItem[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export function mapMenusToPermissions(userMenus: IMenuItem[], ) {
  const permissions: string[] = []

  function _recurseGetPermission(menus: IMenuItem[]) {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push((menu.permission as string))
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permissions
}

export function mapMenusToTree(menus: IMenuItem[]) {
  const treeKeys: number[] = []
  const _recurseGetTreeKey = (children: IMenuItem[]) => {
    for (const menu of children) {
      if (menu.children) {
        _recurseGetTreeKey(menu.children)
      } else {
        treeKeys.push(menu.id)
      }
    }
  }
  _recurseGetTreeKey(menus)
  return treeKeys
}
