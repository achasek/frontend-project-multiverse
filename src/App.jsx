import { useEffect, useState } from 'react'
import './App.css'
import metMuseumService from './services/metMuseum'
import { Header } from './components/Header'
import { ArtCard } from './components/ArtCard'
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';
import { ArtContext, FavoritesContext} from './Contexts';
import { Route, Switch } from 'react-router-dom';
import FavoriteList from './components/FavoriteList'
import { DepartmentList } from './components/DepartmentList'
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...blue,
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
  const [isFav, setIsFav] = useState(false)
  const [departments, setDepartments] = useState([]);
  const [activeDepartment, setActiveDepartment] = useState({});
  const [artList, setArtList] = useState([]);

  useEffect(() => {
    const initialFetch = async () => {
      const initialData = await metMuseumService.fetchDataById(1241);
      setArt(initialData);

      const initialArtList = await getAllArtIds();
      setArtList(initialArtList);
    };

    initialFetch();
    setDepartmentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const darkModeTheme = createTheme(getDesignTokens(themeMode));

  async function getAllArtIds() {
    const allArt = await metMuseumService.fetchAllData();
    const artIds = allArt.objectIDs;
    return artIds;
  }
  
  async function setDepartmentList() {
   const data = await metMuseumService.fetchAllDeparmentsList();
   setDepartments(data.departments);
  }

  function checkImageDataCorrect(data) {
    return data.primaryImage !== "";
  }

  async function handleFetchArt(artList) {
    let data;
      const randomIndex = Math.floor(Math.random() * artList.length);
      const randomElement = artList[randomIndex];
      data = await metMuseumService.fetchDataById(randomElement);
    return data;
  }

  async function getArtListFromDepartment(departmentId) {
    const artFromDep =  await metMuseumService.fetchSingleDepartmentData(departmentId);
    const artIds = artFromDep.objectIDs;
    return artIds;
  }

  async function continuousFetchArt() {
    setIsFav(false)
    let isDataCorrect = false;
    let data;
    while (!isDataCorrect) {
      data = await handleFetchArt(artList);
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty('primaryImage')) { isDataCorrect = checkImageDataCorrect(data) }
    }
    setArt(data);
  }


  const removeFavorite = (deleteArt) => {
    const filteredFavs = favorites.filter((fav) => fav.objectID !== deleteArt.objectID)
    setFavorites(filteredFavs);
  }

  const handleFavorites = (addArt) => {
    let isValidFavorite = true;
    for (let i = 0; i < favorites.length; i++) {
      if ((art.objectID === undefined) || (art.objectID === favorites[i].objectID)) {
        isValidFavorite = false;
      }
    }
    if (isValidFavorite == true) {
      setFavorites([...favorites, art]);
    }
  }

  return (
    <ThemeProvider theme={darkModeTheme}>
      <ArtContext.Provider value={art}>
        <Header onThemeChange={setThemeMode} themeMode={themeMode} />
        <Switch>
          <Route exact path="/">
            <div className="card" style={{
              paddingBottom: 10, paddingTop: 5, margin: "auto",
              display: "flex", alignItems: "center",
              justifyContent: "center",
            }}>
              <button onClick={() => {
                setArt(continuousFetchArt)
              }}>
                More Art
              </button>
            </div>

            <div style={{
              margin: "auto",
              display: "flex", alignItems: "",
              justifyContent: "flex-end", width: "500px",
            }}>
              <DepartmentList departments={departments} activeDepartment={activeDepartment} setActiveDepartment={setActiveDepartment} 
              getArtListFromDepartment={getArtListFromDepartment} setArtList={setArtList}/>
              <ArtCard setIsFav={setIsFav} isFav={isFav} onFavorite={handleFavorites} onRemove={removeFavorite} />
            </div>
          </Route>
          <FavoritesContext.Provider value={favorites}>
            <Route exact path="/favorites" >
              <FavoriteList onDelete={removeFavorite} />
            </Route>
          </FavoritesContext.Provider>
        </Switch>
      </ArtContext.Provider>
    </ThemeProvider>
  )
}


