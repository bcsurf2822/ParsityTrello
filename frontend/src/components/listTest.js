// import React, { useEffect, useState } from "react";
// import PlusSvg from "../public/plus.svg";
// import CardComponent from "./cardComponent";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchCards, postCard, deleteList } from "../actions";
// import { Droppable } from "react-beautiful-dnd";
// import Modal from "react-modal";
// import xSvg from "../public/x-mark.svg";

// const ListComponent = ({ list }) => {
//   const { id } = useParams();
//   let boardId = id;
//   let listId = list._id;
//   console.log("List From Boards", list)
//   const [modal, toggleModal] = useState(false);
//   const openModal = () => toggleModal(true);
//   const closeModal = () => toggleModal(false);

//   const [newCard, setNewCard] = useState("");

//   const dispatch = useDispatch();
//   const cards = useSelector((state) => state.cards.cards || {});
//   // const lists = useSelector((state) => state.lists.list || []);
//   let cardArray = cards[listId] || [];

//   //fetchCards action
//   useEffect(() => {
//     dispatch(fetchCards(boardId, listId));
//   }, [boardId, listId, dispatch]);

//   const addCardModal = () => {
//     openModal();
//   };

//   const addCard = () => {
//     dispatch(postCard(newCard, listId, boardId));
//     setNewCard("");
//     closeModal();
//   };

//   // const listDelete = () => {
//   //   dispatch(deleteList(listId, id));
//   //   console.log("deleteLIst");

//   // }
//   // <button onClick={listDelete}>Delete</button>

//   return (
//     <div>
//       <div className="flex flex-row">
//         <div className="bg-gray-100 rounded-lg w-80 flex flex-col">
//           <div className="flex justify-between items-center mx-4 mb-4 mt-4">
//             <p className="font-semibold">{list.title} </p>
//           </div>
//           <Droppable droppableId={listId} key={listId} type="card">
//             {(provided) => (
//               <div ref={provided.innerRef} {...provided.droppableProps}>
//                 {cardArray &&
//                   cardArray.map((card, index) => (
//                     <CardComponent
//                       key={`${card._id}-${index}`}
//                       card={card}
//                       index={index}
//                     />
//                   ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//           <div
//             className="flex justify-center mb-4 flex-grow mx-4 rounded-md hover:bg-gray-200 cursor-pointer"
//             onClick={addCardModal}
//           >
//             <div className="my-2 flex">
//               <img
//                 src={PlusSvg}
//                 alt="plussvg"
//                 className="object-contain w-6 mr-2"
//               />
//               <p>Add a card</p>
//             </div>
//           </div>
//           <div className="">
//             <Modal
//               isOpen={modal}
//               onRequestClose={closeModal}
//               className="modal w-60 bg-white border-black border rounded mx-auto mt-60"
//             >
//               <div className="mx-4">
//                 <div className="flex justify-between">
//                   <p className="mt-4 font-semibold">Create Card</p>
//                   <img
//                     src={xSvg}
//                     alt="xsvg"
//                     className="object-contain w-6 mt-4 cursor-pointer hover:bg-gray-100 hover: rounded-md"
//                     onClick={closeModal}
//                   />
//                 </div>
//                 <label className="block mt-4">
//                   <span className="text-sm">Card Title</span>
//                   <input
//                     value={newCard}
//                     onChange={(e) => setNewCard(e.target.value)}
//                     className="border-black border rounded mt-1 w-full"
//                   ></input>
//                 </label>
//                 <div className="flex items-center justify-center">
//                   <button
//                     className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer font-semibold mt-6 mb-4"
//                     onClick={addCard}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </Modal>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ListComponent;
