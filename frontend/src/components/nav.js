import logo from "../public/logo.png";
import { Link } from "react-router-dom";


const Nav = () => {

  //TODO: get state of authenticated
  //TODO: check if authenticated, show "sign out" instead if authenticated
  const logOut = function () {
    localStorage.removeItem("token");

  }

  return (
    <header className="flex justify-between mt-6 mx-8">
      <img src={logo} alt="logo" className="object-contain w-32" />
      <button className="text-white bg-red-700 hover:bg-red-800 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 cursor-pointer font-semibold">
          Log Out
        </button>
      <Link to="/login">
        <button className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer font-semibold">
          Login
        </button>
      </Link>
    </header>
  );
};

export default Nav;
