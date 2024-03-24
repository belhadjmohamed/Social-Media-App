import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux'; 
import {useParams} from 'react-router-dom';
import { getPostOne } from '../redux/actions/postAction';
import PostCardHeader from '../components/PostCardHeader';
import PostCardBody from '../components/PostCardBody';
import PostCardFooter from '../components/PostCardFooter';
import PostComments from '../components/PostComments';
import InputPostComment from '../components/InputPostComment';


const Post = () => {
  const {auth,detailPost} = useSelector(state => state);
  const {id} = useParams();
  const [post, setpost] = useState([]);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getPostOne({detailPost,auth,id}));
      if(detailPost.length > 0 ){
        const newPost = detailPost.filter(item => item._id === id)
        setpost(newPost)
      }
  },[detailPost,auth,id,dispatch])

  return (
    <div style={{width:'600px', maxWidth:'100%',margin:'auto'}}>
      {
        post && post.length > 0 && post.map((post) => (
          <div className='postCards' key={post._id} style={{backgroundColor:'rgb(227, 167, 235)',padding : "1rem", margin: "1rem auto", borderRadius:'10px', boxShadow:'3px 3px 5px gray',width:'500px'}}>
            <PostCardHeader pos = {post}/>
            <PostCardBody pos = {post}/>
            <PostCardFooter pos = {post}/>
            <PostComments pos={post} />
            <InputPostComment pos={post}/>
          </div>
        ))
      }
    </div>
  )
}

export default Post;