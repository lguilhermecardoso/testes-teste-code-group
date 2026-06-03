import styled, { keyframes, css } from 'styled-components'
import { media } from '@/styles/theme'

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(110px) scale(0.95); }
  to   { opacity: 1; transform: translateX(0)    scale(1);    }
`

const slideOut = keyframes`
  from { opacity: 1; transform: translateX(0)    scale(1);    }
  to   { opacity: 0; transform: translateX(110px) scale(0.95); }
`

export const Container = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: ${({ theme }) => theme.zIndex.snackbar};
  pointer-events: none;
  max-width: 380px;
  width: calc(100vw - 2rem);

  ${media.sm`
    bottom: 1rem;
    right: 1rem;
  `}
`

export const Toast = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: ${({ theme }) => theme.colors.bg.secondary};
  border: 1px solid ${({ $type, theme }) => theme.colors.ui[$type]?.border ?? theme.colors.border.default};
  border-left: 4px solid ${({ $type, theme }) => theme.colors.ui[$type]?.border ?? theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  pointer-events: all;
  position: relative;
  overflow: hidden;
  animation: ${({ $exiting }) =>
    $exiting
      ? css`${slideOut} 280ms ease forwards`
      : css`${slideIn} 280ms ease`};

  ${media.sm`
    padding: 0.75rem 0.875rem;
  `}
`

export const IconWrapper = styled.div`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $type, theme }) => theme.colors.ui[$type]?.text ?? theme.colors.text.secondary};
  margin-top: 1px;
`

export const Body = styled.div`
  flex: 1;
  min-width: 0;
`

export const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.4;
  margin-bottom: 0.2rem;
`

export const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.4;
  word-break: break-word;
`

export const CloseBtn = styled.button`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.text.muted};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};
  margin-top: -2px;

  &:hover {
    background: ${({ theme }) => theme.colors.bg.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

const shrink = keyframes`
  from { width: 100%; }
  to   { width: 0%;   }
`

export const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: ${({ $type, theme }) => theme.colors.ui[$type]?.border ?? theme.colors.border.default};
  opacity: 0.6;
  border-radius: 0 0 0 ${({ theme }) => theme.radii.lg};
  animation: ${shrink} ${({ $duration }) => $duration}ms linear forwards;
`
