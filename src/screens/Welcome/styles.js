import { Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import { normalize } from '../../utils/normalize'

export const BackgroundImage = styled.ImageBackground`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.black.mode1};
`

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.black.mode1};
`

export const InnerContainer = styled.View`
  flex: 1;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 20px;
`

export const WelcomeContentWrapper = styled.View`
  margin-top: ${normalize(35)}px;
  flex: 1;
  justify-content: space-between;
`

export const LogoContainer = styled.View`
  align-self: center;
  width: ${normalize(262)}px;
  height: ${normalize(69)}px;
`

export const WelcomeHeader = styled.Text`
  padding: 0px 30px;
  color: white;
  font-size: ${normalize(64)}px;
  font-family: ${Platform.OS === 'android'
    ? 'humble-nostalgia'
    : 'Humble Nostalgia'};
`
