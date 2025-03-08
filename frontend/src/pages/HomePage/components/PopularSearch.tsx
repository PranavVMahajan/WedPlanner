

const PopularSearch = () => {
  return (
    <>
    <div className='w-[80%] mx-auto py-10'>
        <h1 className="text-start text-2xl font-[PoppinsRegular] py-5">Popular Searches</h1>

          <div className="flex gap-x-2 mx-auto">
                {
                    Array(4).fill(null).map((_,i)=>{
                        return <div key={i} >
                            <div className="overflow-hidden object-cover mx-auto">
                                <img src="https://image.wedmegood.com/resized/300X/uploads/banner_image/3/photography.jpg" className="hover:scale-150 transition-all duration-300 w-full h-[260px]" alt="" />
                                <p>Wedding-Photographers</p>
                            </div>
                        </div>
                    })
                }
          </div>


    </div>
    </>
  )
}

export default PopularSearch