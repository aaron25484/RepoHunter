import './App.css'
import LanguageSelector from './components/LanguageSelector'
import Navbar from './components/Navbar'
import RoutesComponent from './routes/routes'

function App() {

  return (
    <>
      <LanguageSelector />
      <Navbar />
      <RoutesComponent />
    </>
  )
}

export default App
