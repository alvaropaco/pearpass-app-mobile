import styled from 'styled-components/native'

export const LockContainer = styled.TouchableOpacity`
  width: 56px;
  height: 56px;
  background-color: #bade5b33;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SearchContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 14px;
`

export const InputContainer = styled.View`
  flex: 1;
  height: 56px;
  background-color: #050b06;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`

export const KebabMenuButton = styled.TouchableOpacity`
  padding: 10px;
`

export const SearchCountWrapper = styled.Text`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.grey100.mode1};
  text-overflow: ellipsis;
  font-family: 'Inter';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`

export const SearchTextInput = styled.TextInput`
  flex: 1;
  padding: 2px 0 0 32px;
  font-size: 16px;
  font-family: 'Inter';
  color: #fff;
`

export const MultiSelectActions = styled.View`
  flex-direction: row;
  gap: 20px;
`
