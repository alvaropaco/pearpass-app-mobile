import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'

import { downloadFile } from './downloadFile'

jest.mock('expo-file-system', () => ({
  documentDirectory: '/mock-dir/',
  writeAsStringAsync: jest.fn(),
  EncodingType: { UTF8: 'utf8' }
}))

jest.mock('expo-sharing', () => ({
  isAvailableAsync: jest.fn(),
  shareAsync: jest.fn()
}))

describe('downloadFile', () => {
  const filename = 'testfile.json'
  const content = '{"foo":"bar"}'
  const fileUri = '/mock-dir/' + filename

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('writes file as JSON and shares if available', async () => {
    Sharing.isAvailableAsync.mockResolvedValue(true)

    await downloadFile({ filename, content }, 'json')

    expect(FileSystem.writeAsStringAsync).toHaveBeenCalledWith(
      fileUri,
      content,
      { encoding: FileSystem.EncodingType.UTF8 }
    )
    expect(Sharing.shareAsync).toHaveBeenCalledWith(fileUri, {
      mimeType: 'application/json',
      dialogTitle: 'Share file',
      UTI: 'public.json'
    })
  })

  it('writes file as CSV and shares if available', async () => {
    Sharing.isAvailableAsync.mockResolvedValue(true)
    const csvFilename = 'test.csv'
    const csvContent = 'a,b,c\n1,2,3'
    const csvUri = '/mock-dir/' + csvFilename

    await downloadFile({ filename: csvFilename, content: csvContent }, 'csv')

    expect(FileSystem.writeAsStringAsync).toHaveBeenCalledWith(
      csvUri,
      csvContent,
      { encoding: FileSystem.EncodingType.UTF8 }
    )
    expect(Sharing.shareAsync).toHaveBeenCalledWith(csvUri, {
      mimeType: 'text/csv',
      dialogTitle: 'Share file',
      UTI: 'public.comma-separated-values-text'
    })
  })

  it('throws error if sharing is not available', async () => {
    Sharing.isAvailableAsync.mockResolvedValue(false)

    await expect(downloadFile({ filename, content }, 'json')).rejects.toThrow(
      'Sharing is not available on this platform'
    )

    expect(FileSystem.writeAsStringAsync).toHaveBeenCalled()
    expect(Sharing.shareAsync).not.toHaveBeenCalled()
  })
})
