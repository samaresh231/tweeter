import styled from "styled-components";

const ProfileContainer = styled.div`
  font-family: Noto Sans;
  font-weight: 400;
  text-align: center;
  width: 100vw;
`

const FieldSpan = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 30%;
  color: #BDBDBD;
  padding: 2%;
  padding-left: 7%;
`

const InfoContainer = styled.div`
  display: inline-block;
  border: 1px solid #E0E0E0;
  text-align: left;
  border-radius: 12px;
  width: 50%;
`

const Hr = styled.hr`
  border-top: 1px solid #E0E0E0;
`

const Heading = styled.p`
  font-size: 20px;
  padding-left: 7%;
`

const SupressedText = styled.p`
  font-size: 13px;
  padding-left: 7%;
  color: #828282;
`

const EditButton = styled.button`
  box-sizing: border-box;
  padding: 7% 15%;
  border: 1px solid #828282;
  border-radius: 12px;
  background-color: white;
  color: #828282;

  &:hover {
    background-color: #f0f7f7;
    cursor: pointer;
    color: black;
    border: 1px solid black;
  }
`

const InfoPara = styled.p`
  display: inline-block;
  width: 50%;
  padding: 2%;
`

const ProfileImg = styled.img`
  width: 120px;
  border-radius: 12px;
`

export {
  ProfileContainer,
  FieldSpan,
  InfoContainer,
  Heading,
  SupressedText,
  Hr,
  EditButton,
  InfoPara,
  ProfileImg
}