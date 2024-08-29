import './App.css'
import { Calendar } from './components/Calendar/Calendar'
import { StravaAuthenticate } from './components/Strava/StravaAuthenticate'
import { Route, Routes } from 'react-router-dom'
import { StravaRedirect } from './components/Strava/StravaRedirect'
import { StravaInfo } from './components/Strava/StravaInfo'
import { Navbar } from './components/Navbar/Navbar'

function App() {

  return (
    <div>
      <Navbar items={[{label: 'Home', path: '/'}, {label: 'Calendar', path: '/Calendar'}]} />
      <Routes>
        <Route path="/Calendar" element={<Calendar currentDay={null} />}/>
        <Route path="/ExchangeToken" element={<StravaRedirect />} />
        <Route path="/StravaInfo/:accessToken" element={<StravaInfo />} />
        <Route path="/"
          element={
            <>
              <Calendar currentDay={null} />
              <StravaAuthenticate />
            </>
          }
        />
        <Route path='*' element={<Calendar currentDay={null} />}/>
      </Routes>
    </div>
  )
}

export default App
