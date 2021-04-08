import React ,{useState}from 'react';
import classes from './Uploader.css'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'



const Uploader =(props)=>{
const[state,setState]=useState({selectedFile:null,
    loaded: 0
})

const [userID,setUserID]=useState({
    id:""});


const  onChangeHandler = (e) => {
        setState({
            selectedFile: e.target.files[0],
            loaded: 0
        });
        console.log(e.target.files[0])
    };


    const handleChange = (e) => {
        const {id , value} = e.target   
        setUserID(prevState => ({
            // ...prevState,
            [id] : value
        }))
    }

const  handleSubmit = (e) => {
        e.preventDefault();
        const file = state.selectedFile,
        reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
        const b64 = reader.result.replace(/^data:.+;base64,/, '');
        const payload={"video":b64}
        const id =userID.id
        props.onImages(id,payload)};
    };

    // const data_set=props.images.map(image=>{
    //     return ( <img className={classes.img}
    //     alt={image.id}
    //         key={image.id}
    //         src={image.image} 
    //         />)
    //    }
    //   );
return (
    <div>
<form  onSubmit={handleSubmit}>
<div className={classes.button_wrap}>
  <label className ={classes.new_button} htmlFor="upload"> Upload Video</label>
  <input id='upload' type="file"  onChange={onChangeHandler}/>
</div>
<br/>
    <TextField type="text" name="facultyid" onChange={handleChange} 
    id="id" value={userID.id} label="Faculty ID" variant="outlined"
    size="small"/>
    <Button
        variant="contained"
        color="default"
        startIcon={<CloudUploadIcon />}
        type="submit"
        size="large"
        style={{marginLeft:'7px'}}>Upload</Button>                                                             
        <br/>
    </form>
    {/* <div className={classes.photo}>
    {data_set}
    </div>  */}
    </div>        
);};
const mapStateToProps = state => {
    return {
      error: state.img.error,
      images:state.img.images
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onImages: (id,payload) =>dispatch(actions.fetchImage(id,payload)),
    };
  };
  
  
  export default connect(
    mapStateToProps,mapDispatchToProps
  )(Uploader);
  