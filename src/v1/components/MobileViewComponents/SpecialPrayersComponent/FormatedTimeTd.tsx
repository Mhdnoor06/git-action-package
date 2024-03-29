import React from "react";
// import moment from "moment";
type propsType = {
  time: any;
};
const FormattedTimeTd = ({ time }: propsType) => {
  return <td>{time}</td>;
};

export default FormattedTimeTd;
