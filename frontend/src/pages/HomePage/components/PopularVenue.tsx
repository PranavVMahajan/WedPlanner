
import { Link } from 'react-router'
const PopularVenue = () => {
  return (
    <div className='w-[80%] mx-auto py-10'>
        <h1 className="text-start text-2xl font-[PoppinsRegular]">
            Popular Venue Searches
        </h1>
    
        <div className="grid grid-cols-3">
        {
            Array(3).fill(null).map((_,i)=>{
                return <div key={i} className='px-2 flex w-full gap-x-3 items-center'>
                    <img src="https://image.wedmegood.com/resized/300X/uploads/option_image/64/lawn-farm-house.jpg" className='rounded-md' alt="" />
                    <div className="data">
                        <h1>Banquet-halls</h1>
                        <ul className="flex items-center gap-x-2 text-primary">
                            <li>KoregaonPark</li>
                            <li>Pune</li>
                        </ul>
                        <Link to="#" className='text-primary underline'>All Location</Link>
                    </div>
                </div>
            })
        }
        </div>

    </div>
  )
}

export default PopularVenue