const getTime = (): string => {
  return new Date().toISOString()
}

const info = (namespace: string, message: string, object?: any) => {
  object
    ? console.info(`[${getTime()}] [INFO] [${namespace}] ${message}`, object)
    : console.info(`[${getTime()}] [INFO] [${namespace}] ${message}`)
}

const warn = (namespace: string, message: string, object?: any) => {
  object
    ? console.warn(`[${getTime()}] [INFO] [${namespace}] ${message}`, object)
    : console.warn(`[${getTime()}] [INFO] [${namespace}] ${message}`)
}

const error = (namespace: string, message: string, object?: any) => {
  object
    ? console.error(`[${getTime()}] [INFO] [${namespace}] ${message}`, object)
    : console.error(`[${getTime()}] [INFO] [${namespace}] ${message}`)
}

const debug = (namespace: string, message: string, object?: any) => {
  object
    ? console.debug(`[${getTime()}] [INFO] [${namespace}] ${message}`, object)
    : console.debug(`[${getTime()}] [INFO] [${namespace}] ${message}`)
}

export default {
  info,
  warn,
  error,
  debug,
}
