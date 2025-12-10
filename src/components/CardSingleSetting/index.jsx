import { Container, Content, Header, Title } from './styles'

export const CardSingleSetting = ({ title, children }) => (
  <Container>
    <Header>
      <Title>{title}</Title>
    </Header>
    <Content>{children}</Content>
  </Container>
)
