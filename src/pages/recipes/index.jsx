import { Card, CardContent, CardMedia, Container, Grid, TextField, Typography, CardActionArea } from "@mui/material";
import { useEffect, useState } from "react";
import emptyIcon from "../../asset/images/undraw_empty_re_opql.svg";
import "./main.css"
import loadingIcon from "../../asset/images/bouncing-squares.svg"
import { Link } from "react-router-dom";


export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [keyword, setKeyword] = useState(""); 
    const [loading, setLoading] = useState(false)


    const getRecipes = () => {
        setLoading(true);
        // prepare URL
        const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
        url.searchParams.append('apiKey', process.env.REACT_APP_SPOONACULAR_API_KEY);
        url.searchParams.append('query', keyword);
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

            .finally(() => setLoading(false))
    }

    useEffect(getRecipes, [keyword]);


    return (
        <Container sx={{ my: '2rem' }}>
            <TextField
                fullWidth
                id="outlined-basic"
                label="Enter a keyword to search recipes and hit Enter"
                variant="outlined"
                onKeyDown={event => event.key=== 'Enter' &&
                setKeyword(event.target.value)} />

            <Grid sx={{ mt: '1rem' }} container spacing={3}>
                {loading ? <img src={loadingIcon}/> : recipes.length > 0 ? recipes.map(recipe => (<Grid key={recipe.id} item xs={4}>
                    <Card sx={{ maxWidth: 345, height:"100%"}}>
                        <CardActionArea sx={{height: "100%"}}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={recipe.image}
                                alt={recipe.title}
                            />
                            <CardContent sx={{height: "100"}}>
                               <Link to={`/recipes/${recipe.id}`}>
                               <Typography gutterBottom variant="h5" component="div">
                                   {recipe.title}
                                </Typography>
                               </Link>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>)) : <img src={emptyIcon} width="50%" className="emptyIcon"/>}
            </Grid>
        </Container>
    );

}