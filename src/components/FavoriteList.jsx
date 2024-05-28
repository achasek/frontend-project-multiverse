import React, { useContext } from 'react'
import { FavoriteCard } from './FavoriteCard';
import { FavoritesContext } from '../Contexts';

function FavoriteList({ onDelete, setFavorites }) {

    const favorites = useContext(FavoritesContext)


    return (
        <div style={{  display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', marginToP: 20 }}>
            {favorites.map((favorite, index) => {
                return (
            <div key={index} style={{ width: '200px', height:'500px', margin: "1rem",}}>
                    <FavoriteCard onDelete={onDelete} favorite={favorite} setFavorites={setFavorites} />
            </div>)
})}
        </div>
    )
}

export default FavoriteList;
