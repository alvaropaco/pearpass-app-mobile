import styled from 'styled-components/native'

export const TextAreaComponent = styled.TextInput.attrs(({ theme }) => ({
  multiline: true,
  placeholderTextColor: theme.colors.grey100.mode1,
  textAlignVertical: 'top'
}))`
  width: 100%;
  height: 233px;
  padding: 8px 10px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({ isFocused, theme }) =>
    isFocused ? theme.colors.primary400.mode1 : theme.colors.grey100.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 700;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  background-color: ${({ theme }) => theme.colors.grey400.mode1};
  color: ${({ theme }) => theme.colors.white.mode1};
`
