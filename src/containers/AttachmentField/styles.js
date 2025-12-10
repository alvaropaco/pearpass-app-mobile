import styled from 'styled-components/native'

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 15px;
  width: 100%;
  position: relative;
  padding: 20px 10px 20px 12px;

  border-top-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-bottom-width: ${({ isLast }) => (isLast ? '1px' : '0px')};

  border-top-color: ${({ isFocused, prevIsFocused, theme }) =>
    isFocused | prevIsFocused
      ? theme.colors.primary400.mode1
      : theme.colors.grey100.mode1};
  border-left-color: ${({ isFocused, theme }) =>
    isFocused ? theme.colors.primary400.mode1 : theme.colors.grey100.mode1};
  border-bottom-color: ${({ isFocused, theme }) =>
    isFocused ? theme.colors.primary400.mode1 : theme.colors.grey100.mode1};
  border-right-color: ${({ isFocused, theme }) =>
    isFocused ? theme.colors.primary400.mode1 : theme.colors.grey100.mode1};

  background: ${({ theme }) => theme.colors.grey400.mode1};
  border-top-left-radius: ${({ isFirst }) => (isFirst ? '10px' : '0px')};
  border-top-right-radius: ${({ isFirst }) => (isFirst ? '10px' : '0px')};
  border-bottom-left-radius: ${({ isLast }) => (isLast ? '10px' : '0px')};
  border-bottom-right-radius: ${({ isLast }) => (isLast ? '10px' : '0px')};
`

export const IconWrapper = styled.View`
  margin-top: 9px;
`

export const MainWrapper = styled.View`
  flex: 1;
  flex-direction: column;
`

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 12px;
  font-weight: 400;
`

export const InputAreaWrapper = styled.View`
  margin-top: 5px;
  flex-direction: row;
  align-items: center;
`

export const AttachmentName = styled.Text`
  color: ${({ theme, isPlaceHolder }) =>
    isPlaceHolder ? theme.colors.grey100.mode1 : theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 20px;
  font-weight: 700;
`

export const AdditionalItems = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  align-self: center;
`
