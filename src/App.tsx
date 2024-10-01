import { useState } from 'react'



function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen =() => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
     <div className='flex items-center w-full h-[100vh] bg-slate-300'>
        <div onClick={handleOpen}>This will open</div>

          {isOpen && (
        <div className='flex flex-col w-[542px] bg-white'>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </div>
        )}
     </div>
    </>
  )
}

export default App
