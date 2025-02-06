import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex w-100 text-white h-14 bg-slate-500 justify-between items-center shadow-xl border-2'>
      <div className="logo text-[2vw] font-bold ml-10 flex items-center justify-center">PassOP <lord-icon
    src="https://cdn.lordicon.com/khheayfj.json"
    trigger="hover"
    colors="primary:#ffffff,secondary:#66d7ee">
</lord-icon></div>
      <ul className='w-[50%]  flex items-center justify-center h-full '>
        <li className=' w-full flex justify-end mr-10 items-center gap-12 h-full text-[1.3vw] capitalize font-semibold'>
          <a href="#" className=' hover:text-slate-500 hover:bg-white py-[0.3rem] px-[10px] rounded-lg transition-all '  >home</a>
          <a href="#" className=' hover:text-slate-500 hover:bg-white py-[0.3rem] px-[10px] rounded-lg transition-all' >about</a>
          <a href="#" className=' hover:text-slate-500 hover:bg-white py-[0.3rem] px-[10px] rounded-lg transition-all ' >settings</a>
        </li>
      </ul>
    </nav>

  )
}

export default Navbar
