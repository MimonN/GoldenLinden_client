import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { cartItemModel, userModel } from '../../Interfaces';
import { RootState } from '../../Storage/Redux/store';
import {
  emptyUserState,
  setLoggedInUser,
} from '../../Storage/Redux/userAuthSlice';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { SD_Roles } from '../../Utility/SD';
let logo = require('../../Assets/Images/Golden_Linden.png');

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleNav = () => {
    setShowMenu(!showMenu);
  };

  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate('/');
    setShowMenu(false);
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-dark d-flex justify-content-between d-none d-md-flex px-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <NavLink className="nav-link px-2" to="/">
                <img src={logo} style={{ height: '40px' }} className="m-1" />
              </NavLink>
              <NavLink className="nav-link text-white px-3" to="/">
                Home
              </NavLink>

              {userData.role === SD_Roles.ADMIN ? (
                <div className="d-flex">
                  <NavLink
                    className="nav-link text-white px-3"
                    to="/menuItem/menuitemlist"
                  >
                    Menu Item
                  </NavLink>
                  <NavLink
                    className="nav-link text-white px-3"
                    to="/order/myorders"
                  >
                    My Orders
                  </NavLink>
                  <NavLink
                    className="nav-link text-white px-3"
                    to="/order/allOrders"
                  >
                    All Orders
                  </NavLink>
                </div>
              ) : (
                <div>
                  <NavLink
                    className="nav-link text-white px-3"
                    to="/order/myorders"
                  >
                    Orders
                  </NavLink>
                </div>
              )}
              <NavLink
                className="nav-link text-white px-3"
                aria-current="page"
                to="/shoppingCart"
              >
                Cart <i className="bi bi-cart"></i>{' '}
                {userData.id && `(${shoppingCartFromStore.length})`}
              </NavLink>
            </div>
          </div>
          <div>
            {!userData.id && (
              <div className="d-flex">
                <NavLink className="nav-link text-white px-3" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-link text-white px-3" to="/register">
                  Register
                </NavLink>
              </div>
            )}

            {userData.id && (
              <button
                className="btn btn-success btn-outlined rounded-pill xt-white mx-2"
                style={{
                  border: 'none',
                  height: '40px',
                  width: '100px',
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        {/* Mobile Nav */}

        <nav className="navbar navbar-expand-lg bg-dark d-flex flex-column d-md-none px-3">
          <div className="d-flex align-items-center justify-content-between w-100">
            <NavLink
              className="nav-link p-2"
              to="/"
              onClick={() => setShowMenu(false)}
            >
              <img src={logo} style={{ height: '40px' }} className="m-1" />
            </NavLink>
            <div className="p-2">
              {showMenu ? (
                <AiOutlineClose
                  onClick={handleNav}
                  className="text-white fs-1"
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <GiHamburgerMenu
                  onClick={handleNav}
                  className="text-white fs-1"
                  style={{ cursor: 'pointer' }}
                />
              )}
            </div>
          </div>
          {showMenu && (
            <div className="d-flex flex-column align-items-center">
              <NavLink
                className="nav-link text-white p-2"
                to="/"
                onClick={() => setShowMenu(false)}
              >
                Home
              </NavLink>

              {userData.role === SD_Roles.ADMIN ? (
                <div className="d-flex flex-column align-items-center">
                  <NavLink
                    className="nav-link text-white p-2"
                    to="/menuItem/menuitemlist"
                    onClick={() => setShowMenu(false)}
                  >
                    Menu Item
                  </NavLink>
                  <NavLink
                    className="nav-link text-white p-2"
                    to="/order/myorders"
                    onClick={() => setShowMenu(false)}
                  >
                    My Orders
                  </NavLink>
                  <NavLink
                    className="nav-link text-white p-2"
                    to="/order/allOrders"
                    onClick={() => setShowMenu(false)}
                  >
                    All Orders
                  </NavLink>
                </div>
              ) : (
                <div>
                  <NavLink
                    className="nav-link text-white p-2"
                    to="/order/myorders"
                    onClick={() => setShowMenu(false)}
                  >
                    Orders
                  </NavLink>
                </div>
              )}
              <NavLink
                className="nav-link text-white p-2"
                aria-current="page"
                to="/shoppingCart"
                onClick={() => setShowMenu(false)}
              >
                Cart <i className="bi bi-cart"></i>{' '}
                {userData.id && `(${shoppingCartFromStore.length})`}
              </NavLink>

              {!userData.id && (
                <div className="d-flex flex-column align-items-center">
                  <NavLink
                    className="nav-link text-white p-2"
                    to="/login"
                    onClick={() => setShowMenu(false)}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    className="nav-link text-white p-2"
                    to="/register"
                    onClick={() => setShowMenu(false)}
                  >
                    Register
                  </NavLink>
                </div>
              )}

              {userData.id && (
                <button
                  className="btn btn-success btn-outlined rounded-pill xt-white mx-2 my-3"
                  style={{
                    border: 'none',
                    height: '40px',
                    width: '100px',
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </nav>
      </header>
    </>
  );
}

export default Header;
