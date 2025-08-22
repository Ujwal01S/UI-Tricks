import { useState } from "react";
import QuillDemo from "./components/react-quill";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <div className='flex items-center w-full h-[100vh] '>
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

      <QuillDemo />
    </>
  );
}

export default App;
