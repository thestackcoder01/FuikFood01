import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      padding: "10px 1.5rem"
    },
    imageSpace: {
      marginRight: '1rem'
    }
  }));

function SingleRecipe(props) {
  
    const classes = useStyles();
    const { dish, description, image, id} = props.recipe;
    const history = useHistory();

    return (
        <div>
        <Button
        onClick = { () => history.push(`/recipeinfo/${id}`)}
        variant="contained"
        color="secondary"
        className={classes.button}
        title={description}>
         <img className={classes.imageSpace} height={50} src={image} alt={dish} />
         {dish}
        </Button>
        </div>
    )
}

export default SingleRecipe;
