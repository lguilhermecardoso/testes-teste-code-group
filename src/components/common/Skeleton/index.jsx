import { memo } from 'react'
import {
  SkeletonBox,
  UserSkeletonCard,
  UserSkeletonInfo,
  UserSkeletonStats,
  RepoSkeletonCard,
} from './styles'

export const UserCardSkeleton = memo(function UserCardSkeleton() {
  return (
    <UserSkeletonCard aria-label="Carregando perfil...">
      <SkeletonBox $w="96px" $h="96px" $radius="50%" />
      <UserSkeletonInfo>
        <SkeletonBox $w="60%" $h="1.5rem" />
        <SkeletonBox $w="40%" $h="1rem" />
        <SkeletonBox $w="90%" $h="0.875rem" />
        <SkeletonBox $w="75%" $h="0.875rem" />
        <UserSkeletonStats>
          <SkeletonBox $w="80px" $h="1rem" />
          <SkeletonBox $w="80px" $h="1rem" />
        </UserSkeletonStats>
      </UserSkeletonInfo>
    </UserSkeletonCard>
  )
})

export const RepoCardSkeleton = memo(function RepoCardSkeleton() {
  return (
    <RepoSkeletonCard aria-hidden="true">
      <SkeletonBox $w="55%" $h="1rem" />
      <SkeletonBox $w="85%" $h="0.8rem" />
      <SkeletonBox $w="65%" $h="0.8rem" />
      <SkeletonBox $w="30%" $h="0.8rem" />
    </RepoSkeletonCard>
  )
})

export function RepoListSkeleton({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <RepoCardSkeleton key={i} />
      ))}
    </>
  )
}
