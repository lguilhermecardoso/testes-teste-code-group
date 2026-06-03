import styled from 'styled-components'
import { media } from '@/styles/theme'

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  ${media.sm`
    margin-bottom: 1rem;
    gap: 0.75rem;
  `}
`

export const PageWrapper = styled.div`
  animation: fadeInUp 350ms ease;
`
