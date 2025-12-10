import styled from 'styled-components/native'

export const Header = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 500;
`

export const CameraWrapper = styled.View`
  margin-top: 12px;
  margin-bottom: 12px;
  border-radius: 10px;
  overflow: hidden;
  height: 300px;
`

export const ActionsWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`

export const PreviewWrapper = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
`
export const DeleteIconWrapper = styled.View`
  position: absolute;
  right: 4px;
  top: 4px;
`
