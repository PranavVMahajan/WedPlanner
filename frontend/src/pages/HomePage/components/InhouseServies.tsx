
import { useState } from "react"
const InhouseServies = () => {
  return (
    <>
        <div className="w-[80%] mx-auto py-10">
            <div className="text-2xl py-10">Inhouse Services</div>
               <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                   {
                     Array(4).fill(null).map((_,i)=>{
                        return <Card key={i}/>
                     })
                   }
               </div>
        </div>
    </>
  )
}

export default InhouseServies

const Card =()=>{

  const [isHover,setisHover] = useState(false)

  return <div onMouseEnter={()=>setisHover(true)} onMouseLeave={()=>setisHover(false)} className="card w-full">
  <div className="img rounded-lg overflow-hidden">
      <img src="https://image.wedmegood.com/resized-nw/570X/uploads/wmg_services/genie_dweb.jpg" alt="" className={`w-full transition-all duration-300 ${isHover?'scale-150':''} `} />
  </div>
  <h1 className="text-center font-semibold text-xl"> Wedsts</h1>
  <p className="text-center">WMG At Home, Family Makeup Service</p>
  <div className="flex justify-center items-center py-5">
  <button className="py-3 px-2 border-primary text-primary mx-auto hover:bg-primary hover:text-white transition-all duration-300">Know More</button>
  </div>
</div>
}