

const WeddingCategories = () => {
  return (
    <>
          <h1 className="w-[80%] mx-auto text-start text-2xl font-[PoppinsRegular]">Wedding Category</h1>
          <div className="grid grid-cols-2 w-[80%] mx-auto py-5 gap-x-2 gap-y-3">
            {
              Array(10).fill(null).map((_,i)=>{
                return <div key={i} className="w-full flex items-center bg-[#d8dffc] justify-between">
                  <div className="data px-10">
                      <h2 className="text-3xl">Venues</h2>
                      <p>Banquet Halls, Marriage Garden/ Lawns,</p>
                  </div>
                  <div className="img">
                    <img className="rounded-l-full" src="https://image.wedmegood.com/resized/250X/uploads/m_v_cat_image/1/venues.jpg" alt="" />
                  </div>

                </div>
              })
            }
          </div>
    </>
  )
}

export default WeddingCategories