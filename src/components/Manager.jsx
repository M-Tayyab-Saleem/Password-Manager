import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

import "react-toastify/dist/ReactToastify.css";
const Manager = () => {
  let [toggle, setToggle] = useState(false);
  let [form, setForm] = useState({ site: "", username: "", password: "", id: "" });
  let [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  let handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  let savePassword = () => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){
    setPasswordArray([...passwordArray, {...form , id:uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form , id:uuidv4()}]));
    console.log([...passwordArray, {...form , id:uuidv4()}]);
    setForm({ site: "", username: "", password: "", id: "" })
  }else{
    prompt("All input have more than 3 characters")
  }
  };

  let copyText = (text) => {
    navigator.clipboard.writeText(text);
    };

    let editPassword = (id)=> {
      setForm(passwordArray.filter((i)=> i.id === id)[0]);
      setPasswordArray(passwordArray.filter((item)=> id !== item.id ));
   }
   let deletePassword = (id)=> {
    let c = confirm("Do REALLY WANT TO DELETE THIS PASSWORD");
    if(c){
    setPasswordArray(passwordArray.filter((item)=> id !== item.id ));
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item)=> id !== item.id )));
    }
   }

  return (
    <div className="min-h-[83.5vh]">
       <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="mx-auto max-w-2xl mt-5">
        <h1 className="font-bold text-3xl text-center">
          <span className="text-green-600 font-bold">&lt;</span>
          Pass
          <span className="text-green-600 font-bold">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-center">Your own Password Manager</p>
        <div className="flex flex-col items-center text-black p-4 gap-8">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            name="site"
            type="text"
            className="rounded-full w-full border border-green-500 p-4 py-1"
          />
          <div className="flex flex-col md:flex-row w-full md:gap-8 gap-2">
            <div className="div md:gap-8 gap-2 mt-6 w-full">
            <input
              value={form.username}
              onChange={handleChange}
              name="username"
              placeholder="Enter Username"
              type="text"
              className="rounded-full w-full border border-green-500 p-4 py-1"
            /></div>
            <div className="relative md:gap-8 gap-2 mt-6">
              <input
                value={form.password}
                onChange={handleChange}
                name="password"
                placeholder="Enter Password"
                type={toggle ? "text" : "password"}
                className="rounded-full border border-green-500 p-4 py-1 md:w-40 w-full"
              />
              {toggle ? (
                <i
                  className="absolute fa-solid fa-eye right-2 top-2 cursor-pointer"
                  onClick={() => setToggle(false)}
                ></i>
              ) : (
                <i
                  className=" absolute fa-solid fa-eye-slash right-2 top-2 cursor-pointer"
                  onClick={() => setToggle(true)}
                ></i>
              )}
            </div>
          </div>
          <button
            onClick={savePassword}
            className="rounded-full bg-green-500 flex justify-center items-center px-4 py-1 gap-3 border hover:bg-green-400 border-green-900 w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="table w-full">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 ? (
            <div>No Passwords</div>
          ) : (
            <table className="table-auto rounded-md overflow-hidden md:w-full text-center m-auto mb-11">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((pass, index) => {
                  return (
                    <tr key={index}>
                      <td className="border-white py-2 px-2 ">
                        <a href="pass.site" target="_blank">
                          {pass.site}
                        </a>
                        <i
                          className="fa-solid action-btn cursor-pointer ml-2 fa-copy "
                          onClick={() => {
                            copyText(pass.site);
                          }}
                        ></i>
                      </td>
                      <td className=" border-white py-2 px-2">
                        {pass.username}
                        <i
                          className="fa-solid action-btn cursor-pointer fa-copy ml-2"
                          onClick={() => {
                            copyText(pass.username), notify();
                          }}
                        ></i>
                      
                      </td>
                      <td className="border-white py-2 px-2">
                        {pass.password}
                        <i
                          className="fa-solid action-btn ml-2 fa-copy cursor-pointer"
                          onClick={() => {
                            copyText(pass.password);
                          }}
                        ></i>
                       
                      </td>
                      <td className="border-white py-2 px-2">
                        <span className="mx-2 action-btn cursor-pointer" onClick={()=>{editPassword(pass.id)}}><i className="fa-solid fa-pen-to-square" ></i></span>
                        <span className="mx-2 action-btn cursor-pointer" onClick={()=>{deletePassword(pass.id)}}><i className="fa-solid fa-delete-left"></i></span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
