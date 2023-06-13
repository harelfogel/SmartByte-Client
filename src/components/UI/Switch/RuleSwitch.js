import axios from "axios";
import React from "react";
import { SERVER_URL } from "../../../consts";
import classes from "./Switch.module.scss";


export const RuleSwitch = (props) => {
  const { currentRules, setCurrentRules } = props;
  const [isActive, setIsActive] = React.useState(props.isActive);

  const ontoggleChange = async () => {
    console.log("yovel",props);
    await axios.post(`${SERVER_URL}/rules/${props.id}`, {
      isActive: !isActive,
      rule: props.rule
    });
    const newCurrentRules = currentRules.map((rule) =>
      rule.id === props.id ? { ...rule, isActive: !isActive } : rule
    );
    setCurrentRules(newCurrentRules);
    setIsActive(!isActive);
  };

  let switchClasses = [classes.Switch];
  if (isActive) {
    switchClasses.push(classes.Checked);
  }
  return (
    <>
      <label className={switchClasses.join(" ")}>
        <input
          type="checkbox"
          {...props}
          onChange={ontoggleChange}
          checked={isActive}
        />
        <div />
      </label>
    </>
  );
};
