import { memo, useCallback, useMemo, useOptimistic, useState, useTransition } from 'react'
import { RepoCard } from '../RepoCard'
import { RepoFilters } from '../RepoFilters'
import { Pagination } from '@/components/common/Pagination'
import { RepoListSkeleton } from '@/components/common/Skeleton'
import { Section, SectionHeader, SectionTitle, Grid, PaginationRow, PageInfo, EmptyState } from './styles'

function sortRepos(repos, sort, order) {
  return [...repos].sort((a, b) => {
    let cmp = 0
    if (sort === 'stars') cmp = a.stargazers_count - b.stargazers_count
    else if (sort === 'name') cmp = a.name.localeCompare(b.name)
    else if (sort === 'updated') cmp = new Date(a.updated_at) - new Date(b.updated_at)
    return order === 'asc' ? cmp : -cmp
  })
}

export const RepoList = memo(function RepoList({ repos }) {
  const [sort, setSort] = useState('stars')
  const [order, setOrder] = useState('desc')
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)

  // useTransition: marks pagination as non-urgent so the UI stays responsive
  const [isPending, startTransition] = useTransition()

  // useOptimistic: page number shows immediately before transition settles
  const [optimisticPage, setOptimisticPage] = useOptimistic(page)

  const sortedRepos = useMemo(() => sortRepos(repos, sort, order), [repos, sort, order])

  const totalPages = Math.max(1, Math.ceil(sortedRepos.length / pageSize))

  const pagedRepos = useMemo(() => {
    const start = (page - 1) * pageSize
    return sortedRepos.slice(start, start + pageSize)
  }, [sortedRepos, page, pageSize])

  const handleSortChange = useCallback((newSort) => {
    startTransition(() => {
      setSort(newSort)
      setPage(1)
    })
  }, [])

  const handleOrderToggle = useCallback(() => {
    startTransition(() => {
      setOrder(o => (o === 'asc' ? 'desc' : 'asc'))
      setPage(1)
    })
  }, [])

  const handlePageSizeChange = useCallback((newSize) => {
    startTransition(() => {
      setPageSize(newSize)
      setPage(1)
    })
  }, [])

  const handlePageChange = useCallback((newPage) => {
    // Show new page number immediately via optimistic update
    setOptimisticPage(newPage)
    startTransition(() => {
      setPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }, [setOptimisticPage])

  if (repos.length === 0) {
    return <EmptyState>Nenhum repositório público encontrado.</EmptyState>
  }

  const startItem = (page - 1) * pageSize + 1
  const endItem = Math.min(page * pageSize, sortedRepos.length)

  return (
    <Section aria-label="Repositórios">
      <SectionHeader>
        <SectionTitle>Repositórios</SectionTitle>
        <RepoFilters
          sort={sort}
          order={order}
          pageSize={pageSize}
          totalRepos={repos.length}
          onSortChange={handleSortChange}
          onOrderToggle={handleOrderToggle}
          onPageSizeChange={handlePageSizeChange}
        />
      </SectionHeader>

      <Grid $pending={isPending} aria-live="polite" aria-busy={isPending}>
        {isPending ? (
          <RepoListSkeleton count={pageSize} />
        ) : (
          pagedRepos.map(repo => <RepoCard key={repo.id} repo={repo} />)
        )}
      </Grid>

      {totalPages > 1 && (
        <PaginationRow>
          <Pagination
            current={optimisticPage}
            total={totalPages}
            onChange={handlePageChange}
            disabled={isPending}
          />
          <PageInfo>
            {startItem}–{endItem} de {sortedRepos.length} repositórios
          </PageInfo>
        </PaginationRow>
      )}
    </Section>
  )
})
