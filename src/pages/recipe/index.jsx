import { useParams } from "react-router-dom";
import useSWR from "swr";
import loadingIcon from "../../asset/images/bouncing-squares.svg";
import { Container } from "@mui/material";

const getRecipe = (...args) => {
  console.log(args);
  // prepare URL
  const url = new URL(args[0]);
  url.searchParams.append('apiKey', process.env.REACT_APP_SPOONACULAR_API_KEY);
  // fetch and return recipe
  return fetch(url).then(response => response.json())
}

export default function Recipe() {
  const { id } = useParams();
  const { data, isLoading } = useSWR(`https://api.spoonacular.com/recipes/${id}/information`, getRecipe);
  // console.log(data, isLoading);


  return (
    <>
      {isLoading ? <img src={loadingIcon} /> : (
        <Container>
          <h1>{data.title}</h1>
          <div>{data.summary}</div>
          <div dangerouslySetInnerHTML={{ __html: data.summary }} />
          <img src={data.image} />

        </Container>
      )}
    </>
  );
}
