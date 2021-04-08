import React,{useState} from 'react';
import Uploader from '../Uploader/Uploader'
import classes from './Recorder.css'
import VideoRecorder from 'react-video-recorder'// eslint-disable-next-line 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'


const Recorder = (props) => {
// // eslint-disable-next-line 
//   const[error,setError]=useState({
//     error:''
//   })
  const [valid,setValid]=useState(true)
   const [recordedChunks, setRecordedChunks] = useState([]);
  //eslint-disable-next-line
  const [userID,setUserID]=useState({
    id:""});




  const submitHandler =() => {
    const file = recordedChunks,
    reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
    const b64 = reader.result.replace(/^data:.+;base64,/, '');
    const payload={"video":b64}
    const id =userID.id
    props.onImages(id,payload)};
      }



const onChangeHandler = (e) => {
      const {id , value} = e.target   
      setUserID(prevState => ({
          ...prevState,
          [id] : value
      }))
  }

 const data_set=props.images.map(image=>{
  return ( <img className={classes.img}
  alt={image.id}
      key={image.id}
      src={image.image} 
      />)
 }
);

  return (
    <div className={classes.container}>
      <div className={classes.camcon}>
      <VideoRecorder 
      onRecordingComplete={videoBlob => {
      setValid(false)
      setRecordedChunks(videoBlob)
      console.log('videoBlob', videoBlob)}}
      />
      </div>
      <br/>

      <TextField  type="text" name="facultyid" onChange={onChangeHandler} 
      id="id" value={userID.id} label="Faculty ID" variant="outlined"size="small"/>

      <Button variant="contained" 
      color="primary" 
      onClick={submitHandler} 
      style={{marginLeft:'7px',background:'#2D8EDD'}}
      disabled={valid}
      size="large"
      >Process</Button >

<br/><hr/><br/>

<div className={classes.conUploader}>
<Uploader/>
</div>
<div className={classes.photo}>
{data_set}
</div>
</div>    
  );
};
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
)(Recorder);
