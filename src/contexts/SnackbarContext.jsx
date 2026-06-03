import {
  createContext,
  use,
  useCallback,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import { SnackbarContainer } from '@/components/common/Snackbar'

const ADD = 'ADD'
const REMOVE = 'REMOVE'

function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return [action.payload, ...state].slice(0, 5)
    case REMOVE:
      return state.filter(n => n.id !== action.id)
    default:
      return state
  }
}

const SnackbarContext = createContext(null)

export function SnackbarProvider({ children }) {
  const [notifications, dispatch] = useReducer(reducer, [])
  const counter = useRef(0)
  const timers = useRef(new Map())

  const dismiss = useCallback(id => {
    clearTimeout(timers.current.get(id))
    timers.current.delete(id)
    dispatch({ type: REMOVE, id })
  }, [])

  const show = useCallback(
    (message, { type = 'info', title, duration = 4000 } = {}) => {
      const id = ++counter.current
      dispatch({ type: ADD, payload: { id, message, title, type, duration } })

      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration)
        timers.current.set(id, timer)
      }

      return id
    },
    [dismiss]
  )

  const success = useCallback((msg, opts) => show(msg, { ...opts, type: 'success' }), [show])
  const error   = useCallback((msg, opts) => show(msg, { ...opts, type: 'error', duration: 6000, ...opts }), [show])
  const warning = useCallback((msg, opts) => show(msg, { ...opts, type: 'warning' }), [show])
  const info    = useCallback((msg, opts) => show(msg, { ...opts, type: 'info' }), [show])

  const value = useMemo(
    () => ({ show, success, error, warning, info, dismiss }),
    [show, success, error, warning, info, dismiss]
  )

  return (
    <SnackbarContext value={value}>
      {children}
      <SnackbarContainer notifications={notifications} onDismiss={dismiss} />
    </SnackbarContext>
  )
}

export function useSnackbar() {
  const ctx = use(SnackbarContext)
  if (ctx === null) {
    throw new Error('useSnackbar deve ser usado dentro de <SnackbarProvider>')
  }
  return ctx
}
