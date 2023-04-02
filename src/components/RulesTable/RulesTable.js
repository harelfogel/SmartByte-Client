import React from "react";
import classes from "./RulesTable.module.scss";

const RulesTable = ({ rules }) => {
  return (
    <table className={classes.RulesTable}>
      <thead>
        <tr>
          <th>Rule</th>
        </tr>
      </thead>
      <tbody>
        {rules.map((rule, index) => (
          <tr key={index}>
            <td>{rule.rule}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RulesTable;
