import axios from 'axios';
import React from 'react'
import classes from "./Switch.module.scss";

const SERVER_URL = 'http://localhost:3001';


export const RuleSwitch = (props) => {
    const [isActive,setIsActive] = React.useState(props.isActive);

    const ontoggleChange = async () => {
        // console.log("isActive",isActive);
        await axios.post(`${SERVER_URL}/rules/${props.id}`, {
            isActive:!isActive
        })
        setIsActive(!isActive);
    }


  let switchClasses = [classes.Switch];
  if (isActive) {
    switchClasses.push(classes.Checked);
  }
  return (
    <>
        <label className={switchClasses.join(" ")}>
            <input type="checkbox" {...props} onChange={ontoggleChange} checked={isActive} />
            <div />
        </label>
  </>
  )
}
