import Hero from "./components/Hero"
import PopularSearch from "./components/PopularSearch"
import PopularDanceMusic from "./components/PopularDanceMusic"
import WeddingCategories from "./components/WeddingCategories"
import InhouseServies from "./components/InhouseServies"

const HomePage = () => {
  return (
    <div>
      <Hero />
      <PopularSearch />
      <PopularDanceMusic />
      <WeddingCategories />
      <InhouseServies />
    </div>
  )
}

export default HomePage