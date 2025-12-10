import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

export const Container = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.colors.grey500.mode1};
  height: 100%;
  padding: 20px;
`

export const FolderFormHeader = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;
`
export const FolderFormHeaderGoBack = styled.TouchableOpacity`
  width: 41px;
  height: 41px;
  background-color: #050b06;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FolderFormHeaderActions = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const FormWrapper = styled.View`
  gap: 15px;
  min-height: 100%;
`

export const FolderFormDetailLabel = styled.Text`
  color: #fff;
  font-size: 12px;
  font-family: 'Inter';
  margin-top: -8px;
`

export const FolderFormDetailValueInput = styled.TextInput`
  color: #fff;
  font-size: 20px;
  font-family: 'Inter';
  padding-top: 2px;
`
