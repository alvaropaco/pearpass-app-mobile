import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'

export const downloadFile = async ({ filename, content }, type) => {
  const fileUri = FileSystem.documentDirectory + filename
  const mimeType = type === 'json' ? 'application/json' : 'text/csv'

  await FileSystem.writeAsStringAsync(fileUri, content, {
    encoding: FileSystem.EncodingType.UTF8
  })

  if (await Sharing.isAvailableAsync()) {
    try {
      await Sharing.shareAsync(fileUri, {
        mimeType,
        dialogTitle: 'Share file',
        UTI:
          type === 'json' ? 'public.json' : 'public.comma-separated-values-text'
      })
    } catch (error) {
      throw error
    }
    return
  }

  throw new Error('Sharing is not available on this platform')
}
