import styled from "styled-components";



export const Actionsvg = styled.svg<{callinprogress?:boolean}>`
    width: 16px;
    height: 16px;
    fill : ${props => props.callinprogress ? "#ff3366" : "black"};
`;


