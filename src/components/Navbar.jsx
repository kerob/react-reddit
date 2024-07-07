import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import FormDialog from './FormDialog';
import { addThread } from '../firebase';
import { login, register, logout } from '../providers/AuthProvider';
import { useAuth } from '../providers/AuthProvider';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import {
  FaUserCircle,
  FaComments,
  FaPlus,
  FaSearch,
  FaHome,
} from 'react-icons/fa';
import IconBtn from './IconBtn';
import { useThemeUpdate } from '../providers/ThemeProvider';

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
      <div className="nav-menu dropdown-menu">
        {currentUser ? (
          <>
            {/* <DropdownItem>thing</DropdownItem> */}
            <DropdownButton
              func={() =>
                addThread(
                  currentUser.displayName,
                  currentUser.uid,
                  'test 3 thread',
                  'this is a new thread'
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
            {/* <DropdownButton func={() => toggleTheme()}>
              Toggle Theme
            </DropdownButton> */}
            <DropdownButton
              func={() => navigate('/login')}
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
          <NavLink to="/" className={'nav-button'}>
            <IconBtn Icon={FaHome} />
          </NavLink>
        </li>
      </ul>
      <ul role="list" className="flex">
        <li>
          {currentUser ? (
            <NavLink to="/submit" className="nav-button">
              <IconBtn Icon={FaPlus} aria-label="New Thread" />
            </NavLink>
          ) : (
            <NavLink to="/login" className="fw-bold nav-button nav-button-long">
              Log In
            </NavLink>
          )}
        </li>
        <li className="dropdown">
          <a
            className="nav-button hamburger"
            onClick={() => {
              setToggleMenu((prevState) => !prevState);
            }}
            aria-controls="primary-navigation"
            aria-expanded={toggleMenu}
          >
            <svg
              fill="var(--button-color)"
              // className="hamburger"
              viewBox="0 0 100 100"
              width="250"
            >
              <rect
                className="line top"
                width="80"
                height="10"
                x="10"
                y="25"
                rx="5"
              ></rect>
              <rect
                className="line middle"
                width="80"
                height="10"
                x="10"
                y="45"
                rx="5"
              ></rect>
              <rect
                className="line bottom"
                width="80"
                height="10"
                x="10"
                y="65"
                rx="5"
              ></rect>
            </svg>
          </a>
          {toggleMenu && <DropdownMenu />}
        </li>
      </ul>

      <FormDialog showForm={showForm} closeForm={() => setShowForm(false)} />
    </nav>
  );
}
