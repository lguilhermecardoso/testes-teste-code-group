import { memo, useMemo } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { PaginationWrapper, PageBtn, NavBtn, Ellipsis } from './styles'

function buildPageWindow(current, total, windowSize = 5) {
  if (total <= windowSize + 2) return Array.from({ length: total }, (_, i) => i + 1)

  const half = Math.floor(windowSize / 2)
  let start = Math.max(2, current - half)
  let end = Math.min(total - 1, start + windowSize - 1)

  if (end - start < windowSize - 1) start = Math.max(2, end - windowSize + 1)

  const pages = []
  pages.push(1)
  if (start > 2) pages.push('...')
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < total - 1) pages.push('...')
  pages.push(total)
  return pages
}

export const Pagination = memo(function Pagination({
  current,
  total,
  onChange,
  disabled = false,
}) {
  const pages = useMemo(() => buildPageWindow(current, total), [current, total])

  if (total <= 1) return null

  return (
    <PaginationWrapper aria-label="Paginação">
      <NavBtn
        onClick={() => onChange(1)}
        disabled={current === 1 || disabled}
        aria-label="Primeira página"
        title="Primeira"
      >
        <ChevronsLeft size={15} strokeWidth={2} />
      </NavBtn>

      <NavBtn
        onClick={() => onChange(current - 1)}
        disabled={current === 1 || disabled}
        aria-label="Página anterior"
        title="Anterior"
      >
        <ChevronLeft size={15} strokeWidth={2} />
      </NavBtn>

      {pages.map((page, idx) =>
        page === '...' ? (
          <Ellipsis key={`ellipsis-${idx}`}>…</Ellipsis>
        ) : (
          <PageBtn
            key={page}
            $active={page === current}
            onClick={() => page !== current && onChange(page)}
            disabled={disabled}
            aria-label={`Página ${page}`}
            aria-current={page === current ? 'page' : undefined}
          >
            {page}
          </PageBtn>
        )
      )}

      <NavBtn
        onClick={() => onChange(current + 1)}
        disabled={current === total || disabled}
        aria-label="Próxima página"
        title="Próxima"
      >
        <ChevronRight size={15} strokeWidth={2} />
      </NavBtn>

      <NavBtn
        onClick={() => onChange(total)}
        disabled={current === total || disabled}
        aria-label="Última página"
        title="Última"
      >
        <ChevronsRight size={15} strokeWidth={2} />
      </NavBtn>
    </PaginationWrapper>
  )
})
