import { Navbar } from '../Navbar'
import { Main } from './styles'

export function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Main>{children}</Main>
    </>
  )
}
