import logo from "../public/logo.png";
import { Link } from "react-router-dom";

const Nav = () => {
  //TODO: get state of authenticated
  //TODO: check if authenticated, show "sign out" instead if authenticated

  return (
    <header className="flex justify-between mt-6 mx-8">
      <img src={logo} alt="logo" className="object-contain w-32" />
      <Link to="/">
        <button className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer font-semibold">
          Login
        </button>
      </Link>
    </header>
  );
};

export default Nav;
