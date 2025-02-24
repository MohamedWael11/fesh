import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import RecentProdect from './component/RecentProdect/RecentProdect'
import PopularCatogry from './component/PopularCatogry/PopularCatogry'
import StaticSlider from './component/StaticSlider/StaticSlider'





export default function Home() {

    

return (
    <div>
        <StaticSlider/>
        <PopularCatogry/>
        <RecentProdect/>
    </div>
)

}
