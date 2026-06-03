import { memo } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { SORT_OPTIONS, PAGE_SIZE_OPTIONS } from '@/constants/languageColors'
import {
  FiltersBar,
  FilterGroup,
  Label,
  SortBtn,
  OrderBtn,
  PageSizeSelect,
  ResultCount,
} from './styles'

export const RepoFilters = memo(function RepoFilters({
  sort,
  order,
  pageSize,
  totalRepos,
  onSortChange,
  onOrderToggle,
  onPageSizeChange,
}) {
  return (
    <FiltersBar role="toolbar" aria-label="Filtros de repositórios">
      <FilterGroup>
        <Label>Ordenar por</Label>
        {SORT_OPTIONS.map(({ value, label }) => (
          <SortBtn
            key={value}
            $active={sort === value}
            onClick={() => onSortChange(value)}
            aria-pressed={sort === value}
          >
            {label}
          </SortBtn>
        ))}
      </FilterGroup>

      <OrderBtn
        $asc={order === 'asc'}
        onClick={onOrderToggle}
        title={order === 'asc' ? 'Ordem ascendente' : 'Ordem descendente'}
        aria-label={`Ordem ${order === 'asc' ? 'ascendente' : 'descendente'}, clique para inverter`}
      >
        <ArrowUpDown size={13} strokeWidth={2.2} />
        {order === 'asc' ? 'A→Z' : 'Z→A'}
      </OrderBtn>

      <FilterGroup>
        <Label>Por página</Label>
        <PageSizeSelect
          value={pageSize}
          onChange={e => onPageSizeChange(Number(e.target.value))}
          aria-label="Repositórios por página"
        >
          {PAGE_SIZE_OPTIONS.map(n => (
            <option key={n} value={n}>
              {n} repos
            </option>
          ))}
        </PageSizeSelect>
      </FilterGroup>

      <ResultCount>
        <strong>{totalRepos}</strong> repositórios
      </ResultCount>
    </FiltersBar>
  )
})
