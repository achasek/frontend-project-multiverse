import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const ArtCard = (props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.art.primaryImage || "https://upload.wikimedia.org/wikipedia/commons/5/59/Monet_-_Impression%2C_Sunrise.jpg"}
        title="random art"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.art.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.art.department}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Favorite</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
