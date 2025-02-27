import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRouter } from './router/AppRouter'
import { HeroUIProvider } from '@heroui/react'
function App() {
  return (
    <BrowserRouter>
      <HeroUIProvider>
        <AppRouter />
      </HeroUIProvider>
    </BrowserRouter>
  )
}

export default App
