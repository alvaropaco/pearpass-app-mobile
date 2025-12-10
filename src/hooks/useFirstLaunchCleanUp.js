import { useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'

import { ASYNC_STORAGE_KEYS } from '../constants/asyncStorageKeys'
import { SECURE_STORAGE_KEYS } from '../constants/secureStorageKeys'
import { logger } from '../utils/logger'

const { FIRST_LAUNCH_KEY, FAILED_KEYS_KEY } = ASYNC_STORAGE_KEYS

/**
 * Custom hook to detect first launch after app installation and clear expo-secure-store data.
 */
export const useFirstLaunchCleanUp = () => {
  useEffect(() => {
    const clearDataOnFirstLaunch = async () => {
      try {
        const hasLaunchedBefore = await AsyncStorage.getItem(FIRST_LAUNCH_KEY)

        if (!hasLaunchedBefore) {
          logger.log('First launch detected - clearing SecureStore data')
          await clearSecureStoreData()

          await AsyncStorage.setItem(FIRST_LAUNCH_KEY, 'true')
        } else {
          await retryFailedKeys()
        }
      } catch (error) {
        logger.error('Error clearing data on first launch:', error)
      }
    }

    clearDataOnFirstLaunch()
  }, [])
}

/**
 * Clears all known SecureStore data on first launch.
 * Tracks any keys that fail to clear for retry on next launch.
 */
const clearSecureStoreData = async () => {
  const failedKeys = []

  try {
    const keysToClear = Object.values(SECURE_STORAGE_KEYS)
    await deleteKeys(keysToClear, failedKeys)
    if (failedKeys.length > 0) {
      await setFailedKeys(failedKeys)
      logger.log(
        `Stored ${failedKeys.length} failed keys for retry:`,
        failedKeys
      )
    }

    logger.log('Completed SecureStore data clearing')
  } catch (error) {
    logger.error('Error clearing SecureStore data:', error)
    throw error
  }
}

/**
 * Retries clearing any failed keys from previous attempts.
 */
const retryFailedKeys = async () => {
  try {
    const failedKeysJson = await AsyncStorage.getItem(FAILED_KEYS_KEY)
    if (failedKeysJson) {
      const failedKeys = JSON.parse(failedKeysJson)
      const stillFailedKeys = []
      await deleteKeys(failedKeys, stillFailedKeys)

      if (stillFailedKeys.length > 0) {
        await setFailedKeys(stillFailedKeys)
      } else {
        await AsyncStorage.removeItem(FAILED_KEYS_KEY)
        logger.log('Completed SecureStore data clearing - no failed keys')
      }
    }
  } catch (error) {
    logger.error('Error retrying failed keys:', error)
  }
}

const deleteKeys = async (keys, failedKeys = []) => {
  for (const key of keys) {
    try {
      await SecureStore.deleteItemAsync(key)
    } catch (error) {
      failedKeys.push(key)
      logger.error(`Failed to clear SecureStore key ${key}:`, error)
    }
  }
}

const setFailedKeys = async (failedKeys) => {
  await AsyncStorage.setItem(FAILED_KEYS_KEY, JSON.stringify(failedKeys))
}
