import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

export const Container = styled(SafeAreaView).attrs({
  edges: ['top', 'left', 'right']
})`
  padding: 8px 20px 0px;
  height: 100%;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.grey500.mode1};
`
export const Header = styled.View`
  flex-direction: row;
  gap: 20px;
  align-items: center;
`

export const ScreenTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
`

export const ContentContainer = styled.ScrollView`
  gap: 20px;
`

export const Tabs = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    alignItems: 'center',
    gap: 20,
    paddingRight: 15
  }
})`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.grey100.mode1};
`

export const TabTitle = styled.Text`
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary400.mode1 : theme.colors.grey100.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-style: normal;
  font-weight: ${({ isActive }) => (isActive ? 700 : 500)};
`

export const TabPanelContainer = styled.View`
  gap: 20px;
  margin-top: 20px;
`
