import axios from "../../axios-users";
import { ADD_CARD, EDIT_CARD_TITLE, DELETE_CARD_TITLE } from "./actionTypes";
import uuid from "uuid";

export const editCardTitle = (editedCardTitle, todoId) => {
  return (dispatch) => {
    axios
      .post(`/todos/update/${todoId}`, { title: editedCardTitle })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: EDIT_CARD_TITLE,
          payload: { editedCardTitle, todoId },
        });
      })
      .catch((err) => console.log(err.response.data));
  };
};

export const deleteCard = (todoId) => {
  return (dispatch) => {
    axios
      .post(`/todos/delete/${todoId}`, { todoId })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: DELETE_CARD_TITLE,
          payload: { todoId },
        });
      })
      .catch((err) => console.log(err.response.data));
  };
};

export const addCard = (newCardTitle, columnId) => {
  return async (dispatch) => {
    const payload = {
      title: newCardTitle,
      cardId: uuid(),
      columnId,
    };
    console.log(payload);

    dispatch({
      type: ADD_CARD,
      payload: { ...payload },
    });

    const res = await axios.post(`/todos/create`, { ...payload });
    console.log(res.data);
  };
};
