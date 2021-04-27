import {
  REORDER_LIST,
  ADD_COLUMN,
  REORDER_CARD,
  SET_CURRENT_BOARD_LISTS,
  SET_CURRENT_CARDS,
  EDIT_COLUMN_TITLE,
} from "./actionTypes";
import axios from "../../axios-users";
import uuid from "uuid";

export const reorderCard = (payload) => {
  return async (dispatch) => {
    const { destination, draggableId, source, columns } = payload;
    const startList = columns.columns[source.droppableId];
    const finishList = columns.columns[destination.droppableId];

    if (startList === finishList) {
      const newCardIds = Array.from(startList.todoIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newSameColumnList = {
        ...columns.columns[source.droppableId],
        todoIds: newCardIds,
      };

      dispatch({
        type: REORDER_CARD,
        payload: { newSameColumnList },
      });

      const res = await axios.post("/todos/reorder/samecolumn", {
        sameColumnId: source.droppableId,
        samecolumnCardIds: newCardIds,
      });
      console.log(res.data);
      return;
    }

    // moving from one list to another list
    const removedCardIds = Array.from(startList.todoIds);
    const addedCardIds = Array.from(finishList.todoIds);
    removedCardIds.splice(source.index, 1);
    addedCardIds.splice(destination.index, 0, draggableId);

    const newDifferentColumnsList = {
      [source.droppableId]: {
        ...columns.columns[source.droppableId],
        todoIds: removedCardIds,
      },
      [destination.droppableId]: {
        ...columns.columns[destination.droppableId],
        todoIds: addedCardIds,
      },
    };
    dispatch({
      type: REORDER_CARD,
      payload: { newDifferentColumnsList },
    });

    const res = await axios.post("/cards/reorder/differentcolumn", {
      removedColumnId: source.droppableId,
      addedColumnId: destination.droppableId,
      removedColumnCardIds: removedCardIds,
      addedColumnCardIds: addedCardIds,
    });

    console.log(res.data);

    return;
  };
};

export const reorderList = (columnPayload, columnId) => {
  const { destination, source, draggableId, columnOrder } = columnPayload;
  const newColumnOrder = Array.from(columnOrder);
  newColumnOrder.splice(source.index, 1);
  newColumnOrder.splice(destination.index, 0, draggableId);

  return async (dispatch) => {
    dispatch({
      type: REORDER_LIST,
      payload: newColumnOrder,
    });

    const res = await axios.patch('/', {
      columnId,
      newColumnOrder,
    });
    console.log(res.data);
    return;
  };
};

export const getAllLists = () => {
  return async (dispatch) => {
    const res = await axios.get(`/columns/all`);

    const { column } = res.data;
    console.log(res.data);
    const columnOrder = column.title;

    dispatch({
      type: SET_CURRENT_BOARD_LISTS,
      payload: {
        column,
        columnOrder,
      },
    });
  };
};

export const getAllCards = (columnIds) => {
  return (dispatch) => {
    if (columnIds.length === 0) {
      return dispatch({
        type: SET_CURRENT_CARDS,
        payload: {
          cards: [],
        },
      });
    }
    axios
      .post(`/todos/getAll`, { columnIds })
      .then((res) => {
        console.log(res.data.cards);
        dispatch({ type: SET_CURRENT_CARDS, payload: res.data.cards });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editColumnTitle = (editedTitle, columnId) => {
  return (dispatch) => {
    axios
      .post(`/columns/${columnId}?title=true`, { title: editedTitle })
      .then((res) => {
        dispatch({
          type: EDIT_COLUMN_TITLE,
          payload: { editedTitle, columnId },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const addColumn = (columnId, columnTitle, todoIds = []) => {
  return async (dispatch) => {
    if (columnId && columnTitle) {
      const columnId = uuid();
      const payload = {
        title: columnTitle,
        todoIds,
        columnId /* i want to use id from frontend, i will create a field 'columnId' in column Model*/,
      };
      dispatch({
        type: ADD_COLUMN,
        payload: {
          ...payload,
        },
      });

      const res = await axios.post("/colums/create", {
        ...payload,
      });
      console.log(res.data);
    }
  };
};
