import styled from "styled-components";

export const BarraDeProgresso = styled.div`
    color: #FFF;
    display: flex;
    text-align: center;
    border-radius: 10px;
    background-color: #ccc;

&::before{
  content: "${props => props.width}%";;
  width: ${props => props.width}%;

  border-radius: 10px;
  transition: all 0.2s ease;
  background-color:${props => props.tipo === "naoPassou" ? "red" : "green"};
}
    `