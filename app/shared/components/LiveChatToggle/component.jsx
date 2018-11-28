const today = new Date()
const hour = today.getHours()

export const LiveChatOn = props => {
  if (typeof window !== 'undefined' && (hour >= 14 && hour < 18)) {
    return props.children
  }

  return null
}

export const LiveChatOff = props => {
  if (typeof window !== 'undefined' && (hour < 14 || hour >= 18)) {
    return props.children
  }

  return null
}
