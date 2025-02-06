import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();

    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setpasswordArray,] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
        else {
            alert("write something")
        }


    }, [])



    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("https://icon-library.com/images/white-eye-icon/white-eye-icon-4.jpg")) {
            ref.current.src = "https://icon-library.com/images/white-eye-icon/white-eye-icon-4.jpg"
            passwordRef.current.type = "password"

        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "https://icon-library.com/images/white-eye-icon/white-eye-icon-4.jpg"
        }
    }
    const savePassword = () => {
        setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        setform({ site: "", username: "", password: "" })
        if (setform({}) === 0) {
            alert("dsjjjsbc x")
        }

    }
    const deletePassword = (id) => {
        console.log("Deleting password eith id", id);
        let c = confirm("confirm to delete")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
        // setpasswordArray([...passwordArray, {...form, id: uuidv4()}])
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        // if (passwordArray === 0){
        // alert("write something")
        // }
    }
    const editPassword = (id) => {
        console.log("editing password eith id", id);

        setform(passwordArray.filter(i => i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))


        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        // if (passwordArray === 0){
        // alert("write something")
        // }
    }



    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        navigator.clipboard.writeText(text)
    }

    return (



        <div className='w-full h-[60vh]  relative md:myContainer md:p-0'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-[100%] w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
            <div className='text-white w-full h-full md:h-auto flex flex-col md:flex-row bg-red-600 font-medium tracking-wide p-5 gap-10 mt-5'>
                <input placeholder='Enter Website URL' value={form.site} onChange={handleChange} type="text" className='w-full outline-none placeholder:text-white rounded-md bg-slate-800 px-3 py-1 shadow-xl border-2 h-fit' name="site" id="site" />

                <div className='w-full flex flex-col md:flex-row justify-between items-center gap-5 relative'>
                    <input placeholder='Enter Username' value={form.username} onChange={handleChange} type="text" className='w-full md:w-[70%] outline-none placeholder:text-white rounded-md bg-slate-800 px-3 py-1 shadow-xl border-2' name="username" id="username" />
                    <input placeholder='Enter Password' ref={passwordRef} value={form.password} onChange={handleChange} type="password" className='mt-2 md:mt-0 w-full md:w-[25%] outline-none placeholder:text-white rounded-md bg-slate-800 px-3 py-1 shadow-xl border-2' name="password" id="password" />
                    <img className='absolute w-[1.5rem] h-[1.5rem] z-10 right-[1rem] md:right-[1.5rem] top-1/2 transform -translate-y-1/2' src="https://icon-library.com/images/white-eye-icon/white-eye-icon-4.jpg" ref={ref} onClick={showPassword} alt="" />
                </div>

                <button onClick={savePassword} className='w-full md:w-auto bg-violet-200 hover:text-white hover:bg-slate-500 px-3 py-1 rounded-md shadow-xl border-2 flex items-center justify-center gap-2'>
                    Save
                    <lord-icon src="https://cdn.lordicon.com/ulkvesen.json" trigger="hover"></lord-icon>
                </button>
            </div>
            <div className="passwords w-full flex flex-col items-center justify-center text-white">
                <h2>your passwords</h2>
                {passwordArray.length === 0 && <div>No Password to Show</div>}
                {passwordArray.length != 0 &&
                    <table className="table-auto w-[90%] content-center bg-slate-800 text-center">
                        <thead>
                            <tr className='bg-slate-800 border-y-2 px-2'>
                                <th>URL OF WEBSITE</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Edits</th>
                            </tr>
                        </thead>
                        <tbody className='rounded-sm'>
                            {passwordArray.map((item, index) => (
                                <tr key={index}>
                                    <td className='py-2 border border-white text-center flex justify-center items-center'>
                                        <div className='flex items-center justify-center '>
                                            <a className=' text-center overflow-hidden whitespace-nowrap max-w-[70%] bg-green-500' href={item.site} target="_blank">{item.site}</a>
                                            <div className="lordiconcopy size-7 cursor-pointer ml-2" onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wzwygmng.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff,secondary:#ffffff"
                                                    style={{ "width": "2.5vh", "height": "2.5vh", "paddingTop": "0.3vh", "paddingLeft": "0.3vh" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                    <td className='py-2 border border-white text-center flex justify-center items-center'>
                                        <div className='flex items-center justify-center '>
                                            <a href={item.password}>{item.username}</a>
                                            <div className="lordiconcopy size-7 cursor-pointer ml-2" onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wzwygmng.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff,secondary:#ffffff"
                                                    style={{ "width": "2.5vh", "height": "2.5vh", "paddingTop": "0.3vh", "paddingLeft": "0.3vh" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.password}>{item.password}</a>
                                            <div className="lordiconcopy size-7 cursor-pointer ml-2" onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wzwygmng.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff,secondary:#ffffff"
                                                    style={{ "width": "2.5vh", "height": "2.5vh", "paddingTop": "0.3vh", "paddingLeft": "0.3vh" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center gap-2'>
                                            <div onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wuvorxbv.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff,secondary:#66d7ee"
                                                    style={{ "width": "2.5vh", "height": "2.5vh", "paddingTop": "0.3vh", "paddingLeft": "0.3vh" }}>
                                                </lord-icon>
                                            </div>
                                            <div onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/drxwpfop.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff,secondary:#66d7ee"
                                                    style={{ "width": "2.5vh", "height": "2.5vh", "paddingTop": "0.3vh", "paddingLeft": "0.3vh" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
            </div>

        </div>

    )
}

export default Manager
