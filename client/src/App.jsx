import {BrowserRouter,Routes,Route} from 'react-router-dom'

import DashBoard from './pages/DashBoardPage'
import PromptPage from './pages/PromptsPage'
import Layout from './components/layout/Layout'
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return(
    <BrowserRouter>
    <Layout>
    <Routes>
      <Route path="/" element={<DashBoard/>}/>
      <Route path="/prompts" element={<PromptPage/>}/>
      <Route path="/favourites" element={<FavoritesPage/>}/>
    </Routes>
    </Layout>
    </BrowserRouter>
  )
}

export default App