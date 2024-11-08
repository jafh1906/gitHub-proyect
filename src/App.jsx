import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { OverviewProfile } from './pages/OverviewProfile'
import { CreateAccount } from './pages/CreateAccount'
import { HomePage } from './pages/HomePage'
import { NewRepository } from './pages/NewRepository'
import { Repositorys } from './pages/Repositorys'



function App() {

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/NewRepository" element={<NewRepository/>}/>
            <Route path="/Repositorys/:bucketId" element={<Repositorys/>} />
            <Route path="/Login" element={<Login/>}/>
            <Route path="/CreateAccount" element={<CreateAccount/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/OverviewProfile/:userId" element={<OverviewProfile />} />
            {/* <Route path="/overview-profile/:userId" element={<User />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
