import {
  ADD_CARD,
  EDIT_CARD_TITLE,
  SET_CURRENT_CARDS,
  DELETE_CARD_TITLE,
} from "../actions/actionTypes";

const initialState = {
  cards: null,
};
/*
 * cards state structure
 * cards:{
 *       cards:[
 *       {id:{id,content}},
 *
 *       ] (this is very stupid but lot of refactoring needs to be done to change)
 * }
 * */

const flatten = function(arr) {
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    out.push.apply(out, Array.isArray(arr[i]) ? flatten(arr[i]) : [arr[i]]);
  }

  return out;
};
const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CARDS: {
      const cards = action.payload;
      const newCards = flatten(cards).reduce((accum, currentValue) => {
        accum[currentValue.todoId] = {
          id: currentValue.todoId,
          content: currentValue.title,
        };
        return accum;
      }, {});

      return { cards: newCards };
    }

    case EDIT_CARD_TITLE: {
      const { editedCardTitle, todoId } = action.payload;
      const editedCard = {
        [state.cards[todoId]]: {
          ...state.cards[todoId],
          title: editedCardTitle,
        },
      };
      return {
        ...state,
        cards: {
          ...state.cards,
          editedCard,
        },
      };
    }

    case ADD_CARD: {
      const { title, todoId } = action.payload;

      return {
        ...state,
        cards: {
          ...state.cards,
          [todoId]: { id: todoId, content: title },
        },
      };
    }

    case DELETE_CARD_TITLE: {
      const { todoId } = action.payload;

      return {
        ...state,
        cards: {
          ...state.cards,
          [todoId]: { id: todoId },
        },
      };
    }

    default:
      return state;
  }
};

export default cardReducer;
