import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import metMuseumService from './services/metMuseum'
import { Header } from './components/Header'
import { ArtCard } from './components/ArtCard'

function App() {
  const [count, setCount] = useState(0)
  const [art, setArt] = useState({})

  useEffect(() => {
    // const fetchData = async () => {
    //   return await metMuseumService.fetchAllData();
    // }
    // const fetchData = async () => {
    //   return await metMuseumService.fetchSingleDepartmentData(3|9|12);
    // }
    // const fetchData = async () => {
    //   // param must be string
    //   return await metMuseumService.fetchDataAfterDate("2022-10-22");
    // }
    // const fetchData = async () => {
    //   return await metMuseumService.fetchDepartmentAndDataAfterDate("2022-10-22", 3|9|12);
    // }
    // const fetchData = async () => {
    //   return await metMuseumService.fetchDataById(8);
    // }
    // const fetchData = async () => {
    //   return await metMuseumService.fetchAllDeparmentsList();
    // }
    const fetchData = async () => {
      return await metMuseumService.fetchDataBySearchQuery('sunflowers');
    }

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    
    console.log(fetchData());
  }, []);

  return (
    <>
      <Header />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={async () => {
          await metMuseumService.
            fetchDataById(Math.floor(Math.random() * 100) + 1)
            .then((data) => setArt(data || {}));
        }}>
          More Art
        </button>
      </div>

      {/* maybe decide to pass art data w/ context? */}
      <ArtCard art={art} />
    </>
  )
}

export default App
