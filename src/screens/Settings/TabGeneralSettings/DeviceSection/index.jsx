import { useEffect } from 'react'

import { useLingui } from '@lingui/react/macro'
import { useVault } from 'pearpass-lib-vault'

import { DeviceContainer } from './styles'
import { CardSingleSetting } from '../../../../components/CardSingleSetting'
import { ListItem } from '../../../../components/ListItem'

const getDeviceDisplayName = (deviceName) => {
  const { t } = useLingui()
  if (!deviceName) return deviceName

  const lowerName = deviceName.toLowerCase()

  if (lowerName.startsWith('ios')) {
    return t`Iphone`
  }

  if (lowerName.startsWith('android')) {
    return t`Android`
  }

  return deviceName
}

export const DeviceSection = () => {
  const { t } = useLingui()

  const { data, refetch: refetchVault } = useVault()

  useEffect(() => {
    refetchVault()
  }, [])

  if ((data?.devices?.length ?? 0) <= 1) {
    return null
  }

  return (
    <CardSingleSetting title={t`Linked devices`}>
      <DeviceContainer>
        {data?.devices?.map((device, index) => (
          <ListItem
            key={device.name + index}
            name={getDeviceDisplayName(device?.name)}
            date={device.createdAt}
          />
        ))}
      </DeviceContainer>
    </CardSingleSetting>
  )
}
