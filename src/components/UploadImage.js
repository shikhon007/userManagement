import {useState} from 'react'
import userDefault from "../userDefault.png";



const UploadImage = ({onSelected}) => {

  const [profileImg,setProfileImg] = useState(userDefault)

  
  const imageHandler = (e) => {
      const reader = new FileReader();
      reader.onload = () => {
         if(reader.readyState === 2){
            onSelected(reader.result);
            setProfileImg(reader.result);
         }
      }

      reader.readAsDataURL(e.target.files[0]);
  //     //onSelected(reader.readAsDataURL(e.target.files[0]));
     
      
      

  }


  return (
    <>
    
      <div>
         <img style={{width: "140px", height: "140px" , objectFit:"cover", border: "3px solid blue"}} src={profileImg} alt="profile"/>
      </div>
      <input type="file" name="image-upload" id="input" accept="image/*" onChange = {imageHandler} />
      <div className='label'>
          <label htmlFor='input'></label>
      </div>
    </>
  )
}

export default UploadImage