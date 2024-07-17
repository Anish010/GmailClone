import { Drawer, styled } from '@mui/material'
import React from 'react'
import SidebarContent from '../SidebarContent/SidebarContent'

const Sidebar = ({openDrawer}) => {
  return (
      <>
          <Drawer
              anchor='left'
              open={openDrawer}
              hideBackdrop={true}
              ModalProps={{
                  keepMounted: true
              }}
              variant='persistent'
              sx={{
                  '& .MuiDrawer-paper': {
                      marginTop: '4rem',
                      width: "16.8%",
                      backgroundColor: "#F6F8FC",
                      border: "none",
                      height: "calc(100vh - 4rem)"
                  }
              }}
          ><SidebarContent/></Drawer>
      </>
  )
}

export default Sidebar