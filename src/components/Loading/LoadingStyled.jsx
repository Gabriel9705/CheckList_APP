import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo semitransparente */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Garante que fique acima de outros elementos */
`
export const LoadingSpace = styled.span`
    display: flex;
    align-items: center;
    justify-content: space-around;
`