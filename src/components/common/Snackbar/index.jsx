import { memo, useCallback, useState } from 'react'
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import {
  Container,
  Toast,
  IconWrapper,
  Body,
  Title,
  Message,
  CloseBtn,
  ProgressBar,
} from './styles'

const TYPE_ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const DEFAULT_DURATION = 4000

const SnackbarItem = memo(function SnackbarItem({ notification, onDismiss }) {
  const [exiting, setExiting] = useState(false)
  const { id, type = 'info', title, message, duration = DEFAULT_DURATION } = notification

  const Icon = TYPE_ICONS[type] ?? Info

  const handleClose = useCallback(() => {
    setExiting(true)
    setTimeout(() => onDismiss(id), 260)
  }, [id, onDismiss])

  return (
    <Toast $type={type} $exiting={exiting} role="alert" aria-live="polite">
      <IconWrapper $type={type}>
        <Icon size={18} strokeWidth={2.2} />
      </IconWrapper>

      <Body>
        {title && <Title>{title}</Title>}
        <Message>{message}</Message>
      </Body>

      <CloseBtn onClick={handleClose} aria-label="Fechar notificação">
        <X size={14} strokeWidth={2.5} />
      </CloseBtn>

      {duration > 0 && <ProgressBar $type={type} $duration={duration} />}
    </Toast>
  )
})

export function SnackbarContainer({ notifications, onDismiss }) {
  if (notifications.length === 0) return null

  return (
    <Container aria-label="Notificações">
      {notifications.map(n => (
        <SnackbarItem key={n.id} notification={n} onDismiss={onDismiss} />
      ))}
    </Container>
  )
}
