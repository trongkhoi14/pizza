import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Transition from "../utils/Transition";
import { RxAvatar } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { actionLogout as actionUserLogout } from "../redux/slice/userSlice";
import { actionLogout as actionEmployeeLogout } from "../redux/slice/employeeSlice";
import { useTranslation } from "react-i18next";
import cartSlice from "../redux/slice/cartSlice";

function UserMenu({isUser = true}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { t } = useTranslation();
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      setDropdownOpen(!dropdownOpen);
      if(isUser){
        dispatch(actionUserLogout());
        dispatch(cartSlice.actions.clearState([]))
        navigate("/",{
          replace: true,
        });
      }else{
        dispatch(actionEmployeeLogout());
        navigate("/admin/login",{
          replace: true,
        });
      }

    } catch (error) {
    }
  };

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });


  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <RxAvatar className="md:text-4xl text-3xl" />
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-[100px] bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <ul>
            <li>
              <Link
                className="font-medium cursor-pointer text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/account/profile"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {t("content.profile")}
              </Link>
            </li>
            <li>
              <p
                className="font-medium cursor-pointer text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                onClick={handleLogout}
              >
                {t("content.logout")}
              </p>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default UserMenu;
