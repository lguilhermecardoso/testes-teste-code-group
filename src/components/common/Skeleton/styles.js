import styled, { css } from 'styled-components'
import { media } from '@/styles/theme'

export const shimmerBase = css`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.bg.tertiary} 0%,
    ${({ theme }) => theme.colors.bg.secondary} 50%,
    ${({ theme }) => theme.colors.bg.tertiary} 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 1.8s infinite linear;
`

export const SkeletonBox = styled.div`
  ${shimmerBase}
  border-radius: ${({ theme, $radius }) => $radius ?? theme.radii.md};
  width: ${({ $w }) => $w ?? '100%'};
  height: ${({ $h }) => $h ?? '1rem'};
  flex-shrink: 0;
`

export const UserSkeletonCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.bg.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.xl};

  ${media.md`
    flex-direction: column;
    align-items: center;
    text-align: center;
  `}
`

export const UserSkeletonInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const UserSkeletonStats = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  ${media.md`
    justify-content: center;
  `}
`

export const RepoSkeletonCard = styled.div`
  padding: 1rem 1.25rem;
  background: ${({ theme }) => theme.colors.bg.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.lg};
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`
