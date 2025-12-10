import { useCallback, useEffect, useRef, useState } from 'react'

import { useLingui } from '@lingui/react/macro'
import { Camera, PermissionStatus } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import { Alert, Linking, Platform } from 'react-native'

import { logger } from '../utils/logger'

export const useQRScanner = ({
  onScanned,
  onError,
  scanDelay = 2000,
  supportedTypes = [
    'qr',
    'aztec',
    'code128',
    'code39',
    'code93',
    'datamatrix',
    'ean13',
    'ean8',
    'pdf417',
    'upc_e'
  ],
  enableGallery = true
}) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [isScanning, setIsScanning] = useState(true)

  const { t } = useLingui()

  const cameraRef = useRef(null)
  const lastScanTimeRef = useRef(0)

  // Check current permission status on mount
  const checkCurrentPermissions = useCallback(async () => {
    try {
      const { status } = await Camera.getCameraPermissionsAsync()
      const granted = status === PermissionStatus.GRANTED
      setHasPermission(granted)
      return { granted, status }
    } catch (error) {
      logger.error('Error checking camera permissions:', error)
      setHasPermission(false)
      return { granted: false, status: undefined }
    }
  }, [])

  const openSettings = useCallback(async () => {
    try {
      await Linking.openSettings()
    } catch (error) {
      logger.error('Error opening settings:', error)

      Alert.alert(
        t`Error`,
        t`Unable to open settings. Please open settings manually.`
      )
    }
  }, [t])

  const showPermissionAlert = useCallback(
    (type) => {
      Alert.alert(
        t`Permission Required`,
        t`You've previously denied ${type} access. Please enable it in your device settings to use this feature.`,
        [
          { text: t`Cancel`, style: 'cancel' },
          {
            text: t`Open Settings`,
            onPress: openSettings
          }
        ]
      )
    },
    [t, openSettings]
  )

  const requestPermission = useCallback(async () => {
    try {
      // First check if permission is already granted
      const { granted: alreadyGranted, status: permissionStatus } =
        await checkCurrentPermissions()

      if (alreadyGranted) {
        return true
      }

      if (permissionStatus === PermissionStatus.DENIED) {
        showPermissionAlert(t`Camera`)

        return false
      }

      // Request permission if not already granted
      const { status, canAskAgain } =
        await Camera.requestCameraPermissionsAsync()

      const granted = status === 'granted'

      if (granted) {
        setHasPermission(granted)
        return granted
      }

      if (!canAskAgain) {
        showPermissionAlert(t`Camera`)
      }

      setHasPermission(false)
      return false
    } catch (error) {
      logger.error('Camera permission request failed:', error)

      if (onError) {
        onError(error)
      }

      setHasPermission(false)
      return false
    }
  }, [checkCurrentPermissions, showPermissionAlert, t, onError])

  const handleBarCodeScanned = useCallback(
    (scanResult) => {
      const { type, data } = scanResult

      if (
        isScanning &&
        supportedTypes.includes(type) &&
        Date.now() - lastScanTimeRef.current > scanDelay
      ) {
        lastScanTimeRef.current = Date.now()

        if (onScanned) {
          onScanned(data, type)
        }
      }
    },
    [isScanning, supportedTypes, scanDelay, onScanned]
  )

  const pauseScanning = useCallback(() => {
    setIsScanning(false)
  }, [])

  const resumeScanning = useCallback(() => {
    setIsScanning(true)
  }, [])

  const scanBarcodeFromImage = useCallback(
    async (imageUri) => {
      try {
        const scannedCodes = await Camera.scanFromURLAsync(
          imageUri,
          supportedTypes
        )

        if (scannedCodes && scannedCodes.length > 0) {
          const { type, data } = scannedCodes[0]

          if (onScanned) {
            onScanned(data, type)
          }
        } else {
          Alert.alert(t`Error`, t`No QR code found in the image`, [
            { text: t`OK` }
          ])
        }
      } catch (scanError) {
        if (onError) {
          onError(scanError)
        }

        Alert.alert(t`Error`)
      }
    },
    [supportedTypes, onScanned, onError, t]
  )

  const pickImageForScan = useCallback(async () => {
    if (!enableGallery) return

    try {
      if (Platform.OS !== 'ios') {
        const permissionResult =
          await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (!permissionResult.granted) {
          if (onError) {
            onError()
          }

          if (!permissionResult.canAskAgain) {
            showPermissionAlert(t`Media Library`)
          }

          return
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: false,
        quality: 1,
        allowsMultipleSelection: false
      })

      if (!result?.canceled && result?.assets?.length) {
        scanBarcodeFromImage(result.assets[0].uri)
      }
    } catch (error) {
      if (onError) {
        onError(error)
      }
    }
  }, [enableGallery, onError, showPermissionAlert, t, scanBarcodeFromImage])

  // Check permissions on mount
  useEffect(() => {
    void checkCurrentPermissions()
  }, [checkCurrentPermissions])

  return {
    hasPermission,
    isScanning,
    cameraRef,
    pauseScanning,
    resumeScanning,
    pickImageForScan,
    requestPermission,
    handleBarCodeScanned,
    checkCurrentPermissions
  }
}
