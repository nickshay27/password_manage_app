import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:4003/");
    let passwords = await req.json();

    console.log(passwords);
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const copyText = (text) => {
    toast("📄 Copy to Clickboard Succesfull", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
    const eyeIcon = "/images/eye.png";
    const hiddenIcon = "/images/hidden.png";
    ref.current.src = showPassword ? hiddenIcon : eyeIcon;
  };
  const savePassword = async () => {
    // Destructure form values
    const { site, username, password } = form;

    // Check if all fields have length greater than 3
    if (site.length > 3 && username.length > 3 && password.length > 3) {
      //If any such id exists in the db deleted
      await fetch("http://localhost:4003/", {
        method: "DELETE",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });

      // Create a new password object with unique ID
      const newPassword = { site, username, password, id: uuidv4() };

      // Update passwordArray with the new password
      const newPasswordArray = [...passwordArray, newPassword];
      setPasswordArray(newPasswordArray);
      await fetch("http://localhost:4003/", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });

      // Store passwordArray in localStorage
      //      localStorage.setItem("passwords", JSON.stringify(newPasswordArray));

      // Clear the form after saving
      setForm({ site: "", username: "", password: "" });

      // Display success message
      toast("✔️ Password saved!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      // Display error message if any field is invalid
      toast("Error: Password not saved! ");
    }
  };

  const deletePassword = async (id) => {
    toast("🗑️ Password Deleted Succesfull", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    const confirmation = window.confirm(
      "Are you sure you want to delete this password?"
    );
    if (confirmation) {
      console.log("Deleting Password With id", id);
      const updatedPasswords = passwordArray.filter((item) => item.id !== id);
      setPasswordArray(updatedPasswords);
      let res = await fetch("http://localhost:4003/", {
        method: "DELETE",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      //  localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    } else {
      console.log("Deletion canceled by user.");
    }
  };

  const editPassword = (id) => {
    console.log("Editing Password With id", id);
    setForm({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      ;
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-50 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <div className="p-3 md:p-0 md:mycontainer min-h-[88.2vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-lg text-center text-green-900">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 gap-8 items-center text-black">
          <input
            onChange={handleChange}
            value={form.site}
            placeholder="Enter Website URL"
            className="w-full p-4 py-1 rounded-full border border-green-500"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              onChange={handleChange}
              value={form.username}
              placeholder="Enter Your Username here"
              className="w-full p-4 py-1 rounded-full border border-green-500"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                onChange={handleChange}
                value={form.password}
                placeholder="Password"
                className="edge-hide-password-eye w-full  p-4 py-1 rounded-full border border-green-500"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
              />
              <span className="absolute right-0 top-1">
                <img
                  ref={ref}
                  src={showPassword ? "/images/hidden.png" : "/images/eye.png"}
                  className="p-1 m-0.1 cursor-pointer"
                  width={25}
                  alt="eye"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex items-center justify-center gap-2 px-8 py-2 w-fit bg-green-400 rounded-full hover:bg-green-300 border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>{" "}
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md  overflow-hidden mb-10">
              <thead className=" bg-green-800 text-white">
                <tr>
                  <th className="py-2 ">Website/URL</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-2 border border-white  text-centre ">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "20px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/wzwygmng.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" justify-center py-2 border border-white  text-centre ">
                        <div className="flex items-center justify-center">
                          <span> {item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "20px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/wzwygmng.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="  py-2 border border-white  text-centre ">
                        <div className=" flex items-center justify-center">
                          <span> {"*".repeat(item.password.length)}</span>
                          <div
                            className=" lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "20px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/wzwygmng.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" justify-center py-2 border border-white  text-centre ">
                        <span
                          className=" cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/wuvorxbv.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#000000,secondary:#000000"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className=" cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/drxwpfop.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#000000,secondary:#000000"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
