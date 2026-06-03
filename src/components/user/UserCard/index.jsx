import { memo, useMemo } from 'react'
import { Users, Mail, MapPin, Link as LinkIcon, Building2 } from 'lucide-react'
import {
  Card,
  Avatar,
  Info,
  DisplayName,
  Login,
  Bio,
  MetaList,
  MetaItem,
  Stats,
  StatItem,
  StatValue,
  StatLabel,
} from './styles'

function formatCount(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export const UserCard = memo(function UserCard({ user }) {
  const meta = useMemo(() => {
    const items = []
    if (user.company) items.push({ icon: Building2, text: user.company.replace(/^@/, '') })
    if (user.location) items.push({ icon: MapPin, text: user.location })
    if (user.email) items.push({ icon: Mail, text: user.email, href: `mailto:${user.email}` })
    if (user.blog) {
      const url = user.blog.startsWith('http') ? user.blog : `https://${user.blog}`
      items.push({ icon: LinkIcon, text: user.blog, href: url })
    }
    return items
  }, [user])

  return (
    <Card>
      <Avatar src={user.avatar_url} alt={`Avatar de ${user.login}`} loading="lazy" />

      <Info>
        <DisplayName>{user.name ?? user.login}</DisplayName>
        <Login>@{user.login}</Login>

        {user.bio && <Bio>{user.bio}</Bio>}

        {meta.length > 0 && (
          <MetaList>
            {meta.map(({ icon: Icon, text, href }) => (
              <MetaItem key={text}>
                <Icon size={14} strokeWidth={2} />
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {text}
                  </a>
                ) : (
                  text
                )}
              </MetaItem>
            ))}
          </MetaList>
        )}

        <Stats>
          <StatItem>
            <StatValue>{formatCount(user.followers)}</StatValue>
            <StatLabel>
              <Users size={10} style={{ display: 'inline', marginRight: 3 }} />
              seguidores
            </StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{formatCount(user.following)}</StatValue>
            <StatLabel>seguindo</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{user.public_repos}</StatValue>
            <StatLabel>repos</StatLabel>
          </StatItem>
        </Stats>
      </Info>
    </Card>
  )
})
