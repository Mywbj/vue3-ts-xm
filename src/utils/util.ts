export function initialToUpperCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function changeElIcon(iconName: string, ElementPlusIconsVue: any) {
  const keys = iconName.split('-').slice(2).map(str => initialToUpperCase(str))
  const iconKey = keys.join('')
  return ElementPlusIconsVue[iconKey]
}
