import Avatar from "../public/Avatar.png";

const commentComponent = () => {
  return (
    <div className="w-full flex mt-2 mb-4">
      <img src={Avatar} alt="plussvg" className="object-contain w-12 mr-4" />
      <div className="w-full">
        <p className="text-sm font-semibold mb-1">John Doe</p>
        <div className="text-sm bg-gray-100 rounded-sm px-2 py-2">
          Let's do it!
        </div>
      </div>
    </div>
  );
};

export default commentComponent;
