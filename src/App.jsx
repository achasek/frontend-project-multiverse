import { useEffect, useState } from 'react'
import './App.css'
import metMuseumService from './services/metMuseum'
import { Header } from './components/Header'
import { ArtCard } from './components/ArtCard'
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { amber, grey } from '@mui/material/colors';
import { ArtContext } from './Contexts';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...amber,
      ...(mode === 'dark' && {
        main: grey[300],
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: grey[900],
        paper: grey[900],
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: '#fff',
            secondary: grey[500],
          }),
    },
  },
});


export default function App() {
  const [art, setArt] = useState({});
  const [themeMode, setThemeMode] = useState('light')
  const theme = useTheme();

  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   return await metMuseumService.fetchAllData();
  //   // }
  //   // const fetchData = async () => {
  //   //   return await metMuseumService.fetchSingleDepartmentData(3|9|12);
  //   // }
  //   // const fetchData = async () => {
  //   //   // param must be string
  //   //   return await metMuseumService.fetchDataAfterDate("2022-10-22");
  //   // }
  //   // const fetchData = async () => {
  //   //   return await metMuseumService.fetchDepartmentAndDataAfterDate("2022-10-22", 3|9|12);
  //   // }
  //   // const fetchData = async () => {
  //   //   return await metMuseumService.fetchDataById(8);
  //   // }
  //   // const fetchData = async () => {
  //   //   return await metMuseumService.fetchAllDeparmentsList();
  //   // }
  //   const fetchData = async () => {
  //     return await metMuseumService.fetchDataBySearchQuery('sunflowers');
  //   }
    
  //   console.log(fetchData());
  // }, []);

  useEffect(() => {
    const initialFetch = async () => {
      const initialData = await metMuseumService.fetchDataById(3);
      setArt(initialData);
    };

    initialFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const darkModeTheme = createTheme(getDesignTokens(themeMode));

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
        data = await handleFetchArt();
        // eslint-disable-next-line no-prototype-builtins
        if(data.hasOwnProperty('primaryImage')) {isImageCorrect = checkImageDataCorrect(data)}
      }
      setArt(data);
  }

  return (
    <>
      <ThemeProvider theme={darkModeTheme}>
        <Header onThemeChange={setThemeMode} themeMode={themeMode}/>
        <div className="card">
          <button onClick={() => {
            setArt(continuousFetchArt)
          }}>
            More Art
          </button>
        </div>

        <ArtContext.Provider value={art}>
          <ArtCard />
        </ArtContext.Provider>
      </ThemeProvider>
    </>
  )
}


