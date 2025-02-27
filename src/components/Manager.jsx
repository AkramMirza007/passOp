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
        if (passwordRef.current.type === "password") {
            passwordRef.current.type = "text";
            ref.current.src = "https://icon-library.com/images/white-eye-icon/white-eye-icon-4.jpg";
        } else {
            passwordRef.current.type = "password";
            ref.current.src = "https://icon-library.com/images/white-eye-icon/white-eye-icon-4.jpg";
        }
    };
    
    const savePassword = () => {
        if (form.site === '' || form.password === '' || form.username === '') {
            alert("please add all valid info")
            
        } else {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setform({ site: "", username: "", password: "" })
        }

    }
    const deletePassword = (id) => {
        console.log("Deleting password with id", id);
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
        if (form.site != '' || form.password != '' || form.username != ''){
            savePassword() 
        }


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
            theme: "dark",

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
            <div className='text-white w-full h-[40vh] md:h-auto flex flex-col items-center  font-medium tracking-wide p-5 gap-[2vw] mt-5'>
                <input placeholder='Enter Website URL' value={form.site} onChange={handleChange} type="text" className='w-full outline-none placeholder:text-white rounded-md bg-slate-800 px-3 py-1 shadow-xl border-2 h-fit' name="site" id="site" />

                <div className='w-full flex flex-col md:flex-row justify-between items-center gap-5 relative'>
                    <input placeholder='Enter Username' value={form.username} onChange={handleChange} type="text" className='w-full md:w-[70%] outline-none placeholder:text-white rounded-md bg-slate-800 px-3 py-1 shadow-xl border-2' name="username" id="username" />
                    <input placeholder='Enter Password' ref={passwordRef} value={form.password} onChange={handleChange} type="password" className='mt-2 md:mt-0 w-full md:w-[25%] outline-none placeholder:text-white rounded-md bg-slate-800 px-3 py-1 shadow-xl border-2' name="password" id="password" />
                    <img className='absolute w-[1.5rem] h-[1.5rem] z-10 right-[1rem] md:right-[1.5rem] md:top-1/2 top-[80%] transform -translate-y-1/2' src="https://icon-library.com/images/white-eye-icon/white-eye-icon-4.jpg" ref={ref} onClick={showPassword} alt="" />
                </div>

                <button onClick={savePassword} className='w-full md:w-auto bg-slate-800 hover:bg-white hover:text-slate-800 px-3 py-1 rounded-md shadow-xl border-2 flex items-center justify-center gap-2'>
                    Save
                    <lord-icon colors="primary:#68ffff,secondary:#68ffff" src="https://cdn.lordicon.com/ulkvesen.json" trigger="hover"></lord-icon>
                </button>
            </div>
            <div className="passwords w-full flex flex-col items-center justify-center overflow-hidden text-white">
                <h2 className='text-slate-900 text-[1.2vh] capitalize md:text-[1.5vw]'>your passwords</h2>
                {passwordArray.length === 0 && <div className='text-slate-900 text-[1.2vh] capitalize md:text-[1.5vw]'>No Password to Show</div>}
                {passwordArray.length != 0 &&
                    <div className="table-auto w-[90%] content-center text-center">

                        <div class="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] grid-rows-[repeat(auto-fill,minmax(10rem,1fr))] items-center gap-4">
                            {passwordArray.map((item, index) => (
                                <div key={index} class="bg-slate-800 duration-1000 transition-all ease-in-out text- w-full p-[1.5vh] md:p-[1vw] rounded-md border border-[#68ffff]">
                                    <div  className='w-full  flex flex-col justify-center border-b-2 px-[1vw] bg-slate-200 border-black items-center'>
                                        <button className='w-fit  flex items-center justify-evenly text-center px-[1vw] py-1 mt-1 text-white bg-slate-800 rounded-xl outline-none'> <p>URL</p>  <div className="lordiconcopy h-full size-7 cursor-pointer flex items-center justify-center" onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wzwygmng.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff,secondary:#ffffff"
                                                    style={{ "width": "2.5vh", "height": "2.5vh",  "paddingLeft": "0.3vh" }}>
                                                </lord-icon>
                                            </div></button>
                                        <p className='text-center break-words h-fit w-[90%] text-slate-900 my-2'>{item.site}</p>
                                    </div>
                                    <div  className='w-full flex flex-col justify-center border-b-2 px-[1vw] bg-slate-200 border-black items-center'>
                                        <button className='w-fit flex items-center justify-evenly text-center px-[1vw] py-1 mt-1 text-white bg-slate-800 rounded-xl outline-none'> <p>USERNAME</p>  <div className="lordiconcopy size-7 cursor-pointer flex items-center justify-center" onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wzwygmng.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff,secondary:#ffffff"
                                                    style={{ "width": "2.5vh", "height": "2.5vh", "paddingLeft": "0.3vh" }}>
                                                </lord-icon>
                                            </div></button>
                                        <p className='text-center break-words text-slate-900 h-fit w-[90%] my-2'>{item.username}</p>
                                    </div>
                                    <div  className='w-full flex flex-col justify-center border-b-2 px-[1vw] bg-slate-200 border-black items-center'>
                                        <button className='w-fit flex items-center justify-evenly text-center px-[1vw] py-1 mt-1 text-white bg-slate-800 rounded-xl outline-none'> <p>PASSWORD</p>  <div className="lordiconcopy size-7 cursor-pointer flex items-center justify-center" onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wzwygmng.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff,secondary:#ffffff"
                                                    style={{ "width": "2.5vh", "height": "2.5vh", "paddingLeft": "0.3vh" }}>
                                                </lord-icon>
                                            </div></button>
                                        <p className='text-center text-slate-900 break-words h-fit w-[90%] my-2'>{item.password}</p>
                                    </div>
                                    <div className='w-full  mt-3 h-fit flex gap-[1vw]'> <div className='w-[50%] text-center px-[1vw] text-white bg-slate-400 outline-none '><div onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wuvorxbv.json"
                                                    trigger="hover"
                                                    colors="primary: #1e293b ,secondary:#000000"
                                                    style={{ "width": "2.5vh", "height": "2.5vh", "paddingTop": "0.3vh", "paddingLeft": "0.3vh" }}>
                                                </lord-icon>
                                            </div></div> <div className='w-[50%] text-center px-[1vw] text-white bg-slate-400  outline-none '><div onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/drxwpfop.json"
                                                    trigger="hover"
                                                    colors="primary: #1e293b ,secondary:#000000"
                                                    style={{ "width": "2.5vh", "height": "2.5vh", "paddingTop": "0.3vh", "paddingLeft": "0.3vh" }}>
                                                </lord-icon>
                                            </div></div></div>
                                </div>
                            ))}
                        </div>
                    </div>}
            </div>

        </div>

    )
}

export default Manager
