import React from 'react'
import { useSelector } from 'react-redux';
import PostCardBody from '../components/PostCardBody';
import PostCardFooter from '../components/PostCardFooter';
import PostCardHeader from '../components/PostCardHeader';
import PostComments from './PostComments';
import InputPostComment from './InputPostComment';

const Post = () => {
  const {homePost}  = useSelector(state => state);

  return (
    <div className='posts'>
      {
        homePost && homePost.post.length > 0 && homePost.post.map((post) => (
          <div className='postCards' key={post._id} style={{backgroundColor:'rgb(43, 43, 150)',padding : "1rem", margin: "1rem auto", borderRadius:'10px', boxShadow:'3px 3px 5px gray',width:'500px'}}>
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