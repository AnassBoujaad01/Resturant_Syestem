import { createSlice } from '@reduxjs/toolkit';
import {
  generatedID,
  getDate,
  getTime,
  generatedItemID,
  calculateItemCount,
  calculateTotalPrice
} from '../../../higherFunctions/index';

const initialState = {
  displayOrderComponent: false,
  orderList: [],
  currentOrder: null,
  pendingList: [],
  DeleteList: [],
  PaymentList: [],
  CancelList: []
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state) => {
      const newOrder = {
        id: generatedID(),
        itemsList: [],
        detailsOrder: {
          countItems: 0,
          price: 0.00,
          modePayment: 'cash',
          orderType: 'table'
        },
        date: getDate(),
        Time: getTime(),
        isSelected: true
      };
      state.orderList.push(newOrder);
      state.currentOrder = newOrder;
      orderSlice.caseReducers.orderSelect(state, { payload: newOrder.id });
    },
    deleteOrder: (state, action) => {
      const orderID = action.payload;
      if (orderID) {
        const deletedOrder = state.orderList.find(order => order.id === orderID);
        state.orderList = state.orderList.filter(order => order.id !== orderID);
        if (state.currentOrder && state.currentOrder.id === orderID) {
          state.currentOrder = state.orderList.length > 0 ? state.orderList[0] : null;
        }
        if (deletedOrder) {
          state.DeleteList.push(deletedOrder);
        }
      }
    },
    updateOrder: (state, action) => {
      const { orderID, itemsList, orderDetails } = action.payload;
      const orderToUpdate = state.orderList.find(order => order.id === orderID);
      if (orderToUpdate) {
        orderToUpdate.itemsList = itemsList !== undefined ? [...itemsList] : orderToUpdate.itemsList;
        orderToUpdate.detailsOrder = {
          ...orderToUpdate.detailsOrder,
          ...orderDetails,
          countItems: calculateItemCount(orderToUpdate.itemsList),
          price: calculateTotalPrice(orderToUpdate.itemsList)
        };
        if (state.currentOrder && state.currentOrder.id === orderID) {
          state.currentOrder = { ...orderToUpdate };
        }
      }
    },
    setOrder: (state, action) => {},
    addItem: (state, action) => {
      const newItem = { ...action.payload, id: generatedItemID() };
      const orderID = state.currentOrder ? state.currentOrder.id : null;
      if (orderID === null) {
        const newOrder = {
          id: generatedID(),
          itemsList: [newItem],
          detailsOrder: {
            countItems: 1,
            price: newItem.price,
            modePayment: 'cash',
            orderType: 'table'
          },
          isSelected: true
        };
        state.orderList.push(newOrder);
        state.currentOrder = newOrder;
        orderSlice.caseReducers.orderSelect(state, { payload: newOrder.id });
      } else {
        const orderToUpdate = state.orderList.find(order => order.id === orderID);
        orderToUpdate.itemsList.push(newItem);
        orderToUpdate.detailsOrder.countItems = calculateItemCount(orderToUpdate.itemsList);
        orderToUpdate.detailsOrder.price = calculateTotalPrice(orderToUpdate.itemsList);
        if (state.currentOrder && state.currentOrder.id === orderID) {
          state.currentOrder = { ...orderToUpdate };
          orderSlice.caseReducers.orderSelect(state, { payload: orderToUpdate.id });
        }
      }
    },
    deleteItems: (state, action) => {
      const itemID = action.payload;
      const orderID = state.currentOrder.id;
      const orderToUpdate = state.orderList.find(order => order.id === orderID);
      if (orderToUpdate) {
        orderToUpdate.itemsList = orderToUpdate.itemsList.filter(item => item.id !== itemID);
        orderToUpdate.detailsOrder.countItems = calculateItemCount(orderToUpdate.itemsList);
        orderToUpdate.detailsOrder.price = calculateTotalPrice(orderToUpdate.itemsList);
        if (state.currentOrder && state.currentOrder.id === orderID) {
          state.currentOrder = { ...orderToUpdate };
        }
      }
    },
    updateItem: (state, action) => {
      const newItem = action.payload;
      const orderID = state.currentOrder.id;
      const orderToUpdate = state.orderList.find(order => order.id === orderID);
      if (orderToUpdate) {
        orderToUpdate.itemsList = orderToUpdate.itemsList.map(item => {
          if (item.id === newItem.id) {
            return {
              ...item,
              ...newItem
            };
          }
          return item;
        });
        orderToUpdate.detailsOrder.countItems = calculateItemCount(orderToUpdate.itemsList);
        orderToUpdate.detailsOrder.price = calculateTotalPrice(orderToUpdate.itemsList);
        if (state.currentOrder && state.currentOrder.id === orderID) {
          state.currentOrder = { ...orderToUpdate };
        }
      }
    },
    orderSelect: (state, action) => {
      const orderID = action.payload;
      const orderSelected = state.orderList.find(order => order.id === orderID);
      state.currentOrder = orderSelected ? { ...orderSelected } : null;
    },
    setPendingList: (state, action) => {
      const orderToMove = action.payload;
      state.pendingList.push(orderToMove);
      const orderIndex = state.orderList.findIndex(order => order.id === orderToMove.id);
      if (orderIndex !== -1) {
        state.orderList.splice(orderIndex, 1);
        if (state.orderList.length > 0) {
          state.currentOrder = state.orderList[0];
        } else {
          state.currentOrder = null;
        }
      }
    },
    setDeleteList: (state, action) => {},
    showOrders: (state) => {
        console.log('true')
      state.displayOrderComponent = true;
      
    },
    hideOrders: (state) => {
        console.log('false')
      state.displayOrderComponent = false;
    }
  }
});

export const {
  showOrders,
  hideOrders,
  addOrder,
  deleteOrder,
  updateOrder,
  setOrder,
  addItem,
  deleteItems,
  updateItem,
  orderSelect,
  setPendingList,
  setDeleteList
} = orderSlice.actions;

export default orderSlice.reducer;
