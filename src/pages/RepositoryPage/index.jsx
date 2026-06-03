import { Suspense, use, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { withErrorBoundary } from 'react-error-boundary'
import { Star, GitFork, Eye, ExternalLink, Code2 } from 'lucide-react'
import { fetchRepo } from '@/services/api'
import { getLanguageColor } from '@/constants/languageColors'
import { BackButton } from '@/components/common/BackButton'
import { ErrorBox } from '@/components/common/ErrorBox'
import { Spinner } from '@/components/common/Spinner'
import { useSnackbar } from '@/contexts/SnackbarContext'
import {
  Card,
  OwnerRow,
  OwnerAvatar,
  OwnerLogin,
  RepoTitle,
  Description,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  LangBadge,
  LangDot,
  GithubBtn,
  PageHeader,
} from './styles'

function formatNumber(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

function RepoContent({ repoPromise }) {
  const repo = use(repoPromise)
  const langColor = getLanguageColor(repo.language)

  return (
    <Card>
      <OwnerRow>
        <OwnerAvatar src={repo.owner.avatar_url} alt={repo.owner.login} loading="lazy" />
        <OwnerLogin>{repo.owner.login}</OwnerLogin>
      </OwnerRow>

      <RepoTitle>{repo.name}</RepoTitle>

      {repo.description && <Description>{repo.description}</Description>}

      {repo.language && (
        <LangBadge>
          <LangDot $color={langColor} />
          <Code2 size={14} strokeWidth={2} />
          {repo.language}
        </LangBadge>
      )}

      <StatsGrid>
        <StatCard>
          <Star size={20} strokeWidth={1.8} />
          <StatValue>{formatNumber(repo.stargazers_count)}</StatValue>
          <StatLabel>Estrelas</StatLabel>
        </StatCard>
        <StatCard>
          <GitFork size={20} strokeWidth={1.8} />
          <StatValue>{formatNumber(repo.forks_count)}</StatValue>
          <StatLabel>Forks</StatLabel>
        </StatCard>
        <StatCard>
          <Eye size={20} strokeWidth={1.8} />
          <StatValue>{formatNumber(repo.watchers_count)}</StatValue>
          <StatLabel>Watchers</StatLabel>
        </StatCard>
      </StatsGrid>

      <GithubBtn
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir ${repo.full_name} no GitHub`}
      >
        <ExternalLink size={15} strokeWidth={2.2} />
        Ver no GitHub
      </GithubBtn>
    </Card>
  )
}

function RepoPageError({ error, resetErrorBoundary }) {
  const snackbar = useSnackbar()

  const handleRetry = () => {
    snackbar.info('Tentando novamente…')
    resetErrorBoundary()
  }

  return <ErrorBox error={error} onRetry={handleRetry} />
}

function RepositoryPageInner() {
  const { owner, repo } = useParams()
  const repoPromise = useMemo(() => fetchRepo(owner, repo), [owner, repo])

  return (
    <>
      <PageHeader>
        <BackButton to={`/user/${owner}`} label={`Perfil de ${owner}`} />
      </PageHeader>

      <Suspense fallback={<Spinner padded />}>
        <RepoContent repoPromise={repoPromise} />
      </Suspense>
    </>
  )
}

export default withErrorBoundary(RepositoryPageInner, {
  FallbackComponent: RepoPageError,
})
