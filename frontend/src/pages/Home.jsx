import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewLetterBox from '../components/NewLetterBox'
import CategoryFilters from '../components/CategoryFilters'
import VideoHero from '../components/VideoHero'
import ShopByCategory from '../components/ShopByCategory'


const Home = () => {
  return (
    <div >
            <CategoryFilters />

      <Hero/>
      <LatestCollection/>
      <VideoHero/>
      <BestSeller/>
      <ShopByCategory/>
      {/* <OurPolicy/> */}
      <NewLetterBox/>

    </div>
  )
}

export default Home
