import React from "react";
import '../styles/Home.css';
import HomeLeft from "../components/HomeLeft";
import HomeRight from "../components/HomeRight";
import Post from "../components/Posts";
import Status from '../components/Status';
import { useSelector } from "react-redux";



const Home = () => {
    const {homePost} = useSelector(state => state)
    return(
        <div className="home">
            <div className="home-bottom">
                <div className="home-bottomleft">
                    <HomeLeft />
                </div>
                <div className="home-bottomiddle">
                    <Status/>
                    { homePost && homePost.loading ? <p> Loading ...</p>
                    : homePost.results === 0 ? <h4>No Post Available</h4>
                    : <Post /> 
                    }
                </div>  
                <div className="home-bottomright">
                    <HomeRight />
                </div>
            </div>
        </div>
    )
}

export default Home;