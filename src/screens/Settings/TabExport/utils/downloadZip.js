import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import JSZip from 'jszip'

import { logger } from '../../../../utils/logger'

export const downloadZip = async (files) => {
  try {
    const zip = new JSZip()

    files.forEach(({ filename, data }) => {
      zip.file(filename, data)
    })

    const content = await zip.generateAsync({ type: 'base64' })

    const fileUri = `${FileSystem.documentDirectory}PearPass_Export_${new Date()
      .toISOString()
      .replace(/[:.-]/g, '_')}.zip`

    await FileSystem.writeAsStringAsync(fileUri, content, {
      encoding: FileSystem.EncodingType.Base64
    })

    if (await Sharing.isAvailableAsync()) {
      try {
        await Sharing.shareAsync(fileUri)
      } catch (error) {
        throw error
      }
      return
    }

    throw new Error('Sharing is not available on this platform')
  } catch (error) {
    logger.error('Error creating or saving zip:', error)
  }
}
