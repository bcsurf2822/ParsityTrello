import React, { useEffect } from "react";
import PlusSvg from "../public/plus.svg";
import CardComponent from "./cardComponent";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCards } from "../actions";


const ListComponent = ({ list }) => {
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
    <div className="flex flex-row h-full">
      <div className="bg-gray-100 rounded-lg w-80 cursor-pointer flex flex-col">
        <p className="mb-4 mt-4 mx-4 font-semibold" contentEditable="true">
          {list.title}
        </p>
        {cardArray && cardArray.map((card) => (
            <CardComponent key={card._id} card={card} />
          ))}
        <div className="flex justify-center mb-4 flex-grow mx-4 rounded-md hover:bg-gray-200">
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
  );
};

export default ListComponent;

/*
        {cardArray && cardArray.map((card) => (
            <CardComponent key={card._id} card={card} />
          ))}
*/