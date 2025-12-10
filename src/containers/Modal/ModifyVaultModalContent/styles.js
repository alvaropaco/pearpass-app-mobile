import styled from 'styled-components/native'

export const InputWrapper = styled.View`
  width: 100%;
  flex-direction: column;
  display: flex;
  gap: 10px;
`

export const InputLabel = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 500;
`
