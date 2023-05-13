import axios from "axios";
const SERVER_URL_1=`http://localhost:3001`; 

export const fetchRules = async () => {
  try {
    const response = await axios.get("http://localhost:3001/rules");
    return response.data;
  } catch (error) {
    console.error("Error fetching rules:", error);
    return [];
  }
};


export const updateRule = async (id, updatedData) => {
  try{
    const response = await axios.post(`http://localhost:3001/rules/${id}`, updatedData);
    // console.log("Yovel response",{response});
    return true;
  }catch(err){
    console.log("Error updating rule:", err.message);
    return false;
  }
}

export const notifyAdmin = async (subject, text) => {
  try {
    await axios.post(`${SERVER_URL_1}/notifyadmin`, { subject, text });
  } catch (error) {
    console.error("Failed to send email notification to admin:", error);
  }
};



// export const onAddRuleClick = (rule) => {
//   let url = `${process.env.REACT_APP_SERVER_URL}`;
//   axios
//     .post(`http://localhost:3001/rules`, { rule })
//     .then((response) => {
//       // setModalMessage("Rule is activated");
//       // setShowModal(true);
//       setOpenSuccessSnackbar(true);
//       setErrorMessage("");
//     })
//     .catch((error) => {
//       // setModalMessage("Error adding rule");
//       // setShowModal(true);
//       console.log(error.response.data);
//       setErrorMessage(error.response.data);
//       setOpenFailureSnackbar(true);
//     });
//   setRule("");
// };