import { Route, Routes } from 'react-router-dom'
import './App.css'
import CreateUser from './components/CreateUser'
import Menu from './components/Menu'
import CreatePoll from './components/CreatePoll'

function App() {

  return (
    <>
      <div className='App'>
        <Routes>
          <Route path='/' element={<CreateUser />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path='createpoll' element={<CreatePoll />}></Route>
        </Routes>
        
      </div>

      
    </>
  )
}

export default App
