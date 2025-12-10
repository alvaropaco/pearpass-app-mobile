import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  gap: 20px;
`

export const CameraSpot = styled.View`
  width: 170px;
  height: 170px;
  border-radius: 10px;
  border-width: 4px;
  border-color: ${({ theme }) => theme.colors.primary400.mode1};
  background-color: transparent;
  margin: auto;
`

export const GrantPermissionContainer = styled.View`
  gap: 20px;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const GrantPermissionText = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
`

export const Title = styled.Text`
  margin: auto;
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
`
