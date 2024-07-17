import React, { Suspense, useState } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Emails from "../components/Emails/Emails";
import SuspenseLoader from "../components/common/SuspenseLoader";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const Main = () => {
  const [openDrawer, setOpenDrawer] = useState(true);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  return (
    <>
      <Header toggleDrawer={toggleDrawer} />
      <Sidebar openDrawer={openDrawer} />
      <Box>
        <Suspense fallback={<SuspenseLoader />}>
          <Outlet context={{openDrawer}} />
        </Suspense>
      </Box>
    </>
  );
};

export default Main;
