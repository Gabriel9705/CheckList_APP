import styled from "styled-components";

export const SectionAdmin = styled.section`
    display: flex;
    align-items: center;
    background-color: #f5938c68;
    margin-right: 1rem;
    font-size: 1rem;
    border-radius: 10px;
    padding: 0 .5rem;
    color: red;

    p{
        margin: auto;
        font-weight: 400;
    }
`

export const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: center;
    max-width: 100%;
    padding: .5rem 1rem;
    background-color: #5356FF;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
    color: #FFF;

    h1{
        font-size: 1.5rem;
        color: #FFF;
        font-weight: 700;
    }

    i{
        margin-right: .5rem;
    }
`;

export const NavbarUser = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    font-size: 1.2rem;
    font-weight: 500;
    
`

export const MenuHambuguer = styled.button`
    font-size: 1.5rem;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    i{
        font-size: 2rem;
    }
`

export const MenuDropdrown = styled.div`
    position: absolute;
    width: 15rem;
    top: 2.5rem;
    right: 0;
    background-color: #FFF;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    button{
        display: block;
        width: 100%;
        padding: 0.5rem 1rem;
        background: none;
        border: none;
        color: #000000;
        text-align: left;
        cursor: pointer;
        &:hover{
            background-color: #DFF5FF;
        }
        i{
            font-size: 1.3rem;
            margin-right: .7rem;
        }
    }
`