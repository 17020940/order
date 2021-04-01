import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom"
import {
  makeStyles,
  Box,
  Dialog,
  Tabs,
  Tab,
  AppBar,
  Typography,
  Grid,
  DialogActions,
  Button,
  DialogContent,
  TextField
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { TokenUtil } from "../../../../utils/tokenUtil";
import { ApiConstant } from "../../../../const";
import { postRequest } from "../../../../utils/apiUtil";
import { Notify } from "../../../../components";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function CategoryDetail({ category, value, index, orderId }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState({});
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const onClickItem = (indexItem) => {
    setItem(items[indexItem]);
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const orderItem = async (item) => {
    try {
      let token = await TokenUtil.getToken();
      token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN0YXVyYW50SWQiOjEsImV4cCI6MTYxOTgzMzUxNzQwN30.MSo_eHMHUf1m7ap9uXb9B7_XtmzdDUCH3mWvPAC9NCk";
      let param = {};
      param.orderId = orderId;
      param.itemId = item.id;
      param.quantity = +document.getElementsByName("quantity")[0].value;
      let res = await postRequest("/api/order-item", param, token);
      if (res.success){
        setOpen(true);
      }
    } catch (error) {
      console.log(error)
    }
    setIsOpen(false);

  }

  useEffect(() => {
    fetch(ApiConstant.BASE_URL + "/api/item?categoryId=" + category.id)
      .then(res => res.json())
      .then(res => {
        setItems(res.data)
      })
      .catch()
  }, [])

  return (
    <TabPanel value={value} index={index}>
      <Grid container spacing={4} >
        {
          items.map((item, index) => {
            return <Grid item sm={3} xs={12} key={index} >
              <img src={item.image} width="100%" height="200px"
                className={classes.boxItem} onClick={() => onClickItem(index)} />
              <center>
                <p style={{ color: 'black' }}>{item.name}</p>
                <p style={{ color: 'gray', fontSize: '13px' }}>{item.price}</p>
              </center>
            </Grid>
          })
        }
      </Grid>
      <Dialog open={isOpen} >
        <DialogContent>
          <Box style={{ color: 'black' }}>
            <center>
              {item.name}
            </center>
          </Box>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <AddIcon style={{ color: 'black', cursor: "pointer" }} />

            <TextField
              className={`${classes.rootTextField}`}
              style={{ color: 'black !important', marginLeft:'20px', marginRight: '20px' }}
              type="number"
              name="quantity"
            />
            <RemoveIcon style={{ color: 'black', cursor: "pointer" }} />
          </div>

        </DialogContent>
        <DialogActions style ={{justifyContent : 'space-around'}}>

              <Button onClick={() => orderItem(item)} color="primary">
                Thêm
          </Button>
              <Button onClick={handleClose} color="primary">
                Hủy
          </Button>
        </DialogActions>
      </Dialog>
      <Notify open={open} setOpen={setOpen} dataSuccess={'Thao tác thành công'} />
    </TabPanel>



  )
}

function SimpleTabs({ categories, orderId }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className={classes.root}>
        <AppBar className={classes.root} position="static" style={{ boxShadow: 'none' }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" indicatorColor="secondary"
            textColor="secondary" scrollButtons="auto" aria-label="simple tabs example" >
            {
              categories.map((cate, index) => {
                return <Tab label={cate.name} {...a11yProps(index)} />
              })
            }
          </Tabs>
        </AppBar>
        {
          categories.map((cate, index) => {
            return <CategoryDetail value={value} index={index}
              category={cate} orderId={orderId} />
          })
        }

      </div>
    </>
  );
}

const ListCategory = (props) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(ApiConstant.BASE_URL + "/api/category?restaurantId=1")
      .then(res => res.json())
      .then(res => {
        setCategories(res.data)
      })
      .catch()
  }, [])

  return (

    <>
      <SimpleTabs categories={categories} orderId={props.data.orderId} getJWTPromise={props.data.gattServer} />
    </>
  );
};

const useStyles = makeStyles({
  boxHeader: {
    width: "100%",
    height: "40px",
    backgroundColor: "#F2F3F5",
    lineHeight: "40px",
    paddingLeft: "4%",
    fontSize: "18px",
  },
  boxPara: {
    width: "92%",
    margin: "0 auto",
  },
  boxBorder: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    borderBottom: "1px solid rgb(0 0 0 / 0.1)",
  },
  boxContent: {
    padding: "10px 0px",
    width: "100%",
  },

  root: {
    flexGrow: 1,
  },
  // boxButton:{
  //     width: "100%",
  //     height: "100%",
  //     position: "absolute",
  //     top: "0"
  // }
  boxItem: {
    // boxShadow: "0 0 10px 0px grey",
    borderRadius: "25px",
    cursor: "pointer"
  },

  rootTextField: {
    "& .MuiFormLabel-root": {
      color: "rgb(48, 92, 139)",

    },
    "& .MuiInputBase-root": {
      color: "#000000",
    },

    "& .MuiInputBase-input": {
      textAlign: 'center'
    },

  },
});

export default memo(ListCategory);
