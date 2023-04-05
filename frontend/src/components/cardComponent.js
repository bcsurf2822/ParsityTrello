import { Draggable } from "react-beautiful-dnd";

const CardComponent = ({ card, index }) => {
  return (
    <Draggable key={card._id} draggableId={card._id} index={index}>
      {(provided) => (
        <div
          className="bg-white hover:bg-gray-100 rounded-md flex-grow mx-2 mb-4 drop-shadow cursor-pointer"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="py-2 pl-2">
            <p>{card.title}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default CardComponent;
