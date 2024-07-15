import React, { useEffect, useState } from "react"
import NeubrutalismButton from "./Components/button"
import BackgroundGrid from "./Components/Background";
import Stepper from "./Components/Steps";
import Footer from "./Components/Footer";
function App() {
  const [url, seturl] = useState("");
  const [data, setData] = useState("");

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    seturl(e.target.value)
    
  }


   
  const handleUpload = () => {
    if (url) {
      fetch("/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url, 
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
         setData(data.id)
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } else {
      setData("URL is empty");
    }
  };
  

  return (
    <div className="" >
      <div>
        <h1 className="bg-black text-white text-3xl font-mono flex justify-center" >SHORT URL</h1>
       
        <div className="  p-20 bg-red-100 items-center " >
         
          <div>
            <Stepper />
          </div>
          
          <div className="bg-white p-6 border mr-10 ml-10 rounded-xl border-black " >
            <h1 className="flex justify-center text-blue-900 font-bold text-3xl" >PASTE YOUR URL TO GET SHORT URL</h1>
            <div className="flex justify-center p-2" >
              <input
                type="text"
                value={url}
                onChange={handleChange}
                className="p-2 border  border-black"
                placeholder="enter url"
              />

              <div className="" >
                <button className="bg-red-500 text-white p-2 border border-black  "
                 onClick={handleUpload}
                >GET URL</button>
                {/* <NeubrutalismButton text={"GET URL"} handleChange={handleUpload} /> */}
              </div>
            </div>
            <div>
              <div className="bg-black  text-white p-2 flex justify-center  " >
                {data}
              </div>
            </div>
          </div>
         
        
         
          
        </div>

       
      </div>

      <div className="bg-black" >
        
        <Footer/>
      </div>
    
    </div>
  )
}

export default App
