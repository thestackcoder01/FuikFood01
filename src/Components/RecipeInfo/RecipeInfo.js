import React, { useEffect, useState } from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, CardMedia } from '@material-ui/core';
import AddRecipe from '../AddRecipe/AddRecipe'; 
import DetailRecipe from '../RecipeInfo/RecipeDetail/RecipeDetail'
import { connect } from 'react-redux';
import { GetActiveRecipe, RemoveActiveRecipe } from "../../Store/Action";


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
  
  cover: {
    width: "50%",
  },
  
}));

function RecipeInfo(props) {
  const classes = useStyles();

   const [state, setstate] = useState({
     image: '',
     dish: ''
   });

  useEffect(() => {
    if(props.activerecipe === null){
      setTimeout(() => {
        props.GetActiveRecipe(props.match.params.id);
      }, 1500);
    }else{
      setstate({...props.activerecipe})
    }

    return () => {
      if(props.activerecipe){
        props.RemoveActiveRecipe();
      }
    }
  }, [props]);
 

  return (
    <Paper elevation={3} className={classes.root}>
    <CardMedia
        className={classes.cover}
        image={state.image}
        src = "Time lagta h" // err solve
        title={state.dish} 
      />
      <div className={classes.details}>

 
              <Switch>
               <Route exact path={'/recipeinfo/:id'} component={DetailRecipe} />
               <Route exact path={'/recipeinfo/:id/edit'} component={AddRecipe} />
               <Redirect from='/recipeinfo' to='/recipeinfo/:id' />
             </Switch>

        </div>
    </Paper>
  );
}

const mapStateToProps = state => {
  return{
    activerecipe : state.RecipeReducer.activerecipe
  }
}

const mapDispatchToProps =  ({
  GetActiveRecipe,
  RemoveActiveRecipe 
})

export default  connect(mapStateToProps, mapDispatchToProps)(RecipeInfo);