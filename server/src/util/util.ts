export const setErrorMessange = (error:unknown) => {
  let message = "Unknown error"
  if (error instanceof Error) message = error.message
  return message
}