import React from "react";
import CardImage from "./credit-card.png";
import { Link, useLocation } from "react-router-dom";
import { nanoid } from "nanoid";

import { FaHome, FaWallet, FaUserCog, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, getIsLoggedIn } from "../../store/usersSlice";
import PopupWallet from "../../ui/Popup/PopupWallet";

const SidebarMenu = (props) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());

  const [close, setClose] = React.useState(false);

  const handleClose = () => {
    setClose(!close);
  };

  const handleButton = (e) => {
    e.preventDefault();
    dispatch(LogOut());
  };

  const handlePopup = (e) => {
    e.preventDefault();
    setClose(true);
  };

  const listMenu = [
    {
      _id: nanoid(),
      name: "Главная",
      icon: <FaHome className="me-2" />,
      link: `/${isLoggedIn ? isLoggedIn.userId : ""}`,
    },
    {
      _id: nanoid(),
      name: "Кошелек",
      icon: <FaWallet className="me-2" />,
      link: `/history/${isLoggedIn ? isLoggedIn.userId : ""}`,
    },
    {
      _id: nanoid(),
      name: "Настройки",
      icon: <FaUserCog className="me-2" />,
      link: `/settings/${isLoggedIn ? isLoggedIn.userId : ""}`,
    },
  ];

  return (
    <>
      <PopupWallet handleClose={handleClose} close={close} />
      <nav
        id="sidebarMenu"
        className="col-md-3 col-lg-3 d-md-block sidebar collapse"
      >
        <div className="position-sticky py-4 px-3 sidebar-sticky">
          <ul className="nav flex-column h-100">
            {listMenu.map((el) => (
              <li key={el._id} className="nav-item">
                <Link
                  className={`nav-link ${el.link === pathname ? "active" : ""}`}
                  to={el.link ? el.link : "/"}
                >
                  {el.icon}
                  {el.name}
                </Link>
              </li>
            ))}

            <li className="nav-item featured-box mt-lg-5 mt-4 mb-4">
              <img src={CardImage} className="img-fluid" alt="" />

              <a onClick={handlePopup} className="btn custom-btn" href="#">
                Добавить транзакцию
              </a>
            </li>

            <li className="nav-item border-top mt-auto pt-2">
              <a className="nav-link" onClick={(e) => handleButton(e)} href="#">
                <FaSignOutAlt className="me-2" /> Выход
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default SidebarMenu;
