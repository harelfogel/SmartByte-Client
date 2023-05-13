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
  width: 90%;
  margin-bottom: 2rem;
  margin: auto;
`;

export const ThStyled = styled.th`
  padding: 0.5rem 1.5rem;
  text-align: left;
`;

export const TdStyled = styled.td`
  max-width: 100px;
  padding: 0.5rem 1.5rem;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #ccc;
  color: gray;
  flex-direction: row;

  .custom-button {
    font-family: inherit;
    // font-size: inherit;
    border: 1px solid #000;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    margin-right: 4px;
  }

  .custom-button i {
    margin-right: 4px;
  }

  .add-button {
    color: #00bcd4;
  }

  .add-button:hover {
    background-color: #00bcd4;
    color: white;
  }

  .delete-button {
    color: red;
  }

  .delete-button:hover {
    background-color: red;
    color: white;
  }
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
  right: 50px;
  :hover {
    cursor: pointer;
  }
  position: relative;
`;

export const NewTagText = styled.p`
  color: white;
  size: 1.5rem;
  weight: bold;
  margin: auto;
  width: 100%;
  position: absolute;
  left: 0.7rem;
  top: 0.2rem;
`;



export const ButtonStyled = styled.div`
  background-color: #f6f7ff;
  color: "#3B5998";
  font-size: 14px;
  align-items: center;
  text-align: center;
  border: 1px solid #d8deea !important;
  min-width: 65px;
  min-height: 30px;
  padding: 0 0.7rem;
  border-radius: 4px;
  transition: 0.3s;
  :hover {
    cursor: pointer;
    background-color: #d8deea;
    border-color: black;
    opacity: 1;
  }
  color: #3b5998;
`;