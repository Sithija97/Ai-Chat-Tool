import home from "../assets/home.svg";
import graph from "../assets/graph.svg";
import people from "../assets/people.svg";
import docs from "../assets/docs.svg";
import settings from "../assets/settings.svg";
import { FC } from "react";

export const Sidebar: FC = () => {
  return (
    <div className="flex">
      <aside className="fixed flex flex-col items-center w-16 h-screen py-8 overflow-y-auto bg-white border-r rtl:border-l rtl:border-r-0 ">
        <nav className="flex flex-col flex-1 space-y-6">
          <a href="#">
            <img
              className="w-auto h-6 "
              src="https://merakiui.com/images/logo.svg"
            />
          </a>

          <a
            href="#"
            className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg  hover:bg-gray-100"
          >
            <img src={home} className="w-6 h-6" />
          </a>

          <a
            href="#"
            className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg  hover:bg-gray-100"
          >
            <img src={graph} className="w-6 h-6" />
          </a>

          <a
            href="#"
            className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg  hover:bg-gray-100"
          >
            <img src={docs} className="w-6 h-6" />
          </a>

          <a
            href="#"
            className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg  hover:bg-gray-100"
          >
            <img src={people} className="w-6 h-6" />
          </a>
        </nav>

        <div className="flex flex-col space-y-6">
          <a
            href="#"
            className="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg  bg-gray-100"
          >
            <img src={settings} className="w-6 h-6" />
          </a>

          <a href="#">
            <img
              className="object-cover w-8 h-8 rounded-full"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100"
              alt=""
            />
          </a>
        </div>
      </aside>
    </div>
  );
};
