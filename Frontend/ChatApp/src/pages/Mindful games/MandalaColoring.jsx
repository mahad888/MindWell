import React, { useEffect, useRef, useState } from "react";
import { Container, Typography, Box, Button, Card,IconButton, Grid } from "@mui/material";
import { fabric } from "fabric";
import MindWellAppLayout from "../../components/Layout/MindWellApplayout";

import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the back icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const App = () => {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const canvasRef = useRef(null);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const canvas = new fabric.Canvas("coloring-canvas", {
      height: 500,
      width: 500,
      backgroundColor: "#ffffff",
    });
    canvasRef.current = canvas;

    if (selectedDesign) {
      fabric.Image.fromURL(selectedDesign, (img) => {
        img.scaleToWidth(500);
        canvas.add(img);
        canvas.sendToBack(img);
      });
    }

    const saveState = () => {
      setHistory((prev) => [...prev, JSON.stringify(canvas.toJSON())]);
      setRedoStack([]);
    };

    canvas.on("object:modified", saveState);
    canvas.on("object:added", saveState);

    return () => {
      canvas.dispose();
    };
  }, [selectedDesign]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.isDrawingMode = true;
      canvasRef.current.freeDrawingBrush.color = selectedColor;
      canvasRef.current.freeDrawingBrush.width = 5;
    }
  }, [selectedColor]);

  const handleUndo = () => {
    if (history.length > 0) {
      const canvas = canvasRef.current;
      const lastState = history.pop();
      setRedoStack((prev) => [...prev, JSON.stringify(canvas.toJSON())]);
      setHistory([...history]);
      canvas.loadFromJSON(lastState, canvas.renderAll.bind(canvas));
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const canvas = canvasRef.current;
      const nextState = redoStack.pop();
      setHistory((prev) => [...prev, JSON.stringify(canvas.toJSON())]);
      setRedoStack([...redoStack]);
      canvas.loadFromJSON(nextState, canvas.renderAll.bind(canvas));
    }
  };

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
      setHistory([]);
      setRedoStack([]);
    }
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL({ format: "png" });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "coloring-book.png";
      link.click();
    }
  };

  const handleUploadDesign = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        fabric.Image.fromURL(e.target.result, (img) => {
          img.scaleToWidth(500);
          canvasRef.current.add(img);
          canvasRef.current.sendToBack(img);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnimateBrush = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const obj = canvas.getActiveObject();
      if (obj) {
        obj.animate("angle", "+=360", {
          duration: 2000,
          onChange: canvas.renderAll.bind(canvas),
        });
      }
    }
  };

  const colors = ["#000000", "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFD700", "#A833FF"];

  const designs = [
    'data:image/png;base64,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', // Example placeholder designs
    'https://www.mandalasforthesoul.com/media/Mandala-Coloring-Pages-1.jpg',
    'data:image/jpeg;base64,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',
]

  return (
    <MindWellAppLayout>
      <Container>
        <Typography variant="h4" align="center" gutterBottom mt={'2rem'}>
          Virtual Coloring Book
        </Typography>
        <Box width="100%" display="flex" justifyContent="flex-start" mb={2}>
              <IconButton onClick={() => navigate(-1)} color="primary">
                <ArrowBackIcon />
              </IconButton>
            </Box>
        


        <Card style={{ padding: "16px", marginTop: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Choose a Design
          </Typography>
          <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
            {designs.map((design, index) => (
              <Button key={index} onClick={() => setSelectedDesign(design)}>
                <img
                  src={design}
                  alt={`Design ${index + 1}`}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </Button>
            ))}
          </Box>
        </Card>

        <Box display="flex" justifyContent="center" mt={4} border={"2px solid black"}>
          <canvas id="coloring-canvas" style={{ border: "2px solid #ccc" }} />
        </Box>

        <Card style={{ padding: "16px", marginTop: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Choose a Color
          </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            {colors.map((color) => (
              <Button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  backgroundColor: color,
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  border: selectedColor === color ? "2px solid #000" : "none",
                }}
              />
            ))}
          </Box>
        </Card>

        <Box mt={2} mb={5}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="contained" color="secondary" onClick={handleUndo} disabled={history.length === 0}>
                Undo
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={handleRedo} disabled={redoStack.length === 0}>
                Redo
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="error" onClick={handleClear}>
                Clear Canvas
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" component="label">
                Upload Design
                <input type="file" hidden onChange={handleUploadDesign} />
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="info" onClick={handleAnimateBrush}>
                Animate Object
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save Artwork
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </MindWellAppLayout>
  );
};

export default App;




