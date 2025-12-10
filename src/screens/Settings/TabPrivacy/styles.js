import styled from 'styled-components/native'

export const Container = styled.View`
  display: flex;
  gap: 15px;
`

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`

export const OptionsList = styled.View`
  display: flex;
  gap: 15px;
`
