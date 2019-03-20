export const isClient = () => typeof window !== 'undefined'

export const ClientOnly = props => {
  if (isClient() !== false) {
    return props.children
  }

  return null
}
