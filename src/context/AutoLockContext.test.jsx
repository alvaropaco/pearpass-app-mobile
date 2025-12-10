import { renderHook, act } from '@testing-library/react-native'

import { AutoLockProvider, useAutoLockContext } from './AutoLockContext'

describe('AutoLockContext', () => {
  it('provides default values when used without provider', () => {
    const { result } = renderHook(() => useAutoLockContext())

    expect(result.current.shouldBypassAutoLock).toBe(false)
    expect(typeof result.current.setShouldBypassAutoLock).toBe('function')
  })

  it('initially sets shouldBypassAutoLock to false within provider', () => {
    const wrapper = ({ children }) => (
      <AutoLockProvider>{children}</AutoLockProvider>
    )

    const { result } = renderHook(() => useAutoLockContext(), { wrapper })

    expect(result.current.shouldBypassAutoLock).toBe(false)
  })

  it('updates shouldBypassAutoLock when setter is called', () => {
    const wrapper = ({ children }) => (
      <AutoLockProvider>{children}</AutoLockProvider>
    )

    const { result } = renderHook(() => useAutoLockContext(), { wrapper })

    act(() => {
      result.current.setShouldBypassAutoLock(true)
    })

    expect(result.current.shouldBypassAutoLock).toBe(true)

    act(() => {
      result.current.setShouldBypassAutoLock(false)
    })

    expect(result.current.shouldBypassAutoLock).toBe(false)
  })
})
