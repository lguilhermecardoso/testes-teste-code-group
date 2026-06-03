import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star } from 'lucide-react'
import { getLanguageColor } from '@/constants/languageColors'
import { Card, RepoName, RepoDescription, Meta, MetaBadge, LangDot } from './styles'

function formatStars(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export const RepoCard = memo(function RepoCard({ repo }) {
  const navigate = useNavigate()
  const langColor = getLanguageColor(repo.language)

  const handleClick = () => {
    navigate(`/repo/${repo.full_name}`)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') handleClick()
  }

  return (
    <Card
      onClick={handleClick}
      onKeyDown={handleKey}
      role="button"
      tabIndex={0}
      aria-label={`Ver repositório ${repo.name}`}
    >
      <RepoName>{repo.name}</RepoName>

      {repo.description && (
        <RepoDescription>{repo.description}</RepoDescription>
      )}

      <Meta>
        {repo.stargazers_count > 0 && (
          <MetaBadge>
            <Star size={12} strokeWidth={2} />
            {formatStars(repo.stargazers_count)}
          </MetaBadge>
        )}
        {repo.language && (
          <MetaBadge>
            <LangDot $color={langColor} aria-hidden="true" />
            {repo.language}
          </MetaBadge>
        )}
      </Meta>
    </Card>
  )
})
