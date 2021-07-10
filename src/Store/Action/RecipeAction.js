import {ACTIVE_RECIPE,GET_RECIPE, REMOVE_ACTIVE_RECIPE} from '../ActionTypes/ActionTypes';
import axios from '../../utils/axios';

export const GetRecipies = () => dispatch =>{
    axios.get('/recipe/read')
     .then(response => {
         return dispatch({
            type: GET_RECIPE,
            payload: response.data.recipies
         })
     })
     .catch(err => console.log(err));
}

export const CreateRecipe = (recipe) => dispatch =>{
    axios.post('/recipe/create', {...recipe})
    .then(response => {
        return dispatch(GetRecipies());
    })
    .catch(err => console.log(err.response))
    // .catch(err => alert(err.response.data.error.map(message => message)))
} 

export const ModifyRecipe = (id, recipe) => dispatch =>{
    axios.patch(`/recipe/update/${id}`, {...recipe})
    .then(response => {
        return dispatch(GetRecipies());
    })
    .catch(err => console.log(err.response))

    // return {
    //     type: MODIFY_RECIPE,
    //     payload: recipe
    //     }
    }     
    
export const GetActiveRecipe = (id) => {
    return {
        type: ACTIVE_RECIPE,
        payload: id
    }
}

export const RemoveActiveRecipe = () => {
    return {
        type: REMOVE_ACTIVE_RECIPE,
    }
}

export const RemoveRecipe = (id) => dispatch =>{
    axios.delete(`/recipe/delete/${id}`)
    .then(response => { 
        return dispatch(GetRecipies());
    })
    .catch(err => console.log(err.response))

    // return {
    //     type: REMOVE_RECIPE,
    //     payload: id
    // }
} 
              
