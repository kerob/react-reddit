import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import FormDialog from "./FormDialog";
import { addThread } from "../firebase";
import { login, register, logout } from "../providers/AuthProvider";
import { useAuth } from "../providers/AuthProvider";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { FaUserCircle, FaComments, FaPlus, FaSearch } from "react-icons/fa";
import IconBtn from "./IconBtn";
import { useThemeUpdate } from "../providers/ThemeProvider";

export default function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const toggleTheme = useThemeUpdate();

  function DropdownMenu() {
    function DropdownItem(props) {
      return (
        <a href="#" className="menu-item">
          <span className="icon-button">{props.leftIcon}</span>
          {props.children}
          <span className="icon-right">{props.rightIcon}</span>
        </a>
      );
    }

    function DropdownButton(props) {
      return (
        <button className="menu-button" onClick={props.func}>
          <span className="icon-button">{props.leftIcon}</span>
          {props.children}
          <span className="icon-right">{props.rightIcon}</span>
        </button>
      );
    }
    return (
      <div className="nav-menu dropdown">
        {currentUser ? (
          <>
            {/* <DropdownItem>thing</DropdownItem> */}
            <DropdownButton
              func={() =>
                addThread(
                  currentUser.displayName,
                  currentUser.uid,
                  "test 3 thread",
                  "this is a new thread"
                )
              }
              leftIcon={<FaComments />}
            >
              create
            </DropdownButton>
            <DropdownButton
              func={() => setShowForm(true)}
              leftIcon={<FaUserCircle />}
            >
              Profile
            </DropdownButton>
            <DropdownButton func={() => logout()} leftIcon={<BiLogOutCircle />}>
              Logout
            </DropdownButton>
          </>
        ) : (
          <>
            <DropdownButton
              func={() => login("email", "tester@test.com", "tester")}
            >
              FastLogin
            </DropdownButton>
            <DropdownButton func={() => toggleTheme()}>
              Toggle Theme
            </DropdownButton>
            <DropdownButton
              func={() => navigate("/Login")}
              leftIcon={<BiLogInCircle />}
            >
              Login
            </DropdownButton>
          </>
        )}
      </div>
    );
  }

  return (
    <nav className="nav-test">
      <ul role="list" className="">
        <li>
          <NavLink to="/" className={"nav-button"}>
            Home
          </NavLink>
        </li>
        {currentUser && <li>{currentUser.displayName}</li>}
      </ul>
      <ul role="list" className="flex ">
        <li>
          <NavLink to="/submit" className="nav-button">
            <IconBtn Icon={FaPlus} aria-label="New Thread" />
          </NavLink>
        </li>
        <li>
          <a
            className="nav-button"
            onClick={() => {
              setToggleMenu((prevState) => !prevState);
              console.log(toggleMenu);
            }}
          >
            Menu
            {toggleMenu && <DropdownMenu />}
          </a>
        </li>
      </ul>

      <FormDialog showForm={showForm} closeForm={() => setShowForm(false)} />
    </nav>
  );
}
