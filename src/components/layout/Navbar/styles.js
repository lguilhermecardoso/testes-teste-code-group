import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { media } from '@/styles/theme'

export const NavBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${({ theme }) => theme.colors.bg.secondary}cc;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.muted};
`

export const NavInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  ${media.sm`
    padding: 0 1rem;
    height: 54px;
  `}
`

export const LogoLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  letter-spacing: -0.02em;
  text-decoration: none;
  opacity: 1 !important;

  svg {
    color: ${({ theme }) => theme.colors.text.secondary};
    transition: color ${({ theme }) => theme.transitions.fast};
  }

  &:hover svg {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  span {
    ${media.xs`
      display: none;
    `}
  }
`

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const ThemeToggleBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  background: transparent;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.bg.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
    border-color: ${({ theme }) => theme.colors.border.default};
  }
`

export const GithubLink = styled.a`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  background: transparent;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};
  text-decoration: none;
  opacity: 1 !important;

  &:hover {
    background: ${({ theme }) => theme.colors.bg.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
    border-color: ${({ theme }) => theme.colors.border.default};
  }
`
