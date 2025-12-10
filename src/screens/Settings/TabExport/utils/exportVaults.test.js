import { parseDataToCsvText, parseDataToJson } from 'pearpass-lib-data-export'

import { downloadFile } from './downloadFile'
import { downloadZip } from './downloadZip'
import {
  handleExportCSVPerVault,
  handleExportJsonPerVault
} from './exportVaults'

jest.mock('pearpass-lib-data-export')
jest.mock('./downloadFile', () => ({
  downloadFile: jest.fn()
}))
jest.mock('./downloadZip', () => ({
  downloadZip: jest.fn()
}))

describe('exportVaults', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('handleExportCSVPerVault', () => {
    it('should return false if no vaults to export', async () => {
      parseDataToCsvText.mockResolvedValue([])
      const result = await handleExportCSVPerVault({})
      expect(result).toBe(false)
    })

    it('should download single file if one vault', async () => {
      const mockData = [{ filename: 'test', data: 'csv-content' }]
      parseDataToCsvText.mockResolvedValue(mockData)

      const result = await handleExportCSVPerVault({})

      expect(downloadFile).toHaveBeenCalledWith(
        { filename: 'test', content: 'csv-content' },
        'csv'
      )
      expect(result).toBe(true)
    })

    it('should use default filename if not provided', async () => {
      const mockData = [{ data: 'csv-content' }]
      parseDataToCsvText.mockResolvedValue(mockData)

      const result = await handleExportCSVPerVault({})

      expect(downloadFile).toHaveBeenCalledWith(
        { filename: 'file', content: 'csv-content' },
        'csv'
      )
      expect(result).toBe(true)
    })

    it('should return false if data is missing in single vault', async () => {
      const mockData = [{ filename: 'test' }]
      parseDataToCsvText.mockResolvedValue(mockData)

      const result = await handleExportCSVPerVault({})

      expect(downloadFile).not.toHaveBeenCalled()
      expect(result).toBe(false)
    })

    it('should download zip if multiple vaults', async () => {
      const mockData = [
        { filename: 'test1', data: 'csv-content-1' },
        { filename: 'test2', data: 'csv-content-2' }
      ]
      parseDataToCsvText.mockResolvedValue(mockData)

      const result = await handleExportCSVPerVault({})

      expect(downloadZip).toHaveBeenCalledWith(mockData)
      expect(result).toBe(true)
    })

    it('should throw error if download fails', async () => {
      const mockData = [{ filename: 'test', data: 'csv-content' }]
      parseDataToCsvText.mockResolvedValue(mockData)
      downloadFile.mockRejectedValue(new Error('Download failed'))

      await expect(handleExportCSVPerVault({})).rejects.toThrow(
        'Download failed'
      )
    })
  })

  describe('handleExportJsonPerVault', () => {
    it('should return false if no vaults to export', async () => {
      parseDataToJson.mockResolvedValue([])
      const result = await handleExportJsonPerVault({})
      expect(result).toBe(false)
    })

    it('should download single file if one vault', async () => {
      const mockData = [{ filename: 'test', data: 'json-content' }]
      parseDataToJson.mockResolvedValue(mockData)

      const result = await handleExportJsonPerVault({})

      expect(downloadFile).toHaveBeenCalledWith(
        { filename: 'test', content: 'json-content' },
        'json'
      )
      expect(result).toBe(true)
    })

    it('should use default filename if not provided', async () => {
      const mockData = [{ data: 'json-content' }]
      parseDataToJson.mockResolvedValue(mockData)

      const result = await handleExportJsonPerVault({})

      expect(downloadFile).toHaveBeenCalledWith(
        { filename: 'file', content: 'json-content' },
        'json'
      )
      expect(result).toBe(true)
    })

    it('should return false if data is missing in single vault', async () => {
      const mockData = [{ filename: 'test' }]
      parseDataToJson.mockResolvedValue(mockData)

      const result = await handleExportJsonPerVault({})

      expect(downloadFile).not.toHaveBeenCalled()
      expect(result).toBe(false)
    })

    it('should download zip if multiple vaults', async () => {
      const mockData = [
        { filename: 'test1', data: 'json-content-1' },
        { filename: 'test2', data: 'json-content-2' }
      ]
      parseDataToJson.mockResolvedValue(mockData)

      const result = await handleExportJsonPerVault({})

      expect(downloadZip).toHaveBeenCalledWith(mockData)
      expect(result).toBe(true)
    })

    it('should throw error if download fails', async () => {
      const mockData = [{ filename: 'test', data: 'json-content' }]
      parseDataToJson.mockResolvedValue(mockData)
      downloadFile.mockRejectedValue(new Error('Download failed'))

      await expect(handleExportJsonPerVault({})).rejects.toThrow(
        'Download failed'
      )
    })
  })
})
