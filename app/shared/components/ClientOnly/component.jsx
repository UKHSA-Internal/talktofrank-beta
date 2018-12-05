export const isClient = () => typeof window !== 'undefined'

export const ClientOnly = props => {
  if (isClient) {
    return props.children
  }

  return null
}
