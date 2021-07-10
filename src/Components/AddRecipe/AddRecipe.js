import React, {useEffect, useState} from 'react';
import {TextField, Button, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { v4 } from "uuid";
// import  moment  from "moment";
import { connect } from 'react-redux';
import { CreateRecipe, ModifyRecipe , GetActiveRecipe} from "../../Store/Action"

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginBottom: "2rem"
    },
    textfields: {
        width: "100%",
        marginBottom: "1rem"
    },
    buttonSpace: {
        marginLeft: "1rem"
    }
  }));

function AddRecipe(props) {
    const classes = useStyles();
    const initialState = {
        dish: '',
        chef: '',
        ingredients: '',
        description: '',
        image: ''
    }

    const [state, setstate] = useState(initialState);

    useEffect(() => {
        if(props.activerecipe){
            let recipe = {...props.activerecipe};
            recipe.ingredients = recipe.ingredientsArray.join();
            delete recipe.ingredientsArray;
            setstate({...recipe})
          }

        return () =>{
            if(props.match.url === '/addrecipe'){
                setstate({dish:'',chef:'', image:'', ingredients:'', description: ''})
            }
        }  
    }, [props])


    const SubmitRecipeHandler = (e) => {
        e.preventDefault();

        if( state.dish.trim() === '' ||
            state.chef.trim() === '' ||
            state.ingredients.trim() === '' ||
            state.description.trim() === '' ||
            state.image.trim() === '' ){
                alert('No Input fileds is empty')
            }else{
                const {id, dish,chef, ingredients, description, image} = state;
                if(props.match.url === '/addrecipe'){
                    const Recipe = {dish,chef, description, image };
                    // Recipe.id = v4();    
                    // Recipe.date = moment().format('LLLL');
                    // Recipe.ingredientsArray = ingredients.split(",");
                    Recipe.ingredientsArray = ingredients;
                    props.CreateRecipe(Recipe);
                    props.history.push('/');
                }else{
                    const Recipe = {dish,chef, description, image };
                    // const Recipe = {dish,chef, description, image, ingredients };
                    // Recipe.ingredientsArray = ingredients.split(",");
                    Recipe.ingredientsArray = ingredients;  // have to solve
                    props.ModifyRecipe(id,Recipe);
                    props.history.goBack();
                }
            }
    }


    const ChangeHandler = (e) =>{
        e.persist();
        setstate(prevstate => ({...prevstate,[e.target.name]: e.target.value.trim()}));
    }
 
    return (
        <Grid container className={classes.root}>
        <Grid item sm={2}></Grid>
        <Grid container item sm={8}>
            <form onSubmit= {SubmitRecipeHandler} >

                <TextField
                    name="dish"
                    className={classes.textfields}
                    color="secondary"
                    label="Recipe Name" 
                    variant="outlined" 
                    onChange= {ChangeHandler}
                    value= {state.dish}
                />
                <TextField
                    name="chef"
                    className={classes.textfields}
                    color="secondary"
                    label="Chef Name" 
                    variant="outlined" 
                    onChange= {ChangeHandler}
                    value= {state.chef}
                />
                <TextField
                    name="ingredients"
                    className={classes.textfields}
                    color="secondary"
                    label="Recipe Ingredients" 
                    variant="outlined" 
                    onChange= {ChangeHandler}
                    value= {state.ingredients}   // or {state.ingredientsArray} also works fine
                />
                <TextField
                    name="image"
                    className={classes.textfields}
                    color="secondary"
                    label="Recipe Image URL" 
                    type="url"
                    variant="outlined" 
                    onChange= {ChangeHandler}
                    value= {state.image}
                />
                <TextField
                    name="description"
                    className={classes.textfields}
                    color="secondary"
                    label="Recipe Descripton" 
                    variant="outlined"
                    onChange= {ChangeHandler} 
                    value= {state.description}
                />
                <Button 
                    type= "submit"
                    variant="contained" 
                    color="secondary">Save Recipe</Button>
                <Button 
                    onClick= {() => props.history.goBack()}
                    className={classes.buttonSpace} 
                    variant="contained" 
                    color="primary">Back
                </Button>

            </form>
        </Grid>
        <Grid item sm={2}></Grid>

        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
       activerecipe : state.RecipeReducer.activerecipe
    }
}

const mapDispatchToProps = {
    GetActiveRecipe,
    CreateRecipe,
    ModifyRecipe
}

export default connect(mapStateToProps,mapDispatchToProps)(AddRecipe);
