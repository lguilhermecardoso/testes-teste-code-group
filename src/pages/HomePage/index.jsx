import { useActionState, useDeferredValue, useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Github, Search } from 'lucide-react'
import { Spinner } from '@/components/common/Spinner'
import { useSnackbar } from '@/contexts/SnackbarContext'
import {
  Hero,
  HeroIcon,
  HeroTitle,
  HeroSubtitle,
  SearchForm,
  InputRow,
  SearchInput,
  SearchBtn,
  HintText,
  ErrorText,
  Examples,
  ExampleChip,
} from './styles'

const EXAMPLES = ['torvalds', 'gaearon', 'yyx990803', 'addyosmani', 'sindresorhus']

export default function HomePage() {
  const navigate = useNavigate()
  const snackbar = useSnackbar()
  const inputId = useId()
  const errorId = useId()

  const [focused, setFocused] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const deferredInput = useDeferredValue(inputValue)
  const showHint = deferredInput.length >= 2 && deferredInput.length <= 39

  const [formError, formAction, isPending] = useActionState(
    async (_prev, formData) => {
      const username = formData.get('username')?.trim()

      if (!username) return 'Por favor, insira um nome de usuário.'
      if (!/^[a-zA-Z0-9-]+$/.test(username)) {
        snackbar.warning('Use apenas letras, números e hífens no nome de usuário.')
        return 'Nome de usuário inválido.'
      }

      navigate(`/user/${username}`)
      return null
    },
    null
  )

  return (
    <Hero>
      <HeroIcon>
        <Github size={56} strokeWidth={1.4} />
      </HeroIcon>

      <HeroTitle>
        Explore o <span>GitHub</span>
      </HeroTitle>

      <HeroSubtitle>
        Busque qualquer perfil e mergulhe nos repositórios, estatísticas e projetos.
      </HeroSubtitle>

      <SearchForm action={formAction} noValidate>
        <InputRow $focused={focused}>
          <label htmlFor={inputId} style={{ display: 'none' }}>
            Buscar usuário do GitHub
          </label>
          <SearchInput
            id={inputId}
            name="username"
            type="text"
            placeholder="Digite um usuário do GitHub…"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            aria-describedby={formError ? errorId : undefined}
            aria-invalid={Boolean(formError)}
            aria-label="Nome de usuário do GitHub"
            disabled={isPending}
          />
          <SearchBtn type="submit" disabled={isPending} aria-label="Buscar">
            {isPending ? <Spinner size="sm" /> : <Search size={16} strokeWidth={2.2} />}
            {isPending ? 'Buscando…' : 'Buscar'}
          </SearchBtn>
        </InputRow>

        <HintText $visible={showHint} aria-live="polite">
          Pressione Enter para explorar "{deferredInput}"
        </HintText>

        {formError && (
          <ErrorText id={errorId} role="alert">
            {formError}
          </ErrorText>
        )}
      </SearchForm>

      <Examples aria-label="Exemplos de usuários">
        {EXAMPLES.map(username => (
          <ExampleChip
            key={username}
            type="button"
            onClick={() => navigate(`/user/${username}`)}
            aria-label={`Buscar ${username}`}
          >
            {username}
          </ExampleChip>
        ))}
      </Examples>
    </Hero>
  )
}
