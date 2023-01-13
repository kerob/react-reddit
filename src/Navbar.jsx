import { useState } from "react";
import { Link } from "react-router-dom";
import FormDialog from "./components/FormDialog";
import { addThread } from "./firebase";
import { login, register, logout } from "./providers/AuthProvider";
import { useAuth } from "./providers/AuthProvider";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { FaUserCircle, FaComments } from "react-icons/fa";

export default function Navbar() {
  const { currentUser } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

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
            <DropdownButton
              func={() => setShowForm(true)}
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
    <div className="">
      <nav className="">
        <ul>
          <li>
            <Link to="">Home</Link>
          </li>
          {currentUser && <li>{currentUser.displayName}</li>}
        </ul>
        <ul className="flex nav-test">
          <li>
            <a href="" className="nav-button">
              New
            </a>
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
    </div>
  );
}
