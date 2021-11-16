import axios from 'axios'
import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {BackButton, Container, Input, Label, SaveButton, TextArea, FormContainer, ProfileImg, ChangePhotoText} from '../Style/edit.style'
import { SupressedText } from '../Style/login.style'

function Edit() {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState('https://res.cloudinary.com/do8wqn9b9/image/upload/v1633538448/profile/rkke1ozjdth82x7wtrs7.jpg')
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  useEffect(() => {
    async function main() {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:8080/', {
          withCredentials: true
        })

        const profile = response.data

        setName(profile.name)
        setBio(profile.bio)
        setEmail(profile.email)
        setPhone(profile.phone)
        if(profile.photo && profile.photo.url) {
          setImage(profile.photo.url)
        }
      } catch(err) {
        console.log(err)
      }
      
      setLoading(false)
    }

    main()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put('http://localhost:8080/', {name, bio, phone, email}, {
        withCredentials: true
      })

      if(response.status === 201) {
        history.push('/profile')
      }
    } catch(err) {
      console.log(err)
    }
  }

  const handleImageSubmit = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData();
    formData.append('image', file)
    formData.append('name', 'Samaresh')
    
    try {
      console.log('hi')
      const response = await axios.put('http://localhost:8080/photo', formData, {
        withCredentials: true
      })
      setImage(response.data.url)
    } catch(err) {
      console.log(err)
    }
  }

  return (
    loading ? <div>Loading</div> :
    <Container>  
      <BackButton onClick={() => history.goBack()}>&lt; Back</BackButton>
      <FormContainer>
        <h1>Change Info</h1>
        <SupressedText>Changes will be reflected to every service</SupressedText>
        <form onSubmit={handleSubmit}>
          <Label htmlFor='photo' style={{display: 'flex', alignItems: 'center'}}>
            <ProfileImg src={image} />
            <ChangePhotoText style={{margin: '5%'}}>Change photo</ChangePhotoText>
          </Label>
          <input type='file' id='photo' onChange={handleImageSubmit} style={{display: 'none'}}/>
          <Label htmlFor='name'>Name</Label>
          <Input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} />
          <Label htmlFor='bio'>Bio</Label>
          <TextArea id='bio' value={bio} rows='4' onChange={(e) => setBio(e.target.value)} />
          <Label htmlFor='email'>Email</Label>
          <Input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Label htmlFor='phone'>Phone Number</Label>
          <Input type='number' id='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
          <SaveButton>Save</SaveButton>
        </form>
      </FormContainer>
    </Container>
  )
}

export default Edit