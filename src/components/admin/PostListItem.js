import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PostListItem(props) {
    const user = useSelector(store => store.auth.user); 
    function deletePost() {
        var option={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${user.token}`  // Include the token in the headers
            }
        }
        axios.delete('http://127.0.0.1:8000/movies1'+props.post.id,option).then(response=>{
            alert(response.data.message)
            props.refresh()
        })
    }
    return <div className="card">
    <div className="card-body">
        {props.post.title}
        <button className="btn btn-primary float-right" onClick={deletePost}>Delete</button>
        <Link to={"/blog/posts/"+props.post.id+"/edit"} className="btn btn-primary float-right">Edit</Link>
        <Link to={"/blog/posts/"+props.post.id} className="btn btn-info float-right">View</Link>
    </div>
</div>
}
export default PostListItem;