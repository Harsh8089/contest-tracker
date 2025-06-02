import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ContestProvider } from './context/ContestContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContestProvider>
      <App />
    </ContestProvider>
  </StrictMode>,
)
