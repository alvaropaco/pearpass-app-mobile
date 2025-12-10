import styled from 'styled-components/native'

export const ItemImageContainer = styled.View`
  width: ${({ size }) => (size === 'sm' ? '45px' : '68px')};
  height: ${({ size }) => (size === 'sm' ? '45px' : '68px')};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, isSelected }) =>
    isSelected
      ? theme.colors.primary400.mode1
      : theme.colors.secondary400.mode1};
  border-radius: ${({ size }) => (size === 'sm' ? '15px' : '23px')};
`

export const AvatarImage = styled.Image`
  width: ${({ size }) => (size === 'sm' ? '38px' : '56px')};
  height: ${({ size }) => (size === 'sm' ? '38px' : '56px')};
  border-radius: 60px;
`

export const AvatarInitials = styled.Text`
  color: ${({ color }) => color};
  text-align: center;
  font-family: 'Inter';
  font-size: ${({ size }) => (size === 'sm' ? '24px' : '36px')};
  font-weight: 700;
`
export const FavoriteBadge = styled.View`
  position: absolute;
  bottom: -6px;
  right: -6px;
  z-index: 1;
`
