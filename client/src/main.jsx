import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PromptProvider } from './context/PromptContext.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PromptProvider>
      <App />
      <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 2500,
      }}
    />
    </PromptProvider>

  </StrictMode>,
)
