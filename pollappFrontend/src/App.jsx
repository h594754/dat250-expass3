import { Route, Routes } from 'react-router-dom'
import './App.css'
import CreateUser from './components/CreateUser'
import CreatePoll from './components/CreatePoll'
import VotePoll from './components/VotePoll'

function App() {

  return (
    <>
      <div className='App'>
        <Routes>
          <Route path='/' element={<CreateUser />}></Route>
          <Route path='/createpoll' element={<CreatePoll />}></Route>
          <Route path="/votepoll" element={< VotePoll />}></Route>
        </Routes>
        
      </div>

      
    </>
  )
}

export default App
