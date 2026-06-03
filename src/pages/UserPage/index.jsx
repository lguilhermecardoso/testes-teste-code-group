import { Suspense, use, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { withErrorBoundary } from 'react-error-boundary'
import { fetchUser, fetchRepos } from '@/services/api'
import { UserCard } from '@/components/user/UserCard'
import { RepoList } from '@/components/repository/RepoList'
import { BackButton } from '@/components/common/BackButton'
import { ErrorBox } from '@/components/common/ErrorBox'
import { UserCardSkeleton, RepoListSkeleton } from '@/components/common/Skeleton'
import { useSnackbar } from '@/contexts/SnackbarContext'
import { PageHeader, PageWrapper } from './styles'

function UserContent({ userPromise, reposPromise }) {
  const user = use(userPromise)
  const repos = use(reposPromise)

  return (
    <PageWrapper>
      <UserCard user={user} />
      <RepoList repos={repos} />
    </PageWrapper>
  )
}

function UserPageSkeleton() {
  return (
    <>
      <UserCardSkeleton />
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        <RepoListSkeleton count={5} />
      </div>
    </>
  )
}

function UserPageError({ error, resetErrorBoundary }) {
  const snackbar = useSnackbar()

  const handleRetry = () => {
    snackbar.info('Tentando novamente…')
    resetErrorBoundary()
  }

  return <ErrorBox error={error} onRetry={handleRetry} />
}

function UserPageInner() {
  const { username } = useParams()

  const userPromise = useMemo(() => fetchUser(username), [username])
  const reposPromise = useMemo(() => fetchRepos(username), [username])

  return (
    <>
      <PageHeader>
        <BackButton to="/" label="Nova busca" />
      </PageHeader>

      <Suspense fallback={<UserPageSkeleton />}>
        <UserContent userPromise={userPromise} reposPromise={reposPromise} />
      </Suspense>
    </>
  )
}

export default withErrorBoundary(UserPageInner, {
  FallbackComponent: UserPageError,
})
