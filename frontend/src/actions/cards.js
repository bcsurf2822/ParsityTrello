import axios from "axios";
import {
  FETCH_CARDS,
  UPDATE_CARDS,
  POST_CARD,
  FETCH_COMMENTS,
  POST_COMMENT,
  CLEAR_CARDS,
  POST_DESCRIPTION,
} from "./types";

const useProxy = function (route) {
  return `http://localhost:8000${route}`;
};

//POST CARD
export const postCard = (cardTitle, listId, boardId) => async (dispatch) => {
  try {
    const response = await axios.post(
      useProxy(`/board/${boardId}/lists/${listId}`),
      { title: cardTitle, listId, boardId }
    );

    const card = response.data;
      console.log("POST USED", card)
    dispatch({ type: POST_CARD, payload: { card, listId } });

    const cardsResponse = await axios.get(
      useProxy(`/board/${boardId}/lists/${listId}/cards`)
    );
    const cards = cardsResponse.data;
    dispatch({ type: FETCH_CARDS, payload: { cards, listId } });
  } catch (error) {
    console.error(error);
  }
};

// fetch cards
export const fetchCards = (boardId, listId) => async (dispatch) => {
  try {
    const response = await axios.get(
      useProxy(`/board/${boardId}/lists/${listId}`)
    );

    dispatch({
      type: FETCH_CARDS,
      payload: { listId, cards: response.data.cards || [] },
    });
  } catch (error) {
    console.error("Error fetching cards", error);
  }
};

// Update cards
export const updateCards = (listId, cards) => async (dispatch) => {
  try {
    const response = await axios.patch(useProxy(`/lists/${listId}/cards`), {
      cards,
    });
    dispatch({
      type: UPDATE_CARDS,
      payload: { listId, cards: response.data.cards },
    });
  } catch (error) {
    console.error("Error updating cards", error);
  }
};

// Create Comments
export const postComment =
  (listId, cardId, comment, userId) => async (dispatch) => {
    try {
      const response = await axios.post(
        useProxy(`/lists/${listId}/cards/${cardId}/comments`),
        { comment, userId }
      );

      if (response.status === 201) {
        const newComment = response.data.comment;
        dispatch({
          type: POST_COMMENT,
          payload: { cardId, comment: newComment },
        });
      } else {
        console.error("Error posting comment:", response);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

// Fetch Comments
export const fetchComments = (boardId, listId, cardId) => async (dispatch) => {
  try {
    const response = await axios.get(
      useProxy(`/boards/${boardId}/lists/${listId}/cards/${cardId}/comments`)
    );

    if (response.status === 200) {
      dispatch({
        type: FETCH_COMMENTS,
        payload: { cardId, comments: response.data },
      });
    } else {
      console.error("Error fetching comments:", response);
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

//POST DESCRIPTION
export const postDescription =
  (cardDescription, listId, boardId) => async (dispatch) => {
    try {
      const response = await axios.post(
        useProxy(`/board/${listId}/cards/${listId}/description`),
        { description: cardDescription, listId, boardId }
      );

        const card = response.data;

        dispatch({ type: POST_DESCRIPTION, payload: { card, listId }});

        const cardResponse = await axios.get(useProxy(`/board/${boardId}/lists/${listId}/cards`));

        const cards = cardResponse.data;

        dispatch({type: FETCH_CARDS, payload: {cards, listId}});
    } catch (error) {
      console.error("Error posting Description", error);
    }
  };