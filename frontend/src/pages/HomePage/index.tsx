import Hero from "./components/Hero"
import PopularSearch from "./components/PopularSearch"
import PopularVenue from "./components/PopularVenue"
import WeddingCategories from "./components/WeddingCategories"
import InhouseServies from "./components/InhouseServies"

const HomePage = () => {
  return (
    <div>
      <Hero />
      <PopularVenue />
      <PopularSearch />
      <WeddingCategories />
      <InhouseServies />
    </div>
  )
}

export default HomePage