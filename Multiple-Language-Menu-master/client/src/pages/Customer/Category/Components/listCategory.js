import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom"
import {
  makeStyles,
  Box,
  Button,
  Tabs,
  Tab,
  AppBar,
  Typography,
  Grid
} from "@material-ui/core";
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import ButtonBox from "../../../../components/buttonBox";
import { getJWT } from "../../../../utils/tokenUtil";

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

function getToken() {
  getJWT()
    .then(token => {
      console.log("token is: ", token)
    })
    .catch(e => console.log(e));
}

function CategoryDetail({ category, value, index }) {
  const [items, setItems] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    fetch("http://localhost:5000/api/item?categoryId=" + category.id)
      .then(res => res.json())
      .then(res => {
        setItems(res.data)
      })
      .catch()
  }, [])

  return (
    <TabPanel value={value} index={index}>
      <Grid container spacing={4}>
        {
          items.map((item, index) => {
            return <Grid item sm={3} xs={12} key={index} className={classes.boxItem}>
              <img src={item.image} width="100%" height="200" />
              <p >{item.name}</p>
              <p>{item.price}</p>
            </Grid>
          })
        }
      </Grid>
    </TabPanel>
  )
}

function SimpleTabs({ categories }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="simple tabs example">
            {
              categories.map((cate, index) => {
                return <Tab label={cate.name} {...a11yProps(index)} />
              })
            }
          </Tabs>
        </AppBar>
        {
          categories.map((cate, index) => {
            return <CategoryDetail value={value} index={index} category={cate} />
          })
        }

      </div>
    </>
  );
}

const ListCategory = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/category?restaurantId=1")
      .then(res => res.json())
      .then(res => {
        setCategories(res.data)
      })
      .catch()
  }, [])

  return (

    <>
      <SimpleTabs categories={categories} />
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
    color: 'black',
    // boxShadow: "0 5px 5px 0 rgba(0,0,0,.2), 0 6px 18px 0 rgba(0,0,0,.19)",
  },
});

export default memo(ListCategory);
