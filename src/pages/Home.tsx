import HomeBanner from "../components/HomeBanner"

const Home = () => {
  console.log("Home page", window.innerWidth)
  return (
    <div>
      <HomeBanner />
    </div>
  )
}

export default Home
