import styled, { css } from 'styled-components/native'

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  border-radius: ${({ borderRadius }) =>
    borderRadius === 'sm' ? '15px' : '25px'};
  padding: ${({ borderRadius }) => (borderRadius === 'sm' ? '10px' : '7px')};
  gap: 10px;

  ${({ variant, theme }) => {
    if (variant === 'primary') {
      return css`
        background: ${theme.colors.primary400.mode1};
        border: 1px solid ${theme.colors.primary300.mode1};
      `
    }

    if (variant === 'secondary') {
      return css`
        background: ${theme.colors.black.mode1};
        border: 1px solid ${theme.colors.black.mode1};
      `
    }
  }};
`

export const ButtonText = styled.Text`
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 400;
  color: ${({ variant, theme }) =>
    variant === 'primary'
      ? theme.colors.black.mode1
      : theme.colors.primary400.mode1};
`
