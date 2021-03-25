import React, { memo, useState, useEffect } from "react";
import { PathConstant, LangConstant } from "../../../const";
import { makeStyles, Box, Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import LabelText from "./Components/labelText";
import { BoxButton, InputText } from "../../../components";
import { getJWT } from "../../../utils/tokenUtil";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { postRequest } from "../../../utils/apiUtil";
import { ApiConstant } from "../../../const";
const jwt = require("jsonwebtoken");


const Introduce = () => {
  const history = useHistory();
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const [restaurantId, setRestaurantId] = useState(null);
  const [table, setTable] = useState([]);
  const [tables, setTables] = useState([]);

  const handleChange = (event) => {
    setTable(event.target.value);
    document.getElementById("tableInput").textContent = "";
  }

  const onChange = () => {
    document.getElementById("telephoneInput").textContent = "";
  }

  const onLogin = () => {
    let param = {}
    param.name = document.getElementsByName('username')[0].value;
    param.telephone = document.getElementsByName('telephone')[0].value;
    param.email = document.getElementsByName('email')[0].value;
    param.tableId = table.id;
    if (!param.telephone || param.telephone == "") {
      document.getElementById("telephoneInput").textContent = "Không được để trống trường này";
      return;
    }
    if (!param.tableId) {
      document.getElementById("tableInput").textContent = "Chưa chọn bàn";
      return;
    }
    getJWT()
      .then(token => {
        return postRequest("/api/order-session", param, token);
      })
      .then(data => {
        if (data.success) {
          history.push(PathConstant.CUSTOMER_CATEGORY, "test")
        } else if (data.error == "Invalid table") {
          document.getElementById("loginInfo").textContent = "Bàn không hợp lệ"
        }
      })
      .catch(e => console.log(e));
  };

  const getRestaurentId = () => {
    // getJWT()
    //   .then(token => {
    //     let restaurantId;
    //     jwt.verify(token, "hoi-lam-cai-gi-1999", (error, decoded) => {
    //       if (error) {
    //         return;
    //       }
    //       restaurantId = decoded.restaurantId;
    //     });
    //     setRestaurantId(restaurantId);
    //     return fetch(ApiConstant.BASE_URL + "/api/table?restaurantId=" + restaurantId)
    //   })
    //   .then(res => res.json())
    //   .then(res => {
    //     setTables(res.data);
    //   })
    //   .catch(e => console.log(e));
    history.push(PathConstant.CUSTOMER_CATEGORY, "test")
    // setRestaurantId(1);
    // fetch(ApiConstant.BASE_URL + "/api/table?restaurantId=1")
    // .then(res => res.json())
    // .then(res => setTables(res.data))
    // .catch(e => {

    // })
  };
  return (
    <Box className={classes.boxParent}>
      <Box className={classes.box1}>

        <Box className={classes.box3} style={{ display: !restaurantId ? "block" : "none" }}>
          <span>
            Ứng dụng cần được kết nối bluetooth trước khi sử dụng
          </span>
          <Box className={classes.box4}>
            <BoxButton
              nameButton={'Kết nối Bluetooth'}
              onClick={getRestaurentId}
            />
          </Box>
        </Box>

        <Box className={classes.box3} style={{ display: !restaurantId ? "none" : "block" }}>
          <form id="formLogin">
            <InputText
              nameLabel={getLabel(LangConstant.TXT_USER_NAME)}
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
            // onInput={onChange}
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label"
                style={{ color: 'rgb(48, 92, 139)' }}>Bàn
               </InputLabel>
              <Select
                style={{ color: 'black' }}
                labelId="demo-simple-select-label"
                id="table"
                value={table}
                onChange={handleChange}
              >
                {
                  tables.map((table, index) => {
                    return <MenuItem style={{ color: 'black' }} value={table} key={index}>{table.name}</MenuItem>
                  })
                }
                {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
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


export default memo(Introduce);
