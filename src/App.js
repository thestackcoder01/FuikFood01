import React, { Component } from 'react';
import './App.css';

import { Redirect, Route,Switch, withRouter} from 'react-router-dom';

import {GetRecipies} from './Store/Action';

import { Grid, Typography } from '@material-ui/core';
import CardRecipe from './Components/CardRecipe/CardRecipe';
import ListRecipe from './Components/ListRecipe/ListRecipe';
import AddRecipe from './Components/AddRecipe/AddRecipe';
import RecipeInfo from './Components/RecipeInfo/RecipeInfo';
import Header from './Components/Header/Header';
import {connect} from 'react-redux';


class App extends Component {

  // state = {
  //   recipies: [
  //     {date: 'August 19, 2020 11:49:09 AM', dish: 'Mint Mojito', chef: 'nikhil', ingredientsArray:['mint', 'water', 'mojito paste', 'pudina leaf'], description: 'The Mint Mojito is so relaxing while people are stressed out, it provides positive vive while having.', image: 'https://data.thefeedfeed.com/recommended/post_3966940.jpeg'},
  //     {date: 'August 20, 2020 11:39:45 AM', dish: 'Paneer Pakoda', chef: 'khushi', ingredientsArray:['paneer', 'besan', 'spices', 'oil'], description: 'The Paneer Pakoda is an Indian spicy and crispy dish which is made of paneer inside the basen, it is kind of tasty.', image: 'https://www.manjulaskitchen.com/wp-content/uploads/paneer_pakoras.jpg'}
  //   ]
  // }

   componentDidMount(){
     this.props.GetRecipies();
   }

  render() {
    
    let isGrid = "row";
    if(this.props.location.pathname === '/listrecipe'){
      isGrid = "column";
    }
    
    return (
      <>
        <Header />

        <Grid container>
          <Grid item sm={1}></Grid>
          <Grid 
            // direction={ isGrid ? "row" : "column"} 
            direction = {isGrid}
            container item sm={10}>

              <Switch>
                <Route path="/cardrecipe" component={CardRecipe} />
                <Route path="/addrecipe" component={AddRecipe} />
                <Route path="/listrecipe" component={ListRecipe} />
                <Route path="/recipeinfo/:id" component={RecipeInfo} />
                <Redirect from="/" to="/cardrecipe" />

              </Switch>
              
              

          </Grid>
          <Grid item sm={1}></Grid>
        </Grid>

        <Typography align="center" className="footer">Made with <span>❤</span> in Sheryians.</Typography>
      </>
    );
  }
}

const mapDispatchToProps = ({
  GetRecipies
})

export default connect(null,mapDispatchToProps) (withRouter(App));