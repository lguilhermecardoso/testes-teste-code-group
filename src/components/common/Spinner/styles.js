import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to { transform: rotate(360deg); }
`

export const SpinnerRing = styled.div`
  display: inline-block;
  width: ${({ $size }) =>
    $size === 'sm' ? '18px' : $size === 'lg' ? '40px' : '28px'};
  height: ${({ $size }) =>
    $size === 'sm' ? '18px' : $size === 'lg' ? '40px' : '28px'};
  border: ${({ $size }) =>
    $size === 'sm' ? '2px' : $size === 'lg' ? '4px' : '3px'}
    solid ${({ theme }) => theme.colors.border.default};
  border-top-color: ${({ theme }) => theme.colors.accent.blue};
  border-radius: 50%;
  animation: ${spin} 700ms linear infinite;
`

export const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $padded }) => ($padded ? '3rem 0' : '0')};
  width: 100%;
`
