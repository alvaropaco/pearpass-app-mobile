import styled from 'styled-components/native'

export const Wrapper = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  gap: 5px;
  align-self: center;
`

export const PressableText = styled.Text`
  color: ${({ theme }) => theme.colors.primary400.mode1};
  text-align: center;
  font-family: 'Inter';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
`
