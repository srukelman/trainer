import './App.css'
import { Calendar } from './components/Calendar/Calendar'
import { StravaAuthenticate } from './components/Strava/StravaAuthenticate'
import { Route, Routes } from 'react-router-dom'
import { StravaRedirect } from './components/Strava/StravaRedirect'
import { StravaInfo } from './components/Strava/StravaInfo'

function App() {

  return (
    <div>
      <Routes>
        
        <Route path="/"
          element={
            <>
              <Calendar currentDay={null} />
              <StravaAuthenticate />
            </>
          }
        />
        <Route path="/Calendar" element={<Calendar currentDay={null} />}/>
        <Route path="/ExchangeToken" element={<StravaRedirect />} />
        <Route path="/StravaInfo/:accessToken" element={<StravaInfo />} />
      </Routes>
    </div>
  )
}

export default App
