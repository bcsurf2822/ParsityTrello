import PlusSvg from "../public/plus.svg";
import CardComponent from "./cardComponent";
import { deleteList } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const ListComponent = ({ list }) => {
  const dispatch = useDispatch();
  const getBoard = useSelector((state) => state.boards.boards);
  // const getList = useSelector((state) => state.lists);
  const boardId = useParams().id;
  console.log(boardId);


  const handleDelete = (board, listId) => {
    dispatch(deleteList(board, listId))
    console.log("board",board)
    console.log("List", listId);
  }
  return (
    <div className="flex flex-row h-full">
      <div className="bg-gray-100 rounded-lg w-80 cursor-pointer flex flex-col">
        <button onClick={() => handleDelete(boardId, list._id)}>List Delete</button>
        <p className="mb-4 mt-4 mx-4 font-semibold" contentEditable="true">
          {list.title}
        </p>

        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />

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