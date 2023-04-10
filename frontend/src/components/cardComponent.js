import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Modal from "react-modal";
import xSvg from "../public/x-mark.svg";
import Avatar from "../public/Avatar.png";
import CommentComponent from "./commentComponent";
import { useDispatch, useSelector } from "react-redux";
import { postComment, postLabel } from "../actions/cards";
import { postDescription } from "../actions/cards";

const CardComponent = ({ card, index, listId }) => {
  const [modal, toggleModal] = useState(false);
  const openModal = () => toggleModal(true);
  const closeModal = () => toggleModal(false);
  const dispatch = useDispatch();

  const cardDetail = () => {
    openModal();
  };

  // TODO: set up label modal (nested modal to get text and color)
  const [labelModal, setLabelModal] = useState(false);
  const openLabelModal = () => setLabelModal(true);
  const closeLabelModal = () => setLabelModal(false);

  const [label, setLabel] = useState();

  const submitLabel = () => {
    dispatch(postLabel(listId, cardId, label))
    setLabel("");
  }

  // Get userId and use that to postComment
  const user = useSelector((state) => state.authentication);

  // state for adding new comments
  const [comment, setComment] = useState();
  const userId = user.id;
  const cardId = card._id;

  const addComment = () => {
    dispatch(postComment(listId, cardId, comment, userId));
    setComment("");
  };

  // state for description, handling description change, submiting description
  const [description, setDescription] = useState({
    description: card.description || "Add a detailed description...",
  });

  const handleDescriptionChange = (e) => {
    setDescription({ ...card, description: e.target.value });
  };

  const submitDescription = () => {
    dispatch(postDescription(listId, cardId, description));
  };

  return (
    <div>
      <Draggable draggableId={card._id} index={index}>
        {(provided) => (
          <div>
            <div
              className="bg-white hover:bg-gray-100 rounded-md flex-grow mx-2 mb-4 drop-shadow cursor-pointer"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onClick={cardDetail}
            >
              <div className="py-2 pl-2">
                <p>{card.title}</p>
              </div>
            </div>
            <div className="">
              <Modal
                isOpen={modal}
                onRequestClose={closeModal}
                className="modal w-4/6 h-4/6 bg-white border-black border rounded mx-auto mt-40 "
              >
                <div className="mx-4 my-2">
                  <div className="flex justify-between">
                    <p className="mt-4 font-semibold">{card.title}</p>
                    <img
                      src={xSvg}
                      alt="xsvg"
                      className="object-contain w-6 mt-4 cursor-pointer hover:bg-gray-100 hover: rounded-md"
                      onClick={closeModal}
                    />
                  </div>
                  <div className="flex gap-6">
                    <div className="flex flex-col w-3/4">
                      <div className="block mt-4">
                        <label
                          for="message"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Description
                        </label>
                        <textarea
                          type="text"
                          rows="4"
                          value={description.description}
                          onChange={handleDescriptionChange}
                          className="border-none focus:border-blue-500 focus:ring-blue-500 block w-full rounded-md sm:text-sm border p-2 resize-none"
                        />

                        <button
                          type="submit"
                          className="inline-flex bg-blue-700 justify-center py-1 px-2 text-white rounded-md cursor-pointer hover:bg-blue-800 mt-2"
                          onClick={submitDescription}
                        >
                          Submit
                        </button>
                      </div>
                      <div className="overflow-y-auto h-96">
                        <label className="block mt-4">
                          <span className="text-sm">Comments</span>

                          <div className="w-full flex items-center mt-2 mb-4">
                            <img
                              src={Avatar}
                              alt="plussvg"
                              className="object-contain w-12 mr-4"
                            />
                            <textarea
                              rows="1"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
                              placeholder="Your message..."
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <button
                              type="submit"
                              className="inline-flex bg-blue-700 justify-center p-2 ml-2 text-white rounded-md cursor-pointer hover:bg-blue-800"
                              onClick={addComment}
                            >
                              Save
                            </button>
                          </div>

                          <div>
                            {card.comments.map((comment) => (
                              <CommentComponent
                                key={comment._id}
                                comment={comment}
                              />
                            ))}
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col w-1/4">
                      <label className="block mt-4">
                        <span className="text-sm mb-2">Labels</span>
                        {card.label.map((label) => (
                          <div className="bg-gray-200 ${} rounded-md px-2 py-2 text-sm my-2">
                            {label.text}
                          </div>
                        ))}
                        <div
                          className="bg-gray-200 rounded-md px-2 py-2 text-sm my-2 cursor-pointer hover:bg-gray-300 font-semibold"
                          onClick={openLabelModal}
                        >
                          Add a label
                        </div>
                        <div>
                          <Modal
                            isOpen={labelModal}
                            onRequestClose={closeLabelModal}
                            className="modal w-60 bg-white border-black border rounded mx-auto mt-60"
                          >
                            <div className="mx-4">
                              <div className="flex justify-between">
                                <p className="mt-4 font-semibold">
                                  Create Label
                                </p>
                                <img
                                  src={xSvg}
                                  alt="xsvg"
                                  className="object-contain w-6 mt-4 cursor-pointer hover:bg-gray-100 hover: rounded-md"
                                  onClick={closeLabelModal}
                                />
                              </div>
                              <label className="block mt-4">
                                <span className="text-sm">Label</span>
                                <input
                                  className="border-black border rounded mt-1 w-full"
                                  value={label}
                                  onChange={(e) => setLabel(e.target.value)}
                                ></input>
                              </label>
                              <div className="flex items-center justify-center">
                                <button
                                  className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer font-semibold mt-6 mb-4"
                                  onClick={submitLabel}
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </Modal>
                        </div>
                      </label>
                      <label className="block mt-4">
                        <span className="text-sm">Actions</span>
                        <div className="bg-gray-200 rounded-md px-2 py-2 text-sm my-2">
                          Move
                        </div>
                        <div className="bg-gray-200 rounded-md px-2 py-2 text-sm my-2">
                          Archive
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default CardComponent;
