import { memo } from 'react'
import { Github, Moon, Sun, LayoutDashboard } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { NavBar, NavInner, LogoLink, NavActions, ThemeToggleBtn, GithubLink } from './styles'

export const Navbar = memo(function Navbar() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <NavBar>
      <NavInner>
        <LogoLink to="/" aria-label="GitHub Explorer — página inicial">
          <LayoutDashboard size={22} strokeWidth={2} />
          <span>GitHub Explorer</span>
        </LogoLink>

        <NavActions>
          <ThemeToggleBtn
            onClick={toggleTheme}
            aria-label={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            title={isDark ? 'Tema claro' : 'Tema escuro'}
          >
            {isDark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
          </ThemeToggleBtn>

          <GithubLink
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir GitHub"
            title="GitHub"
          >
            <Github size={18} strokeWidth={2} />
          </GithubLink>
        </NavActions>
      </NavInner>
    </NavBar>
  )
})
