import { useRef, useState } from 'react'

import {
  ArrowDownIcon,
  ArrowUpIcon,
  LockCircleIcon
} from 'pearpass-lib-ui-react-native-components'
import { colors } from 'pearpass-lib-ui-theme-provider/native'
import { Animated, FlatList, Text } from 'react-native'

import {
  ArrowIconWrapper,
  Container,
  Dropdown,
  DropdownItem,
  DropdownWrapper,
  Wrapper
} from './styles'

const DURATION = 300

/**
 *
 * @param {{
 * * vaults: any[]
 * * selectedVault: any
 * * onVaultSwap: (vault: any) => void
 * * }} props
 */
export const DropdownSwapVault = ({ vaults, selectedVault, onVaultSwap }) => {
  const [isOpen, setIsOpen] = useState(false)
  const animatedHeight = useRef(new Animated.Value(0)).current
  const animatedOpacity = useRef(new Animated.Value(0)).current

  const animateToggle = (isOpen) =>
    new Promise((resolve) => {
      Animated.timing(animatedHeight, {
        toValue: isOpen ? 0 : 1000,
        duration: DURATION,
        useNativeDriver: false
      }).start()

      Animated.timing(animatedOpacity, {
        toValue: isOpen ? 0 : 1,
        duration: DURATION,
        useNativeDriver: false
      }).start(resolve)
    })

  const toggleDropdown = async () => {
    setIsOpen(!isOpen)

    await animateToggle(isOpen)
  }

  const handleVaultSwap = async (vault) => {
    await toggleDropdown()

    onVaultSwap(vault)
  }

  if (!vaults?.length) {
    return null
  }

  return (
    <Wrapper>
      <Container onPress={toggleDropdown} activeOpacity={1} isOpen={isOpen}>
        <LockCircleIcon size={21} color={colors.primary400.mode1} />
        <Text
          style={{
            color: colors.primary400.mode1,
            flex: 1,
            marginHorizontal: 8
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {selectedVault?.name ?? selectedVault?.id}
        </Text>
        <ArrowIconWrapper>
          {isOpen ? (
            <ArrowUpIcon size={14} color={colors.primary400.mode1} />
          ) : (
            <ArrowDownIcon size={14} color={colors.primary400.mode1} />
          )}
        </ArrowIconWrapper>
      </Container>
      <DropdownWrapper
        isOpen={isOpen}
        style={{ maxHeight: animatedHeight, opacity: animatedOpacity }}
      >
        <Dropdown>
          <FlatList
            data={vaults}
            keyExtractor={(vault) => vault?.id}
            renderItem={({ item, index }) => (
              <DropdownItem
                isFirst={index === 0}
                onPress={() => handleVaultSwap(item)}
              >
                <LockCircleIcon size={21} color={colors.primary400.mode1} />
                <Text
                  style={{
                    color: colors.primary400.mode1,
                    flex: 1,
                    marginHorizontal: 8
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item?.name ?? item?.id}
                </Text>
              </DropdownItem>
            )}
          />
        </Dropdown>
      </DropdownWrapper>
    </Wrapper>
  )
}
