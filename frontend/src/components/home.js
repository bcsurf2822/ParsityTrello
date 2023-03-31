import Nav from "./nav";
import PlusSvg from "../public/plus.svg";
import xSvg from "../public/x-mark.svg";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBoards, postBoards, deleteBoard } from "../actions/boards";

Modal.setAppElement("#root");

const Home = () => {
  const [modal, toggleModal] = useState(false);
  const [newBoard, setNewBoard] = useState("");

  const openModal = () => toggleModal(true);
  const closeModal = () => toggleModal(false);

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards.boards);

  const addBoardModal = () => {
    openModal();
  };

  const addBoard = () => {
    dispatch(postBoards(newBoard));
    setNewBoard("");
    closeModal();
    console.log("dispatch sent!");
  };

  const deleteBoards = (e, id) => {
    e.stopPropagation();
    dispatch(deleteBoard(id));
  }

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  

  return (
    <div>
      <Nav />
      <div className="mt-16 mx-8">
        <div className="border-b-2 border-slate-300">
          <h1 className="text-2xl font-bold mb-2">Organization</h1>
        </div>
        <p className="mt-10 text-xl mb-4">Boards</p>
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-4">
          <div
            className="rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-700 h-28 flex items-center cursor-pointer"
            onClick={addBoardModal}
          >
            <img
              src={PlusSvg}
              alt="plussvg"
              className="object-contain w-6 ml-4"
            />
            <p className="ml-2 font-bold">Add Board</p>
          </div>
          {boards.map((board) => (
            <div key={board._id} className="relative">
              <Link to={`/board/${board._id}`} key={board._id}>
              <div className="bg-gray-100 hover:bg-gray-200 rounded-lg h-28 flex items-center cursor-pointer">
                <h2>{board.title}</h2>
                </div>
                </Link>
                <button className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer font-semibold mt-6 mb-4" onClick={(e) => deleteBoards(e, board._id)}>DeleteBoard</button>
              </div>
          ))}

          <div className="">
            <Modal
              isOpen={modal}
              onRequestClose={closeModal}
              className="modal w-60 bg-white border-black border rounded mx-auto mt-60"
            >
              <div className="mx-4">
                <div className="flex justify-between">
                  <p className="mt-4 font-semibold">Create Board</p>
                  <img
                    src={xSvg}
                    alt="xsvg"
                    className="object-contain w-6 mt-4 cursor-pointer hover:bg-gray-100 hover: rounded-md"
                    onClick={closeModal}
                  />
                </div>
                <label className="block mt-4">
                  <span className="text-sm">Board Title</span>
                  <input
                  value={newBoard}
                  onChange={(e) => setNewBoard(e.target.value)} className="border-black border rounded mt-1 w-full"></input>
                </label>
                <div className="flex items-center justify-center">
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer font-semibold mt-6 mb-4"
                    onClick={addBoard}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
