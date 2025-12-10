import styled from 'styled-components/native'

export const DrawerContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.grey500.mode1};
  padding-top: 25%;
  padding-bottom: 25px;
  padding-left: 20px;
  padding-right: 20px;
  gap: 15px;
  height: 100%;
`

export const LoadingWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const DrawerTitle = styled.Text`
  padding-top: 5%;
  padding-left: 16px;
  line-height: 24px;
  text-align: justify;
  color: #f6f6f6;
  font-family: 'Inter';
  font-weight: 600;
  font-size: 32px;
`

export const ScrollContainer = styled.View`
  flex: 1;
`

export const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: { flexGrow: 1 }
})`
  flex: 1;
`

export const ActionsContainer = styled.View`
  gap: 15px;
`

export const AddDevice = styled.TouchableOpacity`
  left: 24px;
  background-color: #050b06;
  width: 160px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  flex-direction: row;
  gap: 10px;
`

export const AddDeviceText = styled.Text`
  color: ${({ theme }) => theme.colors.primary400.mode1};
  padding-top: 2px;
`
