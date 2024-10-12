import { Container, Typography ,Paper} from '@mui/material'
import React from 'react'
import {DataGrid} from '@mui/x-data-grid'

const Table = ({rows,columns,heading,rowHeight=52}) => {
  return (
    <Container
    sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",

    }}>
        <Paper
        elevation={3}
        sx={{
            width: "100%",
            height: "100%",
            margin:'auto',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem 4rem",
            overflow: "hidden",
            //boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
        >
            <Typography
            variant="h4"
            textAlign="center"
            sx={{
                margin: "2rem",
                textTransform: "uppercase",
            }}
            >
                {heading}

            </Typography>
            <DataGrid 
            rows={rows}
            columns={columns}
        
            rowHeight={rowHeight}
            style={{
                width: "100%",
                height: "80%",
            }}
            sx={{
                border: "none",
                '.table-header':{
                    backgroundColor: "black",
                    color: "white",

                }
            }}
            />
        </Paper>

    </Container>
  )
}

export default Table