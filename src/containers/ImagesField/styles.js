import styled from 'styled-components/native'

export const Container = styled.View`
  margin-top: 10px;
  width: 100%;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey100.mode1};
  background-color: ${({ theme }) => theme.colors.grey400.mode1};
`

export const Header = styled.View`
  flex-direction: row;
  gap: 10px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 12px;
  font-weight: 400;
`

export const Body = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  min-height: 50px;
`

export const ImageContainer = styled.View`
  width: 90px;
  height: 50px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.primary400.mode1};
  justify-content: center;
  align-items: center;
`

export const Photo = styled.Image`
  width: 100%;
  height: 100%;
`

export const DeleteIconWrapper = styled.Pressable`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0px;
  right: 0px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.primary400.mode1};
`

export const AddContainer = styled.Pressable`
  width: 90px;
  height: 50px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.primary400.mode1};
  align-items: center;
  justify-content: center;
`
