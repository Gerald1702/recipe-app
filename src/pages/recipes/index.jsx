import { Card, CardContent, CardMedia, Container, Grid, TextField, Typography, CardActionArea } from "@mui/material";
import { useEffect, useState } from "react";


export default function Recipes() {
    const [recipes, setRecipes] = useState([]);

    const getRecipes = () => {
        // prepare URL
        const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
        url.searchParams.append('apiKey', '3a4c80e3196048f1b8f0f9805bccd813');
        // fetch recipes from API

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // update the recipes state
              setRecipes(data.results);
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(getRecipes, []);


    return (
        <Container sx={{ my: '2rem' }}>
            <TextField
                fullWidth
                id="outlined-basic"
                label="Enter a keyword to search recipes and hit Enter"
                variant="outlined" />

            <Grid sx={{ mt: '1rem' }} container spacing={3}>
                {recipes.map(recipe => (<Grid key={recipe.id} item xs={4}>
                    <Card sx={{ maxWidth: 345, height:"100%"}}>
                        <CardActionArea sx={{height: "100%"}}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={recipe.image}
                                alt={recipe.title}
                            />
                            <CardContent sx={{height:"100"}}>
                                <Typography gutterBottom variant="h5" component="div">
                                   {recipe.title}
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>))}
            </Grid>
        </Container>
    );

}