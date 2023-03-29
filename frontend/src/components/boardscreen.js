import Nav from "./nav";
import PlusSvg from "../public/plus.svg";
import ListComponent from "./listComponent";

const Board = () => {
  return (
    <div>
      <Nav />
      <div className="mt-16 mx-8">
        <div className="border-b-2 border-slate-300">
          <h1 className="text-2xl font-bold mb-2">Organization</h1>
        </div>
        <p className="mt-10 text-xl mb-4">Frontend Work</p>
        <div className="flex gap-4 overflow-x-auto">
          <ListComponent />
          <ListComponent />
          <ListComponent />
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
      </div>
    </div>
  );
};

export default Board;
