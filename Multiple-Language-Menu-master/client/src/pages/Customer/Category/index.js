import React, { memo } from "react";
import {
  makeStyles,
} from "@material-ui/core";
import { CustomerLayout } from "../../../layouts";
import ListCategory from "./Components/listCategory"
const Category = (props) => {
  // console.log(props)
  return (
    <CustomerLayout props={props.location.state}>
      <ListCategory data={props.location.state} />
    </CustomerLayout>
  );
};

const useStyles = makeStyles({
  boxPara: {
    width: "100%",
    height: "90vh",
    // display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  boxBorder: {
    width: "80%",
    boxShadow: "0 1px 3px 0 rgba(0,0,0,.2),0 1px 6px 0 rgba(0,0,0,.19)",
  },
  boxContent: {
    width: "100%",
    fontSize: "24px",
    fontWeight: "500",
    marginTop: "20px",
    textAlign: "center",
  },
  iconBox: {
    "& .MuiCheckbox-colorSecondary.Mui-checked": {
      color: "rgb(48, 92, 139)",
    },
  },
  checkBox: {
    color: "#000000",
  },
  boxButton: {
    height: "50px",
    "& .MuiButtonBase-root": {
      borderRadius: "0px"
    }
  }
});

export default memo(Category);
