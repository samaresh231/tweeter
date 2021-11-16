import styled from 'styled-components'

const Container = styled.div`
  letter-spacing: 0.09px;
  border: 1px solid #E0E0E0;
  border-radius: 12px;
  margin: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  padding: 10px;
  min-width: 180px;
  position: absolute;
  top: 60px;
  right: 80px;
  display: ${props => props.hide? 'none' : 'block'};
  z-index: 1;
`
const Div = styled.div`
  padding: 5% 6%;
  /* margin: 4%; */
  border-radius: 12px;

  &:hover {
    cursor: pointer;
    background-color: #F2F2F2;
  }
`

const ButtonDiv = styled(Div)`
  color: #EB5757;
`

export {
  Container,
  ButtonDiv,
  Div
}
