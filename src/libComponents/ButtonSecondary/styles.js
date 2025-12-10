import styled from 'styled-components/native'

export const Button = styled.TouchableOpacity`
  display: inline-flex;
  padding: ${({ size }) => (size === 'sm' ? '10px 15px' : '10px 40px')};
  align-self: ${({ stretch }) => (stretch ? 'stretch' : 'flex-start')};
  width: ${({ stretch }) => (stretch ? '100%' : 'auto')};
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  border-radius: ${({ size }) => (size === 'sm' ? '10px' : '20px')};
  border-width: ${({ size }) => (size === 'sm' ? '1px' : '2px')};
  border-color: ${({ theme }) => theme.colors.primary400.mode1};
  background: ${({ theme }) => theme.colors.grey500.mode1};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: ${({ size }) => (size === 'sm' ? '12px' : '16px')};
  font-style: normal;
  font-weight: ${({ size }) => (size === 'sm' ? '600' : '500')};
`
