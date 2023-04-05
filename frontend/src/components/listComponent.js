import React, { useEffect, useState } from "react";
import PlusSvg from "../public/plus.svg";
import CardComponent from "./cardComponent";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCards } from "../actions";
import { Droppable } from "react-beautiful-dnd";

const ListComponent = ({ list, handleListId }) => {
  const { id } = useParams();
  let boardId = id;
  let listId = list._id;

  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards || {});
  let cardArray = cards[listId] || [];

  //fetchCards action
  useEffect(() => {
    dispatch(fetchCards(boardId, listId));
  }, [dispatch, boardId, listId]);

  return (
    <div>
      <div className="flex flex-row">
        <div className="bg-gray-100 rounded-lg w-80 flex flex-col">
          <div className="flex justify-between items-center mx-4 mb-4 mt-4">
            <p className="font-semibold">{list.title}</p>
          </div>
          <Droppable droppableId={listId} key={listId} type="card">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {cardArray &&
                  cardArray.map((card, index) => (
                    <CardComponent key={card._id} card={card} index={index} />
                  ))}
                  {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="flex justify-center mb-4 flex-grow mx-4 rounded-md hover:bg-gray-200 cursor-pointer">
            <div className="my-2 flex">
              <img
                src={PlusSvg}
                alt="plussvg"
                className="object-contain w-6 mr-2"
              />
              <p>Add a card</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListComponent;