import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Create = () => {
const [title, setTitle] = useState('')
const [body, setBody] = useState('')
const [author, setAuthor] = useState('mario')
const [isPending, setIsPending] = useState(false)
const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    const blog = { title, body , author};
    
    fetch('http://localhost:8000/blogs', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(blog)
    }) .then(() => {
        console.log('new blog added');
        setIsPending(false);
        navigate('/');
       
    })
     
};

    return (  
        <div className="create">
            <h2>Add a new post</h2>
            <form onSubmit = {handleSubmit}>
                <label>Blog title: </label>
                <input 
                type="text" 
                required
                value = {title}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                />
                <label>Blog author: </label>
                <textarea 
                required
                value = {body}
                onChange={(e) => {
                    setBody(e.target.value)
                }}
                ></textarea>
                <label>Blog author: </label>
                <select value = "mario"
                onChange= {(e) =>{
                    setAuthor(e.target.value)
                }}>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {!isPending && <button >Add blog</button>}
                {isPending && <button disabled>Adding blog...</button>}
                <p>{ title }</p>
                <p>{ body }</p>
                <p>{ author }</p>
            </form>
        </div>
    );
}
 
export default Create;