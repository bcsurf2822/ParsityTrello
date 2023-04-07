// import axios from "axios";
// import {
//   AUTH_USER,
//   AUTH_ERROR,
//   FETCH_LIST,
//   FETCH_CARDS,
//   UPDATE_LISTS,
//   UPDATE_CARDS,
//   POST_LIST,
//   POST_CARD,
//   DELETE_CARD,
//   DELETE_LIST,
//   CLEAR_LIST
// } from "./types";

// const useProxy = function (route) {
//   return `http://localhost:8000${route}`;
// };

// //Logs in User in coordination with our post Login Route
// export const logIn = (formProps, callback) => (dispatch) => {
//   axios
//     .post(useProxy("/login"), formProps)
//     .then(function (response) {
//       console.log(response)
//       dispatch({ type: AUTH_USER, payload: response.data });
//       localStorage.setItem("token", response.data.token);
//       //console.log("API RES", response.data.token);
//       callback();
//     })
//     .catch(function () {
//       dispatch({
//         type: AUTH_ERROR,
//         payload: alert("Unauthorized Username or Password"),
//       });
//     });
// };

// export const fetchAuthorized = () => (dispatch) => {
//   const config = {
//     headers: {
//       Authorization: "Bearer" + localStorage.getItem("token"),
//     },
//   };

//   //Protected Endpoint use
//   axios
//     .get(useProxy("/authorized"), config)
//     .then(function (response) {
//       dispatch({ type: AUTH_USER, payload: response.data });
//       localStorage.setItem("token", response.data.token);
//       console.log("Get Auth User", response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

// //OG FETCH LIST
// // export const fetchList = (boardId) => async (dispatch) => {
// //   try {
// //     const response = await axios.get(useProxy(`/board/${boardId}/lists`));
// //     const listData = response.data.filter((list) => list !== null);
// //     //console.log("Fetched lists:", listData);
// //     dispatch({
// //       type: FETCH_LIST,
// //       payload: listData,
// //     });
// //     console.log("listRes", response);
// //     console.log("LIst Data", listData);
// //     console.log("ListData Cards", listData.cards)

// //     // Fetch the cards for each list
// //     // listData.forEach((list) => {
// //     //   dispatch(fetchCards(boardId, list._id));
// //     //   console.log("List after id", list.cards);
// //     //   dispatch({type: FETCH_CARDS,
// //     //     payload: list.cards})
// //     // });
// //     listData.forEach((list) => {
// //       dispatch(fetchCards(boardId, list._id));
// //       console.log("List after id", list.cards);
// //     });
// //   } catch (error) {
// //     console.error("Error fetching lists data", error);
// //   }
// // };

// //New Fetch LIST FOR TEST
// export const fetchList = (boardId) => async (dispatch) => {
//   try {
//     const response = await axios.get(useProxy(`/board/${boardId}/lists`));
//     const listData = response.data.filter((list) => list !== null);
//     //console.log("Fetched lists:", listData);
//     dispatch({
//       type: FETCH_LIST,
//       payload: listData,
//     });
//     console.log("listResponse:", response);
//     console.log("LIst Data", listData);


//     const cardsPromise = listData.map((list) => dispatch(fetchCards(boardId, list._id)));
//     const newCards = await Promise.all(cardsPromise)
//     console.log("New Cards", newCards)

//   } catch (error) {
//     console.error("Error fetching lists data", error);
//   }
// };


// // fetch cards -OG
// // export const fetchCards = (boardId, listId) => async (dispatch) => {
// //   try {
// //     const response = await axios.get(
// //       useProxy(`/board/${boardId}/lists/${listId}`)
// //     );
// //     dispatch({
// //       type: FETCH_CARDS,
// //       payload: { listId, cards: response.data.cards },
// //     });
// //   } catch (error) {
// //     console.error("Error fetching cards", error);
// //   }
// // };

// //FETCH TEST FOR LOOP ISSUE
// export const fetchCards = (boardId, listId) => async (dispatch) => {
//   try {
//     const response = await axios.get(
//       useProxy(`/board/${boardId}/lists/${listId}`)
//     );
//     if (Array.isArray(response.data)) {
//       const cardData = response.data.filter((card) => card !== null)
//     dispatch({
//       type: FETCH_CARDS,
//       payload: { [listId]: cardData },
//     });
//     return cardData
//     } else if (response.data.cards && Array.isArray(response.data.cards)) {
//       const cardData = response.data.cards.filter((card) => card !== null );
//       dispatch({
//         type: FETCH_CARDS,
//         payload: {[listId]: cardData}
//       });
//       return cardData
//     } else {
//       throw new Error("Unexpected Response Structure")
//     }
    
//   } catch (error) {
//     console.error("Error fetching cards", error);
//   }
// };


// // update lists
// export const updateLists = (lists, boardId) => async (dispatch) => {
//   try {
//     const response = await axios.patch(useProxy(`/boards/${boardId}/lists`), {
//       lists,
//       boardId,
//     });

//     dispatch({
//       type: UPDATE_LISTS,
//       payload: { lists: response.data.lists },
//     });
//   } catch (error) {
//     console.error("Error updating lists", error);
//   }
// };

// // TODO: update cards
// export const updateCards = (listId, cards) => async (dispatch) => {
//   try {
//     const response = await axios.patch(useProxy(`/lists/${listId}/cards`), {
//       cards,
//     });

//     console.log(response);

//     dispatch({
//       type: UPDATE_CARDS,
//       payload: { listId, cards: response.data.cards },
//     });
//   } catch (error) {
//     console.error("Error updating cards", error);
//   }
// };

// //POST LIST
// export const postList = (lists, boardId) => async (dispatch) => {
//   try {
//     const response = await axios.post(useProxy(`/board/${boardId}/lists`), {
//       title: lists,
//       boardId,
//     });
//     console.log("Post Response", response.data);

//     dispatch({
//       type: POST_LIST,
//       payload: response.data,
//     });
//   } catch (error) {
//     console.error("Error Posting lists", error);
//   }
// };

// //POST CARD
// export const postCard = (cardTitle, listId, boardId) => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       useProxy(`/board/${boardId}/lists/${listId}`),
//       { title: cardTitle }
//     );
//     const card = response.data;
//     dispatch({ type: POST_CARD, payload: { card, listId } });
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const clearList = () => ({
//   type: CLEAR_LIST,
// })

// //DELETE LIST
// export const deleteList = (listId, boardId) => async (dispatch) => {
//   try {
//     console.log("called with", listId, boardId)
//     const response = await axios.delete(
//       useProxy(`/board/${boardId}/lists/${listId}`)
//     );
//     const list = response.data
//     console.log("Delete REs", response.data);
//     dispatch({ type: DELETE_LIST, payload: list });
//   } catch (error) {
//     console.error(error);
//   }
// };

// //Delete Card

// // Post comment
// export const postComment = (boardId, listId, cardId, comment, user) => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       useProxy(`"/boards/${boardId}/lists/${listId}/cards/${cardId}/comments"`),
//       { commentText: comment, userId: user }
//     );
//     const card = response.data;
//     dispatch({ type: POST_CARD, payload: { card, listId } });
//   } catch (error) {
//     console.error(error);
//   }
// };

// /*
// const CommentSchema = new Schema({
//   comment: String,
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//   },
// });
// */