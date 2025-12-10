import { Animated, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

export const Wrapper = styled.View`
  width: 100%;
  max-width: 400px;
  align-items: center;
`

export const Container = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.black.mode1};
  border-width: 1px;
  border-color: ${({ theme, isOpen }) =>
    isOpen ? theme.colors.primary400.mode1 : 'transparent'};

  z-index: 3;
`

export const ArrowIconWrapper = styled.View`
  margin-left: auto;
`

export const DropdownWrapper = styled(Animated.View)`
  overflow: hidden;
  position: absolute;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  padding: 0 10px;
  bottom: 100%;
  width: 98%;
  background-color: ${({ theme }) => theme.colors.black.mode1};
  margin-bottom: -30px;
  padding-bottom: 30px;
  z-index: 1;
`

export const Dropdown = styled.View`
  padding: 5px;
  max-height: 110px;
  width: 100%;
`

export const DropdownItem = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  border-top-width: 1px;
  border-top-color: ${({ theme, isFirst }) =>
    !isFirst ? theme.colors.grey100.mode1 : 'transparent'};
`
