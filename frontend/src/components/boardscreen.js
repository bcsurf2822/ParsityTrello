import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBoardId } from "../actions/boards";
import { fetchList, updateLists, updateCards, postList, clearList } from "../actions";
import Nav from "./nav";
import PlusSvg from "../public/plus.svg";
import xSvg from "../public/x-mark.svg";
import ListComponent from "./listComponent";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Modal from "react-modal";

const Board = () => {
  const [modal, toggleModal] = useState(false);
  const openModal = () => toggleModal(true);
  const closeModal = () => toggleModal(false);

  const addListModal = () => {
    openModal();
  };

  const { id } = useParams(); // Get the boardId from URL params
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards.boards.find((board) => board._id === id) || {})
  const lists = useSelector((state) => state.lists?.list || []);
  const cards = useSelector((state) => state.cards || []);
  const [stateLists, setLists] = useState([]);
  const [fetch, setFetch] = useState(false);

  console.log(lists)


  useEffect(() => {
    if (!fetch) {
      dispatch(fetchBoardId(id))
      dispatch(fetchList(id));
      setFetch(true);
    } else {
      setLists(lists)
    }
    return () => {
      dispatch(clearList());
    }
  }, [dispatch, id, fetch]);

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
      const newLists = Array.from(stateLists);
      const [removed] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, removed);

      // update the state of the lists
      setLists(newLists);

      // dispatch action to update the lists state
      dispatch(updateLists(newLists, id));
    } else {
      // update the order of the cards within a list
      const listId = source.droppableId;
      const newCards = Array.from(cards[listId] || []);
      const [removed] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, removed);

      //update the state of card order
      // setCards(newCards);

      // dispatch action to update the cards state
      dispatch(updateCards(listId, newCards));
    }
  };

  const ListModal = () => {
    const [newList, setNewList] = useState("");
    const addList = () => {
      dispatch(postList(newList, id));
      setNewList("");
      closeModal();
      console.log("Dispatch Sent");
    };
    return (
      <div className="addList">
        <Modal
          isOpen={modal}
          onRequestClose={closeModal}
          className="modal w-60 bg-white border-black border rounded mx-auto mt-60"
        >
          <div className="mx-4">
            <div className="flex justify-between">
              <p className="mt-4 font-semibold">Create List</p>
              <img
                src={xSvg}
                alt="xsvg"
                className="object-contain w-6 mt-4 cursor-pointer hover:bg-gray-100 hover: rounded-md"
                onClick={closeModal}
              />
            </div>
            <label className="block mt-4">
              <span className="text-sm">List Title</span>
              <input
                value={newList}
                onChange={(e) => setNewList(e.target.value)}
                className="border-black border rounded mt-1 w-full"
              ></input>
            </label>
            <div className="flex items-center justify-center">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer font-semibold mt-6 mb-4"
                onClick={addList}
              >
                Submit
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  };

  return (
    <div>
      <Nav />
      <div className="mt-16 mx-8">
        <div className="border-b-2 border-slate-300">
          <h1 className="text-2xl font-bold mb-2">Organization</h1>
        </div>
        <div>
          <p className="mt-10 text-xl mb-4">{boards.title}</p>
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
                {stateLists.map((list, index) => {
                  if (!list) {
                    return null;
                  }
                  return (
                    <Draggable
                      draggableId={list._id}
                      index={index}
                      key={list._id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ListComponent list={list} index={index} />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
                <div>
                  <div
                    className="bg-gray-100 hover:bg-gray-200 rounded-md w-80 cursor-pointer"
                    onClick={addListModal}
                  >
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

      <div className="listModal">
        <ListModal />
      </div>
    </div>
  );
};

export default Board;
