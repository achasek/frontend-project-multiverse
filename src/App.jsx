import { useEffect, useState } from 'react'
import './App.css'
import metMuseumService from './services/metMuseum'
import { Header } from './components/Header'
import { ArtCard } from './components/ArtCard'
import { ArtContext } from './Contexts';

function App() {
  const [art, setArt] = useState({});

  // const generateRandomId =  () => {
  //   return Math.floor(Math.random() * 488334);
  // }

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
    
    console.log(fetchData());
  }, []);

  const generateNewArt = async () => {
    await metMuseumService.
      fetchDataById(Math.floor(Math.random() * 100) + 1)
      .then((data) => setArt(data || {}));
  };

  return (
    <>
      <Header />
      <div className="card">
        <button onClick={() => generateNewArt()}>
          More Art
        </button>
      </div>

      <ArtContext.Provider value={art}>
        <ArtCard />
      </ArtContext.Provider>
    </>
  )
}

export default App
