import React from 'react'
import { Grid,Skeleton } from "@mui/material";
import Header from "./Header";
import Title from '../shared/Title';



const Loader = () => {
  return (
    <div>
    <Title/>
    
    <Grid container height={"calc(100vh - 4rem)"} spacing ={"1rem"}>
      <Grid
        item
        sm={4}
        md={3}
        sx={{
          display: { xs: "none", sm: "block" },
          borderRight: "1px solid #ccc",
          
        }}
        height={"100%"}
      >
      <Skeleton variant="rectangular" height={"100vh"} />
      
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        lg={6}
        height={"100%"}
       
      >
      <Skeleton variant="rectangular" height={"100%"} />
      </Grid>
      <Grid
        item
        
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
          
        }}
        height={"100%"}
      >
      <Skeleton variant="rectangular" height={"100vh"} />
        
      </Grid>
    </Grid>
  </div>
  )
}

export default Loader