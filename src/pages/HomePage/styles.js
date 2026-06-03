import styled, { keyframes } from 'styled-components'
import { media } from '@/styles/theme'

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-6px); }
`

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: calc(100vh - 60px - 4rem);
  padding: 2rem 0;

  ${media.sm`
    min-height: calc(100vh - 54px - 2.5rem);
    padding: 1.5rem 0;
  `}
`

export const HeroIcon = styled.div`
  color: ${({ theme }) => theme.colors.text.muted};
  margin-bottom: 1.5rem;
  animation: ${float} 3s ease-in-out infinite;

  svg {
    filter: drop-shadow(0 4px 16px ${({ theme }) => theme.colors.accent.blue}30);
  }
`

export const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin-bottom: 0.875rem;

  span {
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.accent.blue},
      ${({ theme }) => theme.colors.accent.purple}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  ${media.md`
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  `}

  ${media.sm`
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  `}
`

export const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 2.5rem;
  max-width: 480px;
  line-height: 1.6;

  ${media.sm`
    font-size: ${({ theme }) => theme.fontSizes.md};
    margin-bottom: 2rem;
  `}
`

export const SearchForm = styled.form`
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const InputRow = styled.div`
  display: flex;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.bg.secondary};
  border: 2px solid ${({ $focused, theme }) =>
    $focused ? theme.colors.accent.blue : theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 0.375rem 0.375rem 0.375rem 1rem;
  transition: border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ $focused, theme }) =>
    $focused ? `0 0 0 3px ${theme.colors.accent.blue}22` : 'none'};
`

export const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: inherit;
  min-width: 0;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }
`

export const SearchBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: ${({ theme }) => theme.colors.accent.blue};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radii.lg};
  transition: opacity ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;
  min-width: 96px;

  &:hover:not(:disabled) {
    opacity: 0.88;
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  ${media.xs`
    padding: 0.625rem 1rem;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    min-width: 80px;
  `}
`

export const HintText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(-4px)')};
  transition: opacity 200ms ease, transform 200ms ease;
  text-align: left;
  padding: 0 0.25rem;
`

export const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.ui.error.text};
  text-align: left;
  padding: 0 0.25rem;
  animation: fadeIn 200ms ease;
`

export const Examples = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 2rem;
`

export const ExampleChip = styled.button`
  padding: 0.375rem 0.875rem;
  background: ${({ theme }) => theme.colors.bg.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  transition:
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.bg.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
    border-color: ${({ theme }) => theme.colors.text.muted};
  }
`
