import styled from 'styled-components/native'

import { normalize } from '../../utils/normalize'

export const CategoryItem = styled.TouchableOpacity`
  background-color: ${({ color, theme }) =>
    color || theme.colors.grey400.mode1};
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 10px;
  padding: ${normalize(8)}px;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`

export const CategoryText = styled.Text`
  font-family: 'Inter';
  font-size: ${normalize(14)}px;
  color: ${({ active, theme }) =>
    active ? theme.colors.black.mode1 : theme.colors.white.mode1};
  padding-left: ${normalize(8)}px;
`
