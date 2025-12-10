import styled from 'styled-components/native'

export const Wrapper = styled.View`
  border-color: ${({ theme }) => theme.colors.grey100.mode1};
  border-top-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-top-right-radius: 22px;
  border-top-left-radius: 22px;
  overflow: hidden;
`
