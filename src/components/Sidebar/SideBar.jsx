import { NavLink } from "react-router-dom";
import { FaBars, FaChessKing } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import {FaChessBoard} from  "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../../redux/slice/todo"
import { fetchTodos2 } from "../../redux/slice/todo2";
import { fetchTodos3 } from "../../redux/slice/todo3";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaChessBoard />,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: <FaChessKing />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 10px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  const [username, setUsername] = useState('');
  const HandleClick = () => {
    dispatch(fetchTodos(username)); 
    dispatch(fetchTodos2(username)); 
    dispatch(fetchTodos3(username)); 
    setUsername('');
  }

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "230px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                    CHESSAPI 
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search Usename"
                  id="userdata"
                  name="userdata"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              )}
            </AnimatePresence>
             <div className="bars">
              <BiSearch onClick={ HandleClick }/>
            </div>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
