import { createContext, useContext, useMemo, useState } from 'react'

const AutoLockContext = createContext({
  shouldBypassAutoLock: false,
  setShouldBypassAutoLock: () => {}
})

export const AutoLockProvider = ({ children }) => {
  const [shouldBypassAutoLock, setShouldBypassAutoLock] = useState(false)

  const autoLockContextValue = useMemo(
    () => ({ shouldBypassAutoLock, setShouldBypassAutoLock }),
    [shouldBypassAutoLock]
  )

  return (
    <AutoLockContext.Provider value={autoLockContextValue}>
      {children}
    </AutoLockContext.Provider>
  )
}

export const useAutoLockContext = () => useContext(AutoLockContext)
