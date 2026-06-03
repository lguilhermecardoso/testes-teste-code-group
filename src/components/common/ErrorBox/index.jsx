import { memo, useEffect, useState } from 'react'
import { AlertTriangle, Clock, WifiOff, SearchX } from 'lucide-react'
import { RateLimitError, NotFoundError, NetworkError } from '@/services/api'
import { Wrapper, IconCircle, Title, Description, ResetTimer, RetryBtn } from './styles'

function formatCountdown(resetAt) {
  const diff = Math.max(0, Math.floor((resetAt - Date.now()) / 1000))
  const m = Math.floor(diff / 60)
  const s = diff % 60
  return `${m}m ${String(s).padStart(2, '0')}s`
}

function RateLimitContent({ error }) {
  const [countdown, setCountdown] = useState(
    error.resetAt ? formatCountdown(error.resetAt) : null
  )

  useEffect(() => {
    if (!error.resetAt) return
    const interval = setInterval(() => {
      setCountdown(formatCountdown(error.resetAt))
    }, 1000)
    return () => clearInterval(interval)
  }, [error.resetAt])

  return (
    <>
      <IconCircle $type="rateLimit">
        <Clock size={26} strokeWidth={1.8} />
      </IconCircle>
      <Title>Rate Limit Atingido</Title>
      <Description>
        A API do GitHub limitou as requisições. Aguarde e tente novamente.
      </Description>
      {countdown && <ResetTimer>Liberação em: {countdown}</ResetTimer>}
    </>
  )
}

function NotFoundContent({ error }) {
  return (
    <>
      <IconCircle $type="error">
        <SearchX size={26} strokeWidth={1.8} />
      </IconCircle>
      <Title>Não encontrado</Title>
      <Description>{error.message}</Description>
    </>
  )
}

function NetworkContent() {
  return (
    <>
      <IconCircle $type="error">
        <WifiOff size={26} strokeWidth={1.8} />
      </IconCircle>
      <Title>Sem conexão</Title>
      <Description>Verifique sua internet e tente novamente.</Description>
    </>
  )
}

function GenericContent({ error }) {
  return (
    <>
      <IconCircle $type="error">
        <AlertTriangle size={26} strokeWidth={1.8} />
      </IconCircle>
      <Title>Algo deu errado</Title>
      <Description>{error?.message ?? 'Erro inesperado. Tente novamente.'}</Description>
    </>
  )
}

export const ErrorBox = memo(function ErrorBox({ error, onRetry }) {
  const type =
    error instanceof RateLimitError
      ? 'rateLimit'
      : error instanceof NotFoundError
      ? 'notFound'
      : error instanceof NetworkError
      ? 'network'
      : 'generic'

  return (
    <Wrapper $type={type} role="alert">
      {type === 'rateLimit' && <RateLimitContent error={error} />}
      {type === 'notFound' && <NotFoundContent error={error} />}
      {type === 'network' && <NetworkContent />}
      {type === 'generic' && <GenericContent error={error} />}

      {onRetry && type !== 'rateLimit' && (
        <RetryBtn onClick={onRetry}>Tentar novamente</RetryBtn>
      )}
    </Wrapper>
  )
})
