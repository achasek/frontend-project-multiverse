import { useEffect, useState } from 'react'
import './App.css'
import metMuseumService from './services/metMuseum'
import { Header } from './components/Header'
import { ArtCard } from './components/ArtCard'
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { amber, grey } from '@mui/material/colors';
import { ArtContext, FavoritesContext } from './Contexts';
import Button from '@mui/material/Button';
import { FavoriteCard } from './components/FavoriteCard'
import Grid from '@mui/material/Grid';

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
  const [favorites, setFavorites] = useState([]);

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
      const initialData = await metMuseumService.fetchDataById(1241);
      setArt(initialData);
    };

    initialFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const darkModeTheme = createTheme(getDesignTokens(themeMode));

  function checkImageDataCorrect(data) {
    return data.primaryImage !== "";
  }

  async function handleFetchArt() {
    const data = await metMuseumService.fetchDataById(Math.floor(Math.random() * 400) + 1);
    return data;
  }

  async function continuousFetchArt() {
    let isImageCorrect = false;
    let data;
    while (!isImageCorrect) {
      data = await handleFetchArt();
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty('primaryImage')) { isImageCorrect = checkImageDataCorrect(data) }
    }
    setArt(data);
  }

  const removeFavorite = () => {
    setFavorites(favorites.slice(0, -1));
  }

  const handleFavorites = () => {
    let isValidFavorite = true;
    for (let i = 0; i < favorites.length; i++) {
      if ((art.objectID === undefined) || (art.objectID === favorites[i].objectID)) {
        isValidFavorite = false;
      }
      console.log(art.objectID);
    }
    if (isValidFavorite == true) {
      setFavorites([...favorites, art]);
    }
  }

  return (
    <>
      <ThemeProvider theme={darkModeTheme}>
        <Header onThemeChange={setThemeMode} themeMode={themeMode} />
        <div className="card">
          <button onClick={() => {
            setArt(continuousFetchArt)
          }}>
            More Art
          </button>
        </div>

        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center"
        }}>
          <ArtContext.Provider value={art}>
            <ArtCard />
          </ArtContext.Provider>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Button size="small" onClick={handleFavorites}>Favorite</Button>
            <Button size="small" onClick={removeFavorite}>Remove</Button>
            <a href={art.objectWikidata_URL || art.objectURL} target='blank'>
              <Button size="small">Learn More</Button>
            </a>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", }}>
          {/* TODO: Make display actually look good and/or move to a "favorites page" */}
          {
            favorites.map((favorite) =>
              <div style={{ margin: "1rem" }}>

                <FavoritesContext.Provider value={favorite}>
                  <FavoriteCard />
                </FavoritesContext.Provider>

              </div>
            )}
        </div>
      </ThemeProvider>
    </>
  )
}


