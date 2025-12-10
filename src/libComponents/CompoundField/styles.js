import styled from 'styled-components/native'

export const CompoundFieldComponent = styled.TouchableOpacity`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey100.mode1};
  background-color: ${({ theme }) => theme.colors.grey400.mode1};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.6 : 1)};
`
