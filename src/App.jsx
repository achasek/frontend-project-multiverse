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

  function checkImageDataCorrect(data) {
    return data.primaryImage !== "";
  }

  async function handleFetchArt () {
      const data = await metMuseumService.fetchDataById(Math.floor(Math.random() * 400) + 1);
      return data;
  }

  async function continuousFetchArt() {
    let isImageCorrect = false;
    let data;
    while (!isImageCorrect) {
        console.log("should get continuous stuff");
        data = await handleFetchArt();
        if(data.hasOwnProperty('primaryImage')) {isImageCorrect = checkImageDataCorrect(data)};
      }
      setArt(data);
  }


  return (
    <>
      <Header />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => {
          setArt(continuousFetchArt)
        }}>
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
