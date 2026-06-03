import styled from 'styled-components'
import { media } from '@/styles/theme'

export const Section = styled.section`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  ${media.sm`
    margin-top: 1.5rem;
    gap: 1rem;
  `}
`

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};

  ${media.sm`
    font-size: ${({ theme }) => theme.fontSizes.md};
  `}
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.625rem;
  opacity: ${({ $pending }) => ($pending ? 0.65 : 1)};
  transition: opacity 200ms ease;
`

export const PaginationRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding-top: 0.5rem;
`

export const PageInfo = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`
