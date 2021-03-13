import React, { memo } from "react";
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

function SimpleTabs({ categories }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
      <TabPanel value={value} index={0}>
        <Grid container spacing={4}>
          <Grid item sm={3} xs={12}>
            <div>asdasdasdasdasdasd</div>
          </Grid>
          <Grid item sm={3} xs={12}>
            <div>thong tin mon an</div>
          </Grid>
          <Grid item sm={3} xs={12}>
            <div>thong tin mon an 1</div>
          </Grid>
          <Grid item sm={3} xs={12}>
            <div>thong tin mon an 2</div>
          </Grid>
          <Grid item sm={3} xs={12}>
            <div>thong tin mon an 3</div>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
        </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
        </TabPanel>
    </div>
  );
}

const ListCategory = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const categories = [
    {
      id: "0",
      name: "Tất cả",
      total: 2,
    },
    {
      id: "1",
      name: "Đồ uống",
      total: 2,
    },
    {
      id: "2",
      name: "Đồ ăn",
      total: 3,
    },
    {
      id: "3",
      name: "Đồ nhậu",
      total: 2,
    },
    {
      id: "4",
      name: "Đồ uống",
      total: 2,
    },
  ]
  return (
    // <Box>
    //     <Box className={classes.boxHeader}>Category</Box>
    //     <Box className={classes.boxPara}>
    //         {
    //             categoris.map((category,index)=>(
    //                 <Box key={"cate"+index} className={classes.boxBorder}>
    //                     <Box className={classes.boxContent}>
    //                         <Link to={`/{id}/categories/${category.id}`} activeClassName="active" style={{textDecoration: "none", color:"black"}}>
    //                             <Box style={{fontSize:"18px",fontWeight: "500"}}>{category.name}</Box>
    //                             <Box>{category.total}</Box>
    //                         </Link>
    //                     </Box>
    //                 </Box>
    //             ))
    //         }               
    //     </Box>
    // </Box>
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
    backgroundColor: "green",
  },
  // boxButton:{
  //     width: "100%",
  //     height: "100%",
  //     position: "absolute",
  //     top: "0"
  // }
});

export default memo(ListCategory);
