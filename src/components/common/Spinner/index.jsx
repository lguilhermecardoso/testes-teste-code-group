import { SpinnerRing, SpinnerWrapper } from './styles'

export function Spinner({ size = 'md', padded = false }) {
  return (
    <SpinnerWrapper $padded={padded}>
      <SpinnerRing $size={size} role="status" aria-label="Carregando..." />
    </SpinnerWrapper>
  )
}
