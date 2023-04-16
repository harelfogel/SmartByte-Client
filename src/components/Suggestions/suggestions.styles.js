import styled from "styled-components";





export const TableContainer = styled.div`
display: flex;
width: 80%;
margin: auto;
justify-content: center;
padding-top: 4rem;
flex-direction: column;
`;

export const TableStyled = styled.table`
//   border-collapse: collapse;
width: 80%;
margin-bottom: 2rem;
margin: auto;
`;

export const ThStyled = styled.th`
//   border: 1px solid #ccc;
padding: 0.5rem 1.5rem;
text-align: left;
`;

export const TdStyled = styled.td`
//   border: 1px solid #ccc;
max-width: 100px;
padding: 0.5rem 1.5rem;
text-align: left;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
border-bottom: 1px solid #ccc;
color: gray;
flex-direction: row;
// display: inline-block;
`;


export const DeviceCellContent = styled.div`
display: flex;
width: 100%;
flex-direction: row;
justify-content: space-between;
`;


export const TitleStyled = styled.p`
font-size: 1.5rem;
`;

export const TableContent = styled.div`
width: 100%;
justify-content: center;
align-items: center;
background-color: green;
`;

export const NewTag = styled.div`
background-color: #ac98ff;
width: 4rem;
height: 1.9rem;
border-radius: 4px;
justify-content: center;
align-items: center;
// position: absolute;
rigth: 50px;
:hover {
  cursor: pointer;
}
position: relative;
`;

export const NewTagText = styled.p`
color: white;
size: 1.5rem;
weight: bold;
// justify-content: center;
// align-items: center;
margin: auto;
width: 100%;
position: absolute;
left: 0.7rem;
top: 0.2rem;
`;
