import { BrowserRouter } from 'react-router-dom'
import MenuAppBar from './components/common/appbar/Appbar'
import { Router } from './router'
import 'normalize.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import './styles/index.css'
import { ToastContainer } from 'react-toastify'
import { UserProfileContextWrapper } from './components/user/userProfileContextWrapper'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <UserProfileContextWrapper>
          <MenuAppBar />
          <ToastContainer theme='colored' />
          <Router />
        </UserProfileContextWrapper>
      </BrowserRouter>
    </div>
  )
}

export default App
