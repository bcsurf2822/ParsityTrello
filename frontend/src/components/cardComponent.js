const CardComponent = ({card}) => {
  return (
    <div className="bg-white hover:bg-gray-100 rounded-md flex-grow mx-2 mb-4 drop-shadow">
      <div className="py-2 pl-2 ">
        <p>{card.title}</p>
      </div>
    </div>
  );
};

export default CardComponent;
