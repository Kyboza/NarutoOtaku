export const formatDateFull = (date: Date) => {
  const formattedDate = new Date(date).toLocaleString(navigator.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
  return formattedDate
}

export const formatDateSmall = (date: Date) => {
  const formattedDate = new Date(date).toLocaleString(navigator.language, {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  return formattedDate
}
