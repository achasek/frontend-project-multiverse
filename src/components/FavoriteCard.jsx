import { useContext, useState } from 'react';
import { ArtContext, FavoritesContext, isFavoriteContext } from '../Contexts';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export const FavoriteCard = ({ setFavorites, favorite, onDelete }) => {
    const art = favorite
    const isFavorited = useContext(isFavoriteContext)


    const handleDelete = (art) => {
        console.log('to remove', art.id)
        onDelete(art)
    }

    return (
        <Card sx={{ maxWidth: 345, }}>
            <CardMedia
                sx={{ height: 140 }}
                image={art.primaryImage || "https://upload.wikimedia.org/wikipedia/commons/5/59/Monet_-_Impression%2C_Sunrise.jpg"}
                title="random art"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {art.title}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton onClick={() => handleDelete(art)}>
                    <FavoriteIcon />
                </IconButton>
            </CardActions>
            {/* <Button size="small" onClick={() => handleDelete(art)}>Remove</Button> */}
        </Card>
    );
}
