export function generateRouteAsPath(
  routeTemplate: string,
  params: { [key: string]: string | number }
): string {
  return Object.keys(params).reduce((path, paramKey) => {
    return path.replace(`:${paramKey}`, String(params[paramKey]))
  }, routeTemplate)
}
