import styled, { css } from 'styled-components'
import { media } from '@/styles/theme'

export const FiltersBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;

  ${media.sm`
    gap: 0.5rem;
  `}
`

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`

export const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
  white-space: nowrap;

  ${media.xs`
    display: none;
  `}
`

const btnBase = css`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  transition:
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  ${media.xs`
    padding: 0.35rem 0.6rem;
  `}
`

export const SortBtn = styled.button`
  ${btnBase}
  background: ${({ $active, theme }) =>
    $active ? theme.colors.accent.blue + '1a' : theme.colors.bg.secondary};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.accent.blue : theme.colors.text.secondary};
  border-color: ${({ $active, theme }) =>
    $active ? theme.colors.accent.blue + '66' : theme.colors.border.default};

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.accent.blue + '26' : theme.colors.bg.tertiary};
    color: ${({ $active, theme }) =>
      $active ? theme.colors.accent.blue : theme.colors.text.primary};
  }
`

export const OrderBtn = styled.button`
  ${btnBase}
  background: ${({ theme }) => theme.colors.bg.secondary};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 0.375rem 0.625rem;

  &:hover {
    background: ${({ theme }) => theme.colors.bg.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  svg {
    transition: transform ${({ theme }) => theme.transitions.fast};
    transform: ${({ $asc }) => ($asc ? 'scaleY(1)' : 'scaleY(-1)')};
  }
`

export const PageSizeSelect = styled.select`
  ${btnBase}
  background: ${({ theme }) => theme.colors.bg.secondary};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  padding-right: 1.75rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238b949e' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;

  &:hover, &:focus {
    background-color: ${({ theme }) => theme.colors.bg.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
    outline: none;
  }

  option {
    background: ${({ theme }) => theme.colors.bg.secondary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

export const ResultCount = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  margin-left: auto;

  strong {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  ${media.sm`
    width: 100%;
    margin-left: 0;
  `}
`
