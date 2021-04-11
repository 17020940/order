import React, { memo, useState, useEffect } from "react";
import { PathConstant, LangConstant } from "../../../const";
import { makeStyles, Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { BoxButton, InputText } from "../../../components";
import { TokenUtil } from "../../../utils/tokenUtil";
import { useHistory } from "react-router-dom";
import { postRequest } from "../../../utils/apiUtil";
import { Notify } from "../../../components";

const CustomerLogin = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const [restaurantId, setRestaurantId] = useState(props.location.state.restaurantId);
  const [tableId, setTableId] = useState(props.location.state.tableId);
  const [open, setOpen] = useState(false);

  const onChange = () => {
    document.getElementById("telephoneInput").textContent = "";
  }

  const onLogin = async () => {
    try {
      // let tableId = props.location.state.tableId;
      let param = {}
      param.name = document.getElementsByName('username')[0].value;
      param.telephone = document.getElementsByName('telephone')[0].value;
      param.email = document.getElementsByName('email')[0].value;
      param.tableId = tableId;
      if (!param.telephone || param.telephone == "") {
        document.getElementById("telephoneInput").textContent = "Không được để trống trường này";
        return;
      } 
      let key =  await TokenUtil.getToken();
      if (!key){
        document.getElementById("loginInfo").textContent = "Lỗi kết nối với POS";
        return;
      }
      key =  restaurantId + "-" + key;
      let res = await postRequest("/api/order-session", param, key);
      if (res.success) {
        let state = { restaurantId: restaurantId, orderId: res.data.id };
        history.push(PathConstant.CUSTOMER_CATEGORY, state);
      } else if (res.error == "Invalid table") {
        document.getElementById("loginInfo").textContent = "Bàn không hợp lệ";
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <Box className={classes.boxParent}>
      <Box className={classes.box1}>

        <Box className={classes.box3} style={{ display: "block" }}>
          <form id="formLogin">
            <InputText
              nameLabel={"Họ tên"}
              typeInput="text"
              nameText="username"
            />
            <InputText
              nameLabel={getLabel(LangConstant.TXT_TELEPHONE)}
              typeInput="text"
              nameText="telephone"
              onInput={onChange}
            />
            <span id="telephoneInput" style={{ color: 'red' }}></span>
            <InputText
              nameLabel={getLabel(LangConstant.TXT_EMAIL)}
              typeInput="text"
              nameText="email"
            />
            <span id="tableInput" style={{ color: 'red' }}></span>
          </form>
          <Box className={classes.box4}>
            <BoxButton
              nameButton={getLabel(LangConstant.TXT_LOGIN)}
              onClick={onLogin}
            />
            <span id="loginInfo" ></span>
          </Box>
        </Box>
      <Notify open={open} setOpen={setOpen} dataError={'Lỗi kết nối với POS'} />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  boxParent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
  },
  box1: {
    width: 500,
    display: "flex",
    flexWrap: "wrap",
    height: 430,
    backgroundColor: "#fff",
    borderRadius: 50,
    boxShadow: "0 0 10px 0px grey",
  },
  box2: {
    backgroundColor: "#305C8B",
    width: 500,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
  },
  h1: { color: "white" },
  box3: {
    backgroundColor: "#fff",
    width: 500,
    paddingTop: 50,
    boxSizing: "border-box",
    paddingLeft: 100,
    paddingRight: 100,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
  },
  box4: {
    marginTop: 40,
    height: 40,
    paddingLeft: 30,
    paddingRight: 30,
    color: 'red',
    textAlign: 'center'
  },
  formControl: {
    marginTop: 10,
    width: '100%'
  },
});


export default memo(CustomerLogin);
