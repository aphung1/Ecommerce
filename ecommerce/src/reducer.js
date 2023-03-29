export const initialState = {
    basket: [],
    user: "",
    basket_count: 0
  };
  
  // Selector
  export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => Number(item.price) * Number(item.quantity) + amount, 0);

  const reducer = (state, action) => {
    console.log(state.basket)
    switch (action.type) {
        case "ADD_TO_BASKET":
            const index = state.basket.findIndex((product) => product.id==action.item.id);
            if (index == -1) {
              return {...state, basket: [...state.basket, action.item], basket_count: state.basket_count+1}
            } else {
              const newBasket = [...state.basket];
              newBasket[index] = {...newBasket[index], quantity: newBasket[index].quantity+1}
              return {...state, basket: newBasket, basket_count: state.basket_count+1}
            }
        case "CHANGE_ITEM_QUANTITY":
          const productIndex = state.basket.findIndex((product) => product.id==action.item.id);
          if (productIndex == -1) {
            return state
          } else {
            const newBasket = [...state.basket];
            const oldQuantity = state.basket[productIndex].quantity
            if (action.item.quantity == 0) {
              newBasket.splice(productIndex, 1);
            } else {
              newBasket[productIndex] = {...newBasket[productIndex], quantity: Number(action.item.quantity)}
            }
            return {...state, basket: newBasket, basket_count: state.basket_count - Number(oldQuantity) + Number(action.item.quantity)}
          }
          case "CHANGE_USER":
            return {...state, user: action.id}
      default:
        console.log("defualt")
        return state;
    }
  };
  
  export default reducer;