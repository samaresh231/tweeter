


// ************** for dev use only ********************


import {useState} from 'react'
import axios from 'axios'

function Rough() {
  const [image, setImage] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')

  function handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setImage(file)
      setImagePreviewUrl(reader.result)
    }

    reader.readAsDataURL(file)
  }

  const handleImageSubmit = async (e) => {
    const formData = new FormData();
    formData.append('image', image)
    
    try {
      const response = await axios.put('http://localhost:8080/settings/photo', formData, {
        withCredentials: true
      })

      console.log(response)
      // setImage(response.data.url)
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <input type='file' onChange={handleImageChange} />
      <img src={imagePreviewUrl} />
      <button onClick={handleImageSubmit}>Submit</button>
    </div>
  )
}

export default Rough