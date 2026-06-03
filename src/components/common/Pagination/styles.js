import styled, { css } from 'styled-components'
import { media } from '@/styles/theme'

export const PaginationWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  flex-wrap: wrap;
  padding: 0.5rem 0;

  ${media.sm`
    gap: 0.25rem;
  `}
`

const baseBtn = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0 0.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  transition:
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};
  border: 1px solid transparent;

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  ${media.sm`
    min-width: 32px;
    height: 32px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
  `}
`

export const PageBtn = styled.button`
  ${baseBtn}
  background: ${({ $active, theme }) =>
    $active ? theme.colors.accent.blue : theme.colors.bg.secondary};
  color: ${({ $active, theme }) =>
    $active ? '#ffffff' : theme.colors.text.secondary};
  border-color: ${({ $active, theme }) =>
    $active ? theme.colors.accent.blue : theme.colors.border.default};

  &:hover:not(:disabled) {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.accent.blue : theme.colors.bg.tertiary};
    color: ${({ $active, theme }) =>
      $active ? '#ffffff' : theme.colors.text.primary};
    border-color: ${({ $active, theme }) =>
      $active ? theme.colors.accent.blue : theme.colors.text.muted};
  }
`

export const NavBtn = styled.button`
  ${baseBtn}
  background: ${({ theme }) => theme.colors.bg.secondary};
  color: ${({ theme }) => theme.colors.text.secondary};
  border-color: ${({ theme }) => theme.colors.border.default};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.bg.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

export const Ellipsis = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  ${media.sm`
    min-width: 28px;
  `}
`
