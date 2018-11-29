const ClientOnly = props => {
  if (typeof window !== 'undefined') {
    return props.children
  }

  return null
}

export default ClientOnly
