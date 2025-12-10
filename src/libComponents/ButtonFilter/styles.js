import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

const getDisabledGradient = (theme) => theme.colors.secondary200.mode1

export const Button = styled(TouchableOpacity).attrs(({ isDisabled }) => ({
  activeOpacity: isDisabled ? 1 : 0.7
}))`
  flex-direction: row;
  align-items: center;
  gap: 7px;
  font-family: 'Inter';
  font-size: 12px;
  font-weight: 400;
  padding: 4px;
  border-radius: 5px;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};

  ${({ variant, theme, isDisabled }) => {
    if (variant === 'primary') {
      return css`
        background: ${isDisabled
          ? getDisabledGradient(theme)
          : theme.colors.secondary200.mode1};
      `
    }

    if (variant === 'secondary') {
      return css`
        border-radius: 10px;
        background: ${theme.colors.grey500.mode1};
        padding: 10px;
      `
    }
  }}
`

export const ButtonText = styled.Text`
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 400;
  color: ${({ variant, theme }) =>
    variant === 'primary'
      ? theme.colors.secondary400.mode1
      : theme.colors.white.mode1};
`
