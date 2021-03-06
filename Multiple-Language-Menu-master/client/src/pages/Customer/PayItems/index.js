import React, { memo, useState, useEffect } from "react";
import {
    makeStyles, Dialog, Box, DialogActions,Button,
    DialogContent,
    TextField
} from "@material-ui/core";
import { PathConstant, LangConstant } from "../../../const";
import { BoxButton } from "../../../components";
import { putRequest, deleteRequest } from "../../../utils/apiUtil";
import { CustomerLayout } from "../../../layouts";
import { ApiConstant } from "../../../const";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useTranslation } from "react-i18next";
import { TokenUtil } from "../../../utils/tokenUtil";
import { Notify } from "../../../components";

const PayItems = (props) => {
    const { t: getLabel } = useTranslation();
    const classes = useStyles();
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState({});
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [index, setIndex] = useState(null);

    useEffect(() => {
        getOrderDetail();
    }, [])

    const getOrderDetail = () => {
        let orderId = props.location.state.orderId;
        fetch(ApiConstant.BASE_URL + "/api/order-detail?orderId=" + orderId)
            .then(res => res.json())
            .then(res => {
                setItems(res.data);
            })
            .catch(error => console.log(error))
    }

    const editOrder = async (index) => {
        setIndex(index);
        if (items[index].type == 0) {
            await setIsOpen(true);
            await setItem(items[index]);
            document.getElementsByName("quantity")[0].value = items[index].quantity;
        }
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const updateOrder = async () => {
        let key = await TokenUtil.getToken();
        if (!key){
            setOpenError(true);
            console.log("Lỗi kết nối với POS")
            return;
        }
        key = "1-" + key;
        let param = {orderId: props.location.state.orderId};
        let res = await putRequest("/api/order-item", param, key);
        if (res.success) {
            setOpen(true);
        }
        setIsOpen(false);
        getOrderDetail();
    }

    const updateItem = async () => {
        let key = await TokenUtil.getToken();
        if (!key){
            setOpenError(true);
            console.log("Lỗi kết nối với POS")
            return;
        }
        key = "1-" + key;
        let param = {orderId: props.location.state.orderId};
        param.quantity = +document.getElementsByName("quantity")[0].value;
        param.itemId = items[index].itemId;
        let res = await putRequest("/api/update-item", param, key);
        if (res.success) {
            setOpen(true);
        }
        setIsOpen(false);
        getOrderDetail();
    }

    const deleteItem = async () => {
        let key = await TokenUtil.getToken();
        if (!key){
            setOpenError(true);
            console.log("Lỗi kết nối với POS")
            return;
        }
        key = "1-" + key;
        let param = {orderId: props.location.state.orderId};
        param.itemId = items[index].itemId;
        let res = await putRequest("/api/delete-item", param, key);
        if (res.success) {
            setOpen(true);
        }
        setIsOpen(false);
        getOrderDetail();
    }

    return (
        <CustomerLayout isDetailOrder={true}>
            <Box className={classes.boxBorder}>
                <Box className={classes.boxBody}>
                    {items.map((item, index) => (
                        <Box className={classes.boxContent} key={index} onClick={() => editOrder(index)}>
                            <Box className={classes.boxItem}>
                                Tên món ăn:
                            </Box>

                            <Box className={classes.boxItem}>
                                {item.name}
                            </Box>

                            {/* <Box className={classes.boxItem}>
                                Thời gian order:
                            </Box>

                            <Box className={classes.boxItem}>
                                {new Date(item.createdAt).toLocaleString()}
                            </Box> */}

                            <Box className={classes.boxItem}>
                                Số lượng:
                            </Box>
                            <Box className={classes.boxItem}>
                                {item.quantity}
                            </Box>

                            <Box className={classes.boxItem}>
                                Trạng thái:
                            </Box>
                            <Box className={classes.boxItem}>
                                {item.type == 0 ? "Chưa yêu cầu" : "Đã yêu cầu"}
                            </Box>
                        </Box>
                    ))}
                </Box>

            </Box>
            <Box className={classes.boxButton}>
                <BoxButton
                    nameButton={'Cập nhật yêu cầu'}
                    onClick={updateOrder}
                />
                <span id="loginInfo" ></span>
            </Box>
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
                            style={{ color: 'black !important' }}
                            type="number"
                            name="quantity"
                        />
                        <RemoveIcon style={{ color: 'black', cursor: "pointer" }} />
                    </div>

                </DialogContent>
                <DialogActions>
                    <DialogActions>
                        <Button color="primary" onClick={updateItem}>
                            Cập nhật
                        </Button>

                        <Button onClick={handleClose} color="primary">
                            Quay lại
                        </Button>

                        <Button onClick={deleteItem} color="primary">
                            Hủy món
                        </Button>
                    </DialogActions>
                </DialogActions>
            </Dialog>
            <Notify open={open} setOpen={setOpen} dataSuccess={'Thao tác thành công'} />
            <Notify open={openError} setOpen={setOpenError} dataError={'Lỗi kết nối với POS'} />
        </CustomerLayout>


    );
};
const element = {
    id: "ID",
    total: "Tổng",
};

const useStyles = makeStyles({
    iconButton: {
        padding: "9px",
        color: "#305C8B",
    },
    boxBorder: {
        width: "100%",
        backgroundColor: "#ffffff",
        color: "#000000",
    },
    boxHeader: {
        width: "100%",
        height: "50px",
        backgroundColor: "#F2F3F5",
        lineHeight: "50px",
        fontSize: "18px",
        display: "flex",
        justifyContent: "space-between",
        padding: "0px 8px",
        "& .MuiButtonBase-root": {
            margin: "7px 0px",
            backgroundColor: "rgb(0 0 0 / 0.2)",
            color: "white",
            width: "35px",
            height: "35px",
        },
    },
    boxBody: {
        // margin: "0 auto",
        marginTop: '56px',
        width: "100%",
        height: "calc(92vh - 56px)",
        overflow: "auto",
        backgroundColor: "#F2F3F5",

    },
    boxContent: {
        width: "92%",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        minHeight: "50px",
        margin: "0 auto",
        marginTop: "20px",
        marginBottom: "20px",
        borderBottom: "1px solid rgb(0 0 0 / 0.1)",
        boxShadow: " 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 6px 0 rgba(0,0,0,.19)",
        borderRadius: "25px",
        padding: "10px",
        cursor: "pointer",
        backgroundColor: "#fff",
    },
    boxItem: {
        width: "50%",
        padding: "0px 0px 10px 10px",
        overflow: "auto",
        fontWeight: "500",
        fontSize: "13px",
    },
    boxTop: {
        width: "100%",
        display: "flex",
    },

    boxDataTotal: {
        minWidth: "20px",
        border: "1px solid rgb(0 0 0 / 0.1)",
        boxSizing: "border-box",
        height: "20px",
        textAlign: "center",
        lineHeight: "19px",
        padding: "0px 5px",
        margin: "13px 0px",
    },
    boxFooter: {
        boxShadow: " 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 6px 0 rgba(0,0,0,.19)",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        position: "fixed",
        bottom: "0",
        justifyContent: "space-around",
    },
    boxFooterTitl: {
        width: "100%",
        height: "50px",
        backgroundColor: "#ffffff",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        padding: "0px 2%",
        justifyContent: "space-around",
    },
    boxIconButton: {
        padding: "5px",
    },
    boxRemoveItem: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid rgb(0 0 0 / 0.2)",
        "& .MuiButtonBase-root": {
            padding: 0,
            borderRadius: "0px",
            backgroundColor: "#ff4d4d",
            color: "white",
        },
    },
    boxButton: {
        position: 'absolute',
        bottom: '0',
        zIndex: '100',
        width: "100%",
        textAlign: "center",
        height: "8vh",
        "& .MuiButton-text": {
            borderRadius: "0px",
        },
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
export default memo(PayItems);
