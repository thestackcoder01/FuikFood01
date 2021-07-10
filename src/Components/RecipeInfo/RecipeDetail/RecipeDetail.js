import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, CardContent, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { RemoveRecipe } from "../../../Store/Action";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: "100%",
    minHeight: '500px',
    marginBottom: "2rem"
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: "50%"
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: "50%",
  },
  buttons: {
    marginTop: "2rem",
    textAlign: "right",
    '& > *': {
        margin: theme.spacing(1),
      },
  },
  ingredients: {
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "rgba(245, 0, 87, .05)"

  },
  ingButtons: {
      marginTop: "1rem",
    '& > *': {
        margin: theme.spacing(1),
      },
  },
  addrecipe: {
      padding: "1rem",
      height: "100%",
      display: "flex",
      flexDirection: 'column',
      alignItems: "center"
  }, 
  linkstyle: {
    textDecoration: 'none',
    color: '#fff'
  }
}));

function RecipeInfo(props) {
  const classes = useStyles();

  const [state, setstate] = useState({
    date: '', 
    dish:'', 
    chef: '',
    description:'', 
    ingredientsArray:[],
    id:''
  });

 useEffect(() => {
   if(props.activerecipe){
        setstate({...props.activerecipe})
   }
 }, [props]);

  const random = () => Math.floor(Math.random()*3);
  const badgeColor = [ 'primary', 'secondary', 'default'];
  const badgeVarient = [ 'outlined', 'contained', 'text'];
  const ingredientBadges = state.ingredientsArray.map( ingredient => (
    <Button key={ingredient} variant={badgeVarient[random()]} color={badgeColor[random()]}>{ingredient}</Button>
  ) ); 

   const deleteHandler = async () =>{      // async - used bcz to execute code line by line
      await props.RemoveRecipe(state.id);
      props.history.push('/');
   }

  //  console.log(state);

  return (
  
      <CardContent className={classes.content}>
      <Typography component="h3" variant="h3">{state.dish}</Typography>
      <Typography variant="subtitle1" color="textSecondary">{state.chef}</Typography>
      <Typography variant="subtitle2" color="textSecondary">{state.date}</Typography>
      <br />
      <Typography variant="body1" color="textSecondary">{state.description}</Typography>

      <Paper elevation={3} className={classes.ingredients}>
      <Typography component="h4" variant="h4"> 
        <span role="img" aria-label="ingredient" aria-labelledby="jsx-a11y/accessible-emoji">🍝</span>
        Ingredients
        <div className={classes.ingButtons}>{ingredientBadges}</div>        
      </Typography>

      </Paper>

    <div className={classes.buttons}>
    <Button 
      onClick= {() => props.history.push(`/recipeinfo/${props.match.params.id}/edit`)}
    variant="contained" color="primary">      
    Edit
    </Button>
    <Button 
      onClick = {deleteHandler}
      variant="contained" color="secondary">Delete</Button>
    <Button 
    onClick= {() => props.history.goBack()}
    variant="contained">Back</Button>
    </div>
    </CardContent>
  );
}
const mapStateToProps = state => {
  return{
    activerecipe : state.RecipeReducer.activerecipe
  }
}

const mapDispatchToProps =  ({
  RemoveRecipe
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeInfo);
