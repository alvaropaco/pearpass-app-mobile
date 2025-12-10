import styled from 'styled-components/native'

export const HighlightedText = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};

  font-family: 'Inter';
  font-size: ${({ size }) => size};
  font-weight: ${({ weight }) => weight};
  text-align: center;
`

export const NumberSpan = styled.Text`
  color: ${({ theme }) => theme.colors.primary400.mode1};
  font-weight: bold;
`

export const SymbolSpan = styled.Text`
  color: ${({ theme }) => theme.colors.categoryLogin.mode1};
  font-weight: bold;
`
