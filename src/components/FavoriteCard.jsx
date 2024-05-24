import { useContext, useState } from 'react';
import { ArtContext, FavoritesContext } from '../Contexts';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export const FavoriteCard = () => {
    const art = useContext(FavoritesContext)
    return (
        <Card sx={{ maxWidth: 345 }}>
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
            <FavoriteIcon />
        </Card>
    );
}
