import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import { HeroUIProvider } from '@heroui/react'
import {ToastProvider} from "@heroui/toast";
import './App.css'
import { Provider } from 'react-redux';
import { store } from './store/store' 

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <HeroUIProvider>
          <ToastProvider 
            placement='top-right'
            toastOffset={30}
            toastProps={{
              shouldShowTimeoutProgess: true,
              radius: 'lg',
              classNames: {
                base: "text-sm p-2", 
                title: "font-medium",
                description: "text-xs"
              }
            }}
            />
          <AppRouter />
        </HeroUIProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
