import { ACTIVE_RECIPE, GET_RECIPE, REMOVE_ACTIVE_RECIPE } from '../ActionTypes/ActionTypes';

const initialstate = {
    recipies: [{id: 'sjkdlgakhddsasb42rw', date:'Aug 19 2020', dish: 'Mint Mojito', chef: 'Ayush', ingredientsArray: ['mint', 'water', 'mojito paste', 'pudina'],
    description: 'Mint Mojito is so relaxing juice dgfdg rrrrrrrrr rg', image:'https://cdn.theliveinkitchen.com/wp-content/uploads/2020/07/28211641/Mojito-Mocktail-The-Live-In-Kitchen-Featured.jpg'},
   {id: 'sjkdlgak07sf7ddsasb42rw', date:'July 20 2020', dish: 'Panner Khulcha', chef: 'Sagar', ingredientsArray: ['paneer', 'maida', 'butter', 'water'],
     description: 'Mint Mojito is so relaxing juice dsggdg fffffffff gggg', image:'https://i.ytimg.com/vi/4f8hhwBRMJw/maxresdefault.jpg' },
   {id: 'hlds986dlgakhddsasb42rw', date:'March 19 2020', dish: 'Masala Dosa', chef: 'Shakti', ingredientsArray: ['sambhar', 'kadhi patta', 'urd daal', 'badaam'],
    description: 'Mint Mojito is so relaxing juice dsblks dvsoihhosa hsdois', image: 'https://static.toiimg.com/photo/63841432.cms'}
 ],
   activerecipe : null
}

const RecipeReducer = (state = initialstate, action) => {
    switch (action.type){

        case GET_RECIPE :
            const APIdata = action.payload.map(r => {
               return {
                ...r,
                id : r._id,
                date: String(r.createdAt),
                dish : r.dish,
                chef: r.chef,
                description: r.description,
                ingredientsArray: r.ingredientsArray,
                image: r.image
               }  

            })
            return {
                ...state,
                recipies :APIdata 
                } 

        case ACTIVE_RECIPE :
            return {
                ...state,
                activerecipe: state.recipies.find(r => r.id === action.payload)
                }    
        case REMOVE_ACTIVE_RECIPE :
             return {
                 ...state,
                 activerecipe: null
                  } 

        
          // No longer needed!

         // case REMOVE_RECIPE :
        //     const orignalRecipeData = [...state.recipies];
        //     const filterRecipeData = orignalRecipeData.filter(r => r.id !== action.payload);
        //      return {
        //          ...state,
        //          recipies: filterRecipeData
        //           }

    //     case CREATE_RECIPE :
    //         let ExistingRecipeData = [...state.recipies];
    //         ExistingRecipeData.push(action.payload);
            
    //         return {
    //              ...state,
    //             recipies: ExistingRecipeData
    //                }
    //     case MODIFY_RECIPE :
    //             const MRD = [...state.recipies];
    //             const MRDIndex = MRD.findIndex(r => r.id === action.payload.id);
    //             MRD[MRDIndex]  = action.payload;
    //         return {
    //             ...state,
    //             recipies: MRD
    //            }                                               
        default :
           return state;
    }
}

export default RecipeReducer;