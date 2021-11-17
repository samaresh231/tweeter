import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {ProfileContainer, FieldSpan, InfoContainer, Hr, Heading, SupressedText, EditButton, InfoPara, ProfileImg} from '../Style/profile.style'

function Profile() {
  const history = useHistory()
  const [profile, setProfile] = useState({})

  useEffect(() => {
    async function main() {
      try {
        const response = await axios.get('http://localhost:8080/settings/', {
          withCredentials: true
        })
        setProfile(response.data)
        console.log(response.data)
      } catch(err) {
        console.log(err)
      }
    }

    main()
  }, [])

  const handleImage = () => {
    if(profile.photo && profile.photo.url) {
      return profile.photo.url
    }

    return 'https://res.cloudinary.com/do8wqn9b9/image/upload/v1633538448/profile/rkke1ozjdth82x7wtrs7.jpg'
  }

  const handleEdit = () => {
    history.push('/edit')
  }

  return (
    <ProfileContainer>
      <h1>Personal Info</h1>
      <p>You can change/edit your profile information here</p>
      <InfoContainer>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{width: '70%'}}>
            <Heading>Profile</Heading>
            <SupressedText>Some informantion may be visible to other users</SupressedText>
          </div>
          <div style={{width: '30%', textAlign: 'center'}}>
            <EditButton onClick={handleEdit}>Edit</EditButton>
          </div>
        </div>
        <FieldSpan>Photo</FieldSpan><InfoPara><ProfileImg src={handleImage()} alt='profile picture'></ProfileImg></InfoPara>
        <Hr />
        <FieldSpan>Name</FieldSpan><InfoPara>{profile.name}</InfoPara>
        <Hr />
        <FieldSpan>Bio</FieldSpan><InfoPara>{profile.bio}</InfoPara>
        <Hr />
        <FieldSpan>Phone</FieldSpan><InfoPara>{profile.phone}</InfoPara>
        <Hr />
        <FieldSpan>Email</FieldSpan><InfoPara>{profile.email}</InfoPara>
      </InfoContainer>
    </ProfileContainer>
  )
}

export default Profile