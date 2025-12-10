import styled from 'styled-components/native'

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  border-radius: 20px;
  padding: 10px 15px;
  gap: 10px;
  background: ${({ theme }) => theme.colors.black.mode1};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.black.mode1};
`

export const ButtonText = styled.Text`
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primary400.mode1};
`
