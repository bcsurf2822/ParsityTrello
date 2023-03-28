import Nav from "./nav";
import PlusSvg from "../public/plus.svg";

const Home = () => {
  const AddBoard = () => {
    // TODO: dispatch to addBoard
    // TODO: new board modal should pop up
    console.log("Added board");
  };

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
            onClick={AddBoard}
          >
            <img
              src={PlusSvg}
              alt="plussvg"
              className="object-contain w-6 ml-4"
            />
            <p className="ml-2 font-bold">Add Board</p>
          </div>
          <div className="bg-gray-100 hover:bg-gray-200 rounded-lg h-28 flex items-center cursor-pointer">
            <p className="ml-4 font-bold">Title</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
