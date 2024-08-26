import './App.css'
import { Calendar } from './components/Calendar/Calendar'
import { StravaAuthenticate } from './components/Strava/StravaAuthenticate'
import { Route, Routes } from 'react-router-dom'
import { StravaRedirect } from './components/Strava/StravaRedirect'
import { StravaInfo } from './components/Strava/StravaInfo'

function App() {

  return (
    <>
      <Routes>
        <Route path="/"
          element={
            <>
              <Calendar currentDay={null} />
              <StravaAuthenticate />
            </>
          }
        />
        <Route path="/exchange_token" element={<StravaRedirect />} />
        <Route path="/stravainfo/:accessToken" element={<StravaInfo />} />
      </Routes>
      
    </>
  )
}

export default App
