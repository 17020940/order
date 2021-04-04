import React, { memo, useState } from "react";
import { PathConstant } from "../../../const";
import { Box } from "@material-ui/core";

import { useHistory } from "react-router-dom";

import QrReader from 'react-qr-reader'

const Introduce = () => {
  const history = useHistory();

  const [isShow, setIsShow] = useState(true);

  const handleScan = async (data) => {
    if (data) {
      await setIsShow(false);
      setTimeout(() => {
        history.push(PathConstant.CUSTOMER_LOGIN, JSON.parse(data));
      }, 200);
    }
  }
  const handleError = (err) => {
    console.error(err)
  }



  return (
    <Box style={{ display: isShow ? null : 'none' }}>

      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
    </Box>
  );
};


export default memo(Introduce);
