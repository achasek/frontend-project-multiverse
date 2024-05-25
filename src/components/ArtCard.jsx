import { useContext, useState } from 'react';
import { ArtContext, FavoritesContext, isFavoriteContext } from '../Contexts';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';

export const ArtCard = ({ onFavorite, setIsFav, isFav }) => {
  const art = useContext(ArtContext)
  const favorites = useContext(FavoritesContext)
  const isFavorited = useContext(isFavoriteContext)




  const handleFavorite = (addArt) => {
    // console.log(art.objectID)
    if (isFav === true) {
      console.log("is true")
      setIsFav(false)

    }
    if (isFav === false) {
      onFavorite(art)
      setIsFav(true)

    }
  }
  console.log(favorites)

  return (
    <Card sx={{ minWidth: 500 }}>
      <CardMedia
        sx={{ height: 500 }}
        image={art.primaryImage || "https://upload.wikimedia.org/wikipedia/commons/5/59/Monet_-_Impression%2C_Sunrise.jpg"}
        title="random art"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {art.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {art.department}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => handleFavorite(art)}>
          {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <a href={art.objectWikidata_URL || art.objectURL} target='blank'>
            <Button size="small">Learn More</Button>
          </a>
        </div>
      </CardActions>
    </Card>
  );
}
