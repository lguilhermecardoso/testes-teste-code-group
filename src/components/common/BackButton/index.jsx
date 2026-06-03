import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { StyledBackButton } from './styles'

export const BackButton = memo(function BackButton({ label = 'Voltar', to }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (to) navigate(to)
    else navigate(-1)
  }

  return (
    <StyledBackButton onClick={handleClick} aria-label={label}>
      <ArrowLeft size={16} strokeWidth={2.2} />
      {label}
    </StyledBackButton>
  )
})
