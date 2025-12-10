import * as FileSystem from 'expo-file-system'
import { shareAsync } from 'expo-sharing'
import { Platform } from 'react-native'

import { logger } from './logger'

/**
 * @param {{ buffer: Uint8Array, name: string }} file
 */
export const handleDownloadFile = async (file) => {
  try {
    const fileUri = `${FileSystem.documentDirectory}${file.name}`

    await FileSystem.writeAsStringAsync(fileUri, file.base64, {
      encoding: FileSystem.EncodingType.Base64
    })

    if (Platform.OS !== 'web') {
      await shareAsync(fileUri)
    }
  } catch (error) {
    logger.error('Error saving file:', error)
  }
}
