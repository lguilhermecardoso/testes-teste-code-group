import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Ghost } from 'lucide-react'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: calc(100vh - 60px - 4rem);
  text-align: center;
  animation: fadeInUp 350ms ease;
`

const Code = styled.p`
  font-size: 5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.muted};
  letter-spacing: -0.05em;
  line-height: 1;
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`

const Sub = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  max-width: 360px;
`

const HomeBtn = styled.button`
  padding: 0.625rem 1.5rem;
  background: ${({ theme }) => theme.colors.accent.blue};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radii.md};
  margin-top: 0.5rem;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover { opacity: 0.85; }
`

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <Ghost size={52} strokeWidth={1.4} color="var(--muted, #6e7681)" />
      <Code>404</Code>
      <Title>Página não encontrada</Title>
      <Sub>A rota que você acessou não existe ou foi removida.</Sub>
      <HomeBtn onClick={() => navigate('/')}>Voltar ao início</HomeBtn>
    </Wrapper>
  )
}
