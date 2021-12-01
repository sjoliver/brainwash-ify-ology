import React, { useEffect, useState } from 'react';
import axios from '../../axios-instance';

import Loading from './Loading';

import { Outlet } from 'react-router-dom';
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import './PostForm.scss';

export default function PostForm (props) {
  // destructure props
  const { dbUser, interests } = props
  
  const initialPostState = {
    title: "",
    description: "",
    interest_id: "",
    upload_file: "",
    thumbnail: "",
    post_type: "",
    user_id: dbUser.id || null
  }

  //post state variable
  const [post, setPost] = useState(initialPostState);
  const [mode, setMode] = useState({
    isLoading: false,
    newPost: true
  })
  const [content, setContent] = useState({
    src: "",
    type: "",
    t_src: "",
    t_type: ""
  });

  // do this in case dbUser isn't initially loaded when accessing this page somehow (happened a lot in testing)
  useEffect(() => {
    setPost(prev => {
      return {
        ...prev,
        user_id: dbUser.id
      }
    })
  }, [dbUser])

  const checkFile = (file, fSize) => {
    if (!file) {
       return "";
      
    } else if (file.size / 1000000 > fSize) {
      return `File size too large! Must be under ${fSize} MB`
    }
    
    return file;
  }

  // File input change function
  const fileOnChange = (event) => {
    let upload_file = event.target.files[0];
    
    upload_file = checkFile(upload_file, 100);
  
    setPost(prev => {
      return {
        ...prev,
        upload_file
      }
    })
  } 
  

  // Thumbnail input change function
  const thumbnailOnChange = (event) => {
    let thumbnail = event.target.files[0];
  
    thumbnail = checkFile(thumbnail, 10);

    setPost(prev => {
      return {
        ...prev,
        thumbnail
      }
    })
  }
  
  
  // submit data to backend using axios and FormData
  const onSubmit = (event) => {
    event.preventDefault();
    
    if (post.upload_file && typeof post.upload_file === 'string') {
      alert("File size too large, please choose another file");
      return;
    }

    if (post.thumbnail && typeof post.thumbnail === 'string') {
      alert("Thumbnail size too large, please choose another file");
      return;
    }

    // create FormData object and populate with post state data
    const form = new FormData();
    Object.keys(post).forEach(key => {
      if (key === 'upload_file' || key === 'thumbnail') {
        if (post[key].name) {
          form.append(key, post[key]);
        }
      } else {
        form.append(key, post[key]);
      }
    })
    
    //reset post form
    setPost(() => initialPostState);
    setMode(() => {
      return {
        isLoading: true,
        newPost: false
      }
    });
    
    // axios config to set the content-type to let rails know we're sending form data
    const config = {     
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    
    axios
    .post('posts', form, config)
    .then(res => {
      setContent(() => {
        return {
          src: res.data.file,
          type: res.data.content,
          t_src: res.data.thumbnail_file,
          t_type: res.data.thumbnail_content
        }
      });
      setMode(() => {
        return {
          isLoading: false,
          newPost: true
        }
      });
    })
  }
  
  // Create props objects to pass to each element
  
  // Title Input props
  const titleInputProps = {
    name: "title",
    type: "text",
    placeholder: "Title",
    postState: post.title,
    onChange: event => setPost({...post, title: event.target.value})
  }
  
  // Description Input props
  const descInputProps = {
    name: "description",
    type: "text",
    placeholder: "Tell me aboot it...",
    postState: post.description,
    onChange: event => setPost({...post, description: event.target.value})
  }
  
  const interestNames = [];
  const interestIDs = [];
  interests.forEach(elem => {
    interestNames.push(elem.name);
    interestIDs.push(elem.id);
  })

  const typeOptions = ['Video', 'Audio', 'Image'];

  return (
    <section className="postform">
      {mode.newPost && <><h1>Create Your Post</h1>
      <form className="postform__form" onSubmit={onSubmit}>
        <FormControl fullWidth sx={{margin: "0 0 0.5em 0"}}>
          <TextField
            required
            label="Title"
            name="title"
            value={post.title}
            onChange={event => setPost(prev => {
              return {
                ...prev,
                title: event.target.value
              }
            })}
            />
        </FormControl>

        <FormControl fullWidth sx={{margin: "0.5em 0 0.5em 0"}}>
            <TextField
              className="postform__form__textfield--description"
              label="Description"
              name="description"
              multiline
              rows={5}
              value={post.description}
              onChange={event => setPost(prev => {
                return {
                  ...prev,
                  description: event.target.value
                }
              })}
              />
          </FormControl>

        <div className="postform__form__content__select">
          <FormControl sx={{m: "0.5em 0 0.5em 0", minWidth: "47.5%"}}>
            <InputLabel id="postform__select-label--post-type">
              Media Type
            </InputLabel>
            <Select
              className="postform__select--post-type"
              labelId="postform__select-label--post-type"
              value={post.post_type}
              label="Media Type"
              required
              onChange={event => setPost(prev => {
                return {
                  ...prev,
                  post_type: event.target.value
                }
              })}
              >
                <MenuItem value={""}>None</MenuItem>
              {
                typeOptions.map((type, i) => {
                  return <MenuItem key={i} value={type}>{type}</MenuItem>
                })
              }
            </Select>
          </FormControl>

          <FormControl sx={{m: "0.5em 0 0.5em 0", minWidth: "47.5%"}}>
            <InputLabel id="postform__select-label--interest">
              Category
            </InputLabel>
            <Select
              className="postform__select--interest"
              labelId="postform__select-label--interest"
              value={post.interest_id}
              label="Category"
              required
              onChange={event => setPost(prev => {
                return {
                  ...prev,
                  interest_id: event.target.value
                }
              })}
              >
                <MenuItem value={""}>None</MenuItem>
              {
                interestNames.map((type, i) => {
                  return <MenuItem key={i} value={interestIDs[i]}>{type}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </div>

        <div className="postform__button-file">
          <div className="postform__button-file--upload-file--control-div">
            <FormControl>
              <label htmlFor="postform__button-file--upload-file">
                <input id="postform__button-file--upload-file" type="file" name="upload_file" onChange={fileOnChange}/>
                <Button variant="outlined" component="span" className="upload-file-button"><VideoLibraryIcon/>&nbsp;&nbsp;Upload File</Button>
              </label>     
          </FormControl>
          {post.upload_file.name ? <p>{post.upload_file.name}</p> : <p className="postform__upload-file--error">{post.upload_file}</p>}
          </div>

          <div className="postform__button-file--thumbnail--control-div">
            <FormControl>
              <label htmlFor="postform__button-file--thumbnail">
                <input id="postform__button-file--thumbnail" type="file" name="thumbnail" onChange={thumbnailOnChange}/>
                <Button variant="outlined" component="span" className="upload-file-button"><InsertPhotoIcon/> &nbsp;&nbsp;Upload Thumbnail</Button>
              </label>     
            </FormControl>
            {post.thumbnail.name ? <p>{post.thumbnail.name}</p> : <p className="postform__upload-file--error">{post.thumbnail}</p>}
          </div>
          
          <FormControl>
            <label htmlFor="postform__button-file--submit">
              <input id="postform__button-file--submit" type="submit"/>
              <Button variant="contained" component="span" className="create-post-button">Create Post</Button>
            </label>     
          </FormControl>
        </div>
      </form></>}
      {mode.isLoading && <Loading message={"Loading Files"} element={"postform"}/>}
      <Outlet/>
    </section>
  )
} 
// {content.type.includes("video") && 
//   <div>
//     <video width="320" height="240" controls>
//       <source src={content.src} type="video/mp4"/>
//     </video>
//     <img width="320" height="240" alt="thumbnail" src={content.t_src}/>
//   </div>
// }