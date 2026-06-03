import styled from 'styled-components'
import { media } from '@/styles/theme'

export const Main = styled.main`
  flex: 1;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem;

  ${media.md`
    padding: 1.5rem 1.25rem;
  `}

  ${media.sm`
    padding: 1.25rem 1rem;
  `}
`
