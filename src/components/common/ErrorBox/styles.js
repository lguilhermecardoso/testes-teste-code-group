import styled from 'styled-components'
import { media } from '@/styles/theme'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2.5rem 1.5rem;
  background: ${({ theme }) => theme.colors.bg.secondary};
  border: 1px solid ${({ $type, theme }) =>
    $type === 'rateLimit'
      ? theme.colors.ui.warning.border
      : theme.colors.ui.error.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  text-align: center;
  animation: fadeInUp 300ms ease;

  ${media.sm`
    padding: 2rem 1rem;
  `}
`

export const IconCircle = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ $type, theme }) =>
    $type === 'rateLimit'
      ? theme.colors.ui.warning.bg
      : theme.colors.ui.error.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $type, theme }) =>
    $type === 'rateLimit'
      ? theme.colors.ui.warning.text
      : theme.colors.ui.error.text};
`

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 380px;
  line-height: 1.6;
`

export const ResetTimer = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.accent.yellow};
  font-family: ${({ theme }) => theme.fonts.mono};
`

export const RetryBtn = styled.button`
  padding: 0.5rem 1.25rem;
  background: ${({ theme }) => theme.colors.accent.blue};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  border-radius: ${({ theme }) => theme.radii.md};
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.85;
  }
`
