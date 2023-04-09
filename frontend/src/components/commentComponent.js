import { useEffect } from "react";
import Avatar from "../public/Avatar.png";
import { fetchComments } from "../actions/cards";
import { useDispatch } from "react-redux";
import { fetchBoards } from "../actions/boards";

const CommentComponent = ({ comment }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchComments());
    dispatch(fetchBoards)
    
  }, [dispatch]);


  return (
    <div className="w-full flex mt-2 mb-4">
      <img src={Avatar} alt="plussvg" className="object-contain w-12 mr-4" />
      <div className="w-full">
        <p className="text-sm font-semibold mb-1">{comment.user.username}</p>
        <div className="text-sm bg-gray-100 rounded-sm px-2 py-2">
          {comment.comment}
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
