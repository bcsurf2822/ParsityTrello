import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchList, updateLists, updateCards } from "../actions";
import Nav from "./nav";
import PlusSvg from "../public/plus.svg";
import ListComponent from "./listComponent";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Board = () => {
  const { id } = useParams(); // Get the boardId from URL params
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.list || []);
  const cards = useSelector((state) => state.cards || []);

  useEffect(() => {
    dispatch(fetchList(id)); // Pass the boardId to the fetchList action
  }, [dispatch, id]);

  const [stateLists, setLists] = useState(lists);

  const onDragEnd = (result) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      // update the order of the lists
      const newLists = Array.from(lists);
      const [removed] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, removed);
  
      // update the state of the lists
      setLists(newLists);

      // dispatch action to update the lists state
      dispatch(updateLists(newLists, id));

    } else {
      // update the order of the cards within a list
      const listId = source.droppableId;
      const newCards = cards[listId].slice();
      const [removed] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, removed);

      //update the state of card order
      //setCards(newCards);
  
      // dispatch action to update the cards state
      dispatch(updateCards(listId, newCards));
    }
  };  

  return (
    <div>
      <Nav />
      <div className="mt-16 mx-8">
        <div className="border-b-2 border-slate-300">
          <h1 className="text-2xl font-bold mb-2">Organization</h1>
        </div>
        <div>
          <p className="mt-10 text-xl mb-4">Frontend Work</p>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="list"
          >
            {(provided) => (
              <div
                className="flex gap-4 overflow-x-auto"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {stateLists.map((list, index) => (
                  <Draggable draggableId={list._id} index={index} key={list._id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ListComponent list={list} index={index} 
                        //stateCards={stateCards}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <div>
                  <div className="bg-gray-100 hover:bg-gray-200 rounded-md w-80 cursor-pointer">
                    <div className="flex py-2 px-2">
                      <img
                        src={PlusSvg}
                        alt="plussvg"
                        className="object-contain w-6 mr-2"
                      />
                      <p>Add another list</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
