import { BrowserRouter } from 'react-router-dom'
import MenuAppBar from './components/common/appbar/Appbar'
import { Router } from './router'
import "normalize.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/index.css'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
      <MenuAppBar/>
      <ToastContainer theme = 'colored' />
        <Router/>
      </BrowserRouter>
    </div>
  )
}

export default App
