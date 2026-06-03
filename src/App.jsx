import { HashRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { SnackbarProvider } from '@/contexts/SnackbarContext'
import { Layout } from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import UserPage from '@/pages/UserPage'
import RepositoryPage from '@/pages/RepositoryPage'
import NotFoundPage from '@/pages/NotFoundPage'

export default function App() {
  return (
    <ThemeProvider>
      <SnackbarProvider>
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/user/:username" element={<UserPage />} />
              <Route path="/repo/:owner/:repo" element={<RepositoryPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </HashRouter>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
