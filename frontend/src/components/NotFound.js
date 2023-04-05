import { useNavigate } from "react-router-dom";

const Nothing = () => {
  const navigate = useNavigate();
  const login = function () {
    navigate("/Login")
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-red-500 to-black-500">
      <div className="bg-white p-8 text-center rounded-lg shadow-md">
        <h1 className="text-5xl justify-center font-bold text-red-800">404</h1>
        <p className="text-black-800 mt-2">
          Page Does Not Exist Please <button onClick={login}><strong className="text-blue-800 mt-2">Log In</strong></button>   to Explore Further
        </p>
      </div>
    </div>
  );
};

export default Nothing;
