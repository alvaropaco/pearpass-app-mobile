import styled from 'styled-components/native'

export const SelectBox = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.grey100.mode1};
  border-radius: 10px;
  padding: 0 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  box-sizing: border-box;
`

export const SelectedText = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 700;
`

export const Dropdown = styled.View`
  background-color: ${({ theme }) => theme.colors.grey400.mode1};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.grey100.mode1};
  border-radius: 10px;
  margin-top: 1px;
  overflow: hidden;
  padding: 7px 0;
`

export const DropdownItem = styled.TouchableOpacity`
  padding: 5px 10px;
`

export const DropdownText = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 400;
`
