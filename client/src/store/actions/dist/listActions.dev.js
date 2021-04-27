"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addColumn = exports.editColumnTitle = exports.getAllCards = exports.getAllLists = exports.reorderList = exports.reorderCard = void 0;

var _actionTypes = require("./actionTypes");

var _axiosUsers = _interopRequireDefault(require("../../axios-users"));

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reorderCard = function reorderCard(payload) {
  return function _callee(dispatch) {
    var _newDifferentColumnsL;

    var destination, draggableId, source, columns, startList, finishList, newCardIds, newSameColumnList, _res, removedCardIds, addedCardIds, newDifferentColumnsList, res;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            destination = payload.destination, draggableId = payload.draggableId, source = payload.source, columns = payload.columns;
            startList = columns.columns[source.droppableId];
            finishList = columns.columns[destination.droppableId];

            if (!(startList === finishList)) {
              _context.next = 14;
              break;
            }

            newCardIds = Array.from(startList.todoIds);
            newCardIds.splice(source.index, 1);
            newCardIds.splice(destination.index, 0, draggableId);
            newSameColumnList = _objectSpread({}, columns.columns[source.droppableId], {
              todoIds: newCardIds
            });
            dispatch({
              type: _actionTypes.REORDER_CARD,
              payload: {
                newSameColumnList: newSameColumnList
              }
            });
            _context.next = 11;
            return regeneratorRuntime.awrap(_axiosUsers["default"].post("/todos/reorder/samecolumn", {
              sameColumnId: source.droppableId,
              samecolumnCardIds: newCardIds
            }));

          case 11:
            _res = _context.sent;
            console.log(_res.data);
            return _context.abrupt("return");

          case 14:
            // moving from one list to another list
            removedCardIds = Array.from(startList.todoIds);
            addedCardIds = Array.from(finishList.todoIds);
            removedCardIds.splice(source.index, 1);
            addedCardIds.splice(destination.index, 0, draggableId);
            newDifferentColumnsList = (_newDifferentColumnsL = {}, _defineProperty(_newDifferentColumnsL, source.droppableId, _objectSpread({}, columns.columns[source.droppableId], {
              todoIds: removedCardIds
            })), _defineProperty(_newDifferentColumnsL, destination.droppableId, _objectSpread({}, columns.columns[destination.droppableId], {
              todoIds: addedCardIds
            })), _newDifferentColumnsL);
            dispatch({
              type: _actionTypes.REORDER_CARD,
              payload: {
                newDifferentColumnsList: newDifferentColumnsList
              }
            });
            _context.next = 22;
            return regeneratorRuntime.awrap(_axiosUsers["default"].post("/cards/reorder/differentcolumn", {
              removedColumnId: source.droppableId,
              addedColumnId: destination.droppableId,
              removedColumnCardIds: removedCardIds,
              addedColumnCardIds: addedCardIds
            }));

          case 22:
            res = _context.sent;
            console.log(res.data);
            return _context.abrupt("return");

          case 25:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.reorderCard = reorderCard;

var reorderList = function reorderList(columnPayload, columnId) {
  var destination = columnPayload.destination,
      source = columnPayload.source,
      draggableId = columnPayload.draggableId,
      columnOrder = columnPayload.columnOrder;
  var newColumnOrder = Array.from(columnOrder);
  newColumnOrder.splice(source.index, 1);
  newColumnOrder.splice(destination.index, 0, draggableId);
  return function _callee2(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch({
              type: _actionTypes.REORDER_LIST,
              payload: newColumnOrder
            });
            _context2.next = 3;
            return regeneratorRuntime.awrap(_axiosUsers["default"].patch('/', {
              columnId: columnId,
              newColumnOrder: newColumnOrder
            }));

          case 3:
            res = _context2.sent;
            console.log(res.data);
            return _context2.abrupt("return");

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.reorderList = reorderList;

var getAllLists = function getAllLists() {
  return function _callee3(dispatch) {
    var res, column, columnOrder;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(_axiosUsers["default"].get("/columns/all"));

          case 2:
            res = _context3.sent;
            column = res.data.column;
            console.log(res.data);
            columnOrder = column.title;
            dispatch({
              type: _actionTypes.SET_CURRENT_BOARD_LISTS,
              payload: {
                column: column,
                columnOrder: columnOrder
              }
            });

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

exports.getAllLists = getAllLists;

var getAllCards = function getAllCards(columnIds) {
  return function (dispatch) {
    if (columnIds.length === 0) {
      return dispatch({
        type: _actionTypes.SET_CURRENT_CARDS,
        payload: {
          cards: []
        }
      });
    }

    _axiosUsers["default"].post("/todos/getAll", {
      columnIds: columnIds
    }).then(function (res) {
      console.log(res.data.cards);
      dispatch({
        type: _actionTypes.SET_CURRENT_CARDS,
        payload: res.data.cards
      });
    })["catch"](function (err) {
      console.log(err);
    });
  };
};

exports.getAllCards = getAllCards;

var editColumnTitle = function editColumnTitle(editedTitle, columnId) {
  return function (dispatch) {
    _axiosUsers["default"].post("/columns/".concat(columnId, "?title=true"), {
      title: editedTitle
    }).then(function (res) {
      dispatch({
        type: _actionTypes.EDIT_COLUMN_TITLE,
        payload: {
          editedTitle: editedTitle,
          columnId: columnId
        }
      });
    })["catch"](function (err) {
      return console.log(err);
    });
  };
};

exports.editColumnTitle = editColumnTitle;

var addColumn = function addColumn(columnId, columnTitle) {
  var todoIds = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  return function _callee4(dispatch) {
    var _columnId, payload, res;

    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(columnId && columnTitle)) {
              _context4.next = 8;
              break;
            }

            _columnId = (0, _uuid["default"])();
            payload = {
              title: columnTitle,
              todoIds: todoIds,
              columnId: _columnId
              /* i want to use id from frontend, i will create a field 'columnId' in column Model*/

            };
            dispatch({
              type: _actionTypes.ADD_COLUMN,
              payload: _objectSpread({}, payload)
            });
            _context4.next = 6;
            return regeneratorRuntime.awrap(_axiosUsers["default"].post("/colums/create", _objectSpread({}, payload)));

          case 6:
            res = _context4.sent;
            console.log(res.data);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    });
  };
};

exports.addColumn = addColumn;