import styled from 'styled-components'
import { media } from '@/styles/theme'

export const Card = styled.article`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 1.75rem;
  background: ${({ theme }) => theme.colors.bg.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  animation: fadeInUp 350ms ease;

  ${media.md`
    gap: 1.5rem;
    padding: 1.5rem;
  `}

  ${media.sm`
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.25rem;
    gap: 1rem;
  `}
`

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.border.default};
  flex-shrink: 0;
  object-fit: cover;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  ${Card}:hover & {
    border-color: ${({ theme }) => theme.colors.accent.blue};
  }

  ${media.md`
    width: 88px;
    height: 88px;
  `}

  ${media.sm`
    width: 80px;
    height: 80px;
  `}
`

export const Info = styled.div`
  flex: 1;
  min-width: 0;
`

export const DisplayName = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: -0.02em;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.md`
    font-size: ${({ theme }) => theme.fontSizes.xl};
  `}
`

export const Login = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 0.15rem;
`

export const Bio = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 0.75rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const MetaList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem 1.25rem;
  margin-top: 0.875rem;

  ${media.sm`
    justify-content: center;
  `}
`

export const MetaItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.text.muted};
  }

  a {
    color: inherit;
    text-decoration: none;
    &:hover { color: ${({ theme }) => theme.colors.text.link}; }
  }
`

export const Stats = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border.muted};

  ${media.sm`
    justify-content: center;
    gap: 2rem;
  `}
`

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1rem;

  ${media.sm`
    align-items: center;
  `}
`

export const StatValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: -0.02em;
`

export const StatLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`
