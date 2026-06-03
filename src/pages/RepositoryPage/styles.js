import styled from 'styled-components'
import { media } from '@/styles/theme'

export const Card = styled.article`
  background: ${({ theme }) => theme.colors.bg.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  animation: fadeInUp 350ms ease;

  ${media.sm`
    padding: 1.25rem;
    gap: 1.25rem;
  `}
`

export const OwnerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`

export const OwnerAvatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
`

export const OwnerLogin = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export const RepoTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: -0.02em;
  line-height: 1.3;
  word-break: break-word;

  ${media.sm`
    font-size: ${({ theme }) => theme.fontSizes.xl};
  `}
`

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;

  ${media.sm`
    font-size: ${({ theme }) => theme.fontSizes.sm};
  `}
`

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;

  ${media.sm`
    grid-template-columns: repeat(2, 1fr);
  `}
`

export const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.bg.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.muted};
  border-radius: ${({ theme }) => theme.radii.lg};
  text-align: center;

  svg {
    color: ${({ theme }) => theme.colors.text.muted};
  }
`

export const StatValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`

export const StatLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

export const LangBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  background: ${({ theme }) => theme.colors.bg.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  width: fit-content;
`

export const LangDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`

export const GithubBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: ${({ theme }) => theme.colors.accent.blue};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radii.md};
  width: fit-content;
  text-decoration: none;
  opacity: 1;
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover { opacity: 0.85; }
`

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  ${media.sm`
    margin-bottom: 1rem;
  `}
`
