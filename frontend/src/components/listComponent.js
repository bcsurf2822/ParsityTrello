import PlusSvg from "../public/plus.svg";
import CardComponent from "./cardComponent";

const ListComponent = ({ list }) => {
  return (
    <div className="flex flex-row h-full">
      <div className="bg-gray-100 rounded-lg w-80 cursor-pointer flex flex-col">
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