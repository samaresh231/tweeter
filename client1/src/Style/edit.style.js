import styled from 'styled-components'

const BackButton = styled.button`
  font-size: 20px;
  background-color: white;
  border: none;
  color: #2D9CDB;
  margin: 2%;

  &:hover {
    cursor: pointer;
    color: darkblue;
  }
`

const FormContainer = styled.div`
  border: 1px solid #E0E0E0;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 4%;
  padding-right: 10%;
`

const Container = styled.div`
  width: 55%;
  font-family: Noto Sans;
`

const Label = styled.label`
  display: block;
  margin-bottom: 1%;
`

const Input = styled.input`
  box-sizing: border-box;
  padding-left: 10px;
  height: 40px;
  display: block;
  width: 100%;
  border: 1px solid #828282;
  border-radius: 12px;
  margin-bottom: 2%;
`

const TextArea = styled.textarea`
  border-radius: 12px;
  width: 100%;
  box-sizing: border-box;
  padding: 5px 10px;
  margin-bottom: 2%;
`

const SaveButton = styled.button`
  margin-top: 3%;
  border: none;
  border-radius: 8px;
  height: 40px;
  width: 80px;
  background-color: #2F80ED;
  color: white;

  &:hover {
    cursor: pointer;
    background-color: blue;
  }
`

const ProfileImg = styled.img`
  width: 120px;
  border-radius: 10px;
  margin-top: 3%;
  margin-bottom: 3%;

  &:hover {
    cursor: pointer;
  }
`

const ChangePhotoText = styled.p`
  margin: 5%;
  color: #828282;
`

export {
  BackButton,
  FormContainer,
  Container,
  Input,
  Label,
  SaveButton,
  TextArea,
  ProfileImg,
  ChangePhotoText
}
