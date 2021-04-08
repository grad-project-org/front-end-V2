import React,{useState} from 'react';
import axios from '../../axios-order'
import classes from './Attendance.css'
import VideoRecorder from 'react-video-recorder'
import Button from '@material-ui/core/Button';


const Attendance = () => {
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [attend, setAttend] = useState([]);
  const [valid,setValid]=useState(true)
  const handleSubmit =() => {
      const reader = new FileReader(); 
      reader.readAsDataURL(recordedChunks); 
      reader.onloadend = function () { 
      const b64 = reader.result.replace(/^data:.+;base64,/, '');
      const payload={
      "video":b64
        }
        let axiosConfig = {
          headers: {
              
              'Content-Type': 'application/json;charset=UTF-8',
              'Access-Control-Allow-Origin': "*",
              'Access-Control-Allow-Credentials': true,
          },crossDomain: true
      };
        axios.post('/Attendance', payload,axiosConfig)
            .then( (res) =>{
              const att =[];
              for (let key in res.data.students_attended_today) {
              att.push({
              id: key,
              ...res.data.students_attended_today[key]
              })
               }
               setAttend(att)
               console.log(att)
              }
               )
            .catch( (error) =>{
                console.log(error);
            });
      }
    
  }

const attendLabel=attend.map(a=>(<div className={classes.attend} key={a.id}>
  <h3>{a.name} : {a.facultyid}</h3>
  <div className={classes.date}>Date : {a.date}</div>
  <div className={classes.time}>Time : {a.time}</div>
  <div className={classes.inout}> INOUT : {a.inout}</div>
</div>))

  return (
    <div className={classes.container}>
      
   
      <div className={classes.camcon} >
      <VideoRecorder  
    className={classes.cam}
    onRecordingComplete={videoBlob => {
      setValid(false)
      setRecordedChunks(videoBlob)
      console.log('videoBlob', videoBlob)}}
      />

</div>
<Button variant="contained" 
      color="primary" 
      className={classes.Button } 
      onClick={handleSubmit} 
      type="submit"
      style={{margin:'7px',background:'#2D8EDD'}}
      disabled={valid}
      >Save Video</Button >
  {attendLabel}
</div>

  );
};

export default Attendance;