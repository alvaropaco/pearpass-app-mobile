import { useNavigation } from '@react-navigation/native'
import { renderHook, act } from '@testing-library/react-native'
import { useVaults, closeAllInstances } from 'pearpass-lib-vault'
import { AppState } from 'react-native'

import { useAutoLock } from './useAutoLock'
import { useAutoLockContext } from '../../../context/AutoLockContext'

jest.mock('pearpass-lib-vault', () => ({
  useVaults: jest.fn(),
  closeAllInstances: jest.fn(),
  useUserData: jest.fn(() => ({
    refetch: jest.fn(() =>
      Promise.resolve({ isLoggedIn: true, hasPasswordSet: true })
    )
  }))
}))
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn()
}))
jest.mock('react-native', () => ({
  AppState: {
    currentState: 'active',
    addEventListener: jest.fn()
  }
}))
jest.mock('../../../context/BottomSheetContext', () => ({
  useBottomSheet: jest.fn(() => ({
    collapse: jest.fn()
  }))
}))
jest.mock('../../../context/ModalContext', () => ({
  useModal: jest.fn(() => ({
    closeModal: jest.fn()
  }))
}))
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn((key) => {
    if (key === 'IS_AUTO_LOCK_DISABLED') {
      return Promise.resolve('false')
    }
    return Promise.resolve(null)
  })
}))
jest.mock('../../../context/AutoLockContext', () => ({
  useAutoLockContext: jest.fn(() => ({ shouldBypassAutoLock: false }))
}))

describe('useAutoLock', () => {
  let resetStateMock
  let navigateMock
  let removeListenerMock

  beforeEach(() => {
    resetStateMock = jest.fn()
    navigateMock = jest.fn()
    removeListenerMock = jest.fn()

    useVaults.mockReturnValue({ resetState: resetStateMock })
    useNavigation.mockReturnValue({ navigate: navigateMock })
    useAutoLockContext.mockReturnValue({ shouldBypassAutoLock: false })

    AppState.addEventListener.mockImplementation(() => ({
      remove: removeListenerMock
    }))

    closeAllInstances.mockClear()
    resetStateMock.mockClear()
    navigateMock.mockClear()
    removeListenerMock.mockClear()
  })

  it('should add and remove AppState event listener', () => {
    const { unmount } = renderHook(() => useAutoLock())
    expect(AppState.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    )
    unmount()
    expect(removeListenerMock).toHaveBeenCalled()
  })

  it('should lock and reset when app goes to background', async () => {
    let handler
    AppState.addEventListener.mockImplementation((event, h) => {
      handler = h
      return { remove: removeListenerMock }
    })

    renderHook(() => useAutoLock())

    await act(async () => {
      await handler('background')
    })

    expect(closeAllInstances).toHaveBeenCalled()
    expect(navigateMock).toHaveBeenCalledWith('Welcome', {
      state: 'enterMasterPassword'
    })
    expect(resetStateMock).toHaveBeenCalled()
  })

  it('should not lock if app state does not change to background', async () => {
    let handler
    AppState.addEventListener.mockImplementation((event, h) => {
      handler = h
      return { remove: removeListenerMock }
    })

    renderHook(() => useAutoLock())

    await act(async () => {
      await handler('active')
    })

    expect(closeAllInstances).not.toHaveBeenCalled()
    expect(navigateMock).not.toHaveBeenCalled()
    expect(resetStateMock).not.toHaveBeenCalled()
  })

  it('should not lock when bypass is enabled', async () => {
    let handler
    AppState.addEventListener.mockImplementation((event, h) => {
      handler = h
      return { remove: removeListenerMock }
    })

    useAutoLockContext.mockReturnValue({ shouldBypassAutoLock: true })

    renderHook(() => useAutoLock())

    await act(async () => {
      await handler('background')
    })

    expect(closeAllInstances).not.toHaveBeenCalled()
    expect(navigateMock).not.toHaveBeenCalled()
    expect(resetStateMock).not.toHaveBeenCalled()
  })

  it('should lock and reset when app goes to background and bypass is disabled', async () => {
    let handler
    AppState.addEventListener.mockImplementation((event, h) => {
      handler = h
      return { remove: removeListenerMock }
    })

    useAutoLockContext.mockReturnValue({ shouldBypassAutoLock: false })

    renderHook(() => useAutoLock())

    await act(async () => {
      await handler('background')
    })

    expect(closeAllInstances).toHaveBeenCalled()
    expect(navigateMock).toHaveBeenCalledWith('Welcome', {
      state: 'enterMasterPassword'
    })
    expect(resetStateMock).toHaveBeenCalled()
  })
})
