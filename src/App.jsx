import { useEffect, useState } from 'react'
import './App.css'
import metMuseumService from './services/metMuseum'
import { Header } from './components/Header'
import { ArtCard } from './components/ArtCard'
import * as React from 'react';
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
  
  const darkModeTheme = createTheme(getDesignTokens(themeMode));

  return (
    <>
    <ThemeProvider theme={darkModeTheme}>
      <Header onThemeChange={setThemeMode} themeMode={themeMode}/>
      <div className="card">
        <button onClick={() => generateNewArt()}>
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


