import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import MoodIcon from "@mui/icons-material/Mood";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const PatientReports = ({ reports }) => {
  return (
    <Box
      sx={{
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
        background: "linear-gradient(120deg, #e0f7fa, #fce4ec)",
        borderRadius: "10px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.15)",
        overflow: "auto",
        height: "30rem",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#004d40", // Dark green for better contrast
          textShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        AI Assessment Reports
      </Typography>

      {reports && reports.length > 0 ? (
        reports.map((report, index) => (
          <Accordion
            key={report._id}
            sx={{
              borderRadius: "12px",
              marginBottom: "15px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                background: report.results === 1
                  ? "#fff" // Light red gradient
                  : "#fff", // Light green gradient
                color: "#333",
                "&:hover": {
                  background: report.results === 1 ? "#ff9999" : "#85e085",
                },
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ width: "100%" }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                    color: "#444",
                  }}
                >
                  {report.results === 1 ? (
                    <>
                      <MoodBadIcon sx={{ marginRight: "8px", color: "#e57373" }} />
                      Depression Detected
                    </>
                  ) : (
                    <>
                      <MoodIcon sx={{ marginRight: "8px", color: "#81c784" }} />
                      Not Detected
                    </>
                  )}
                </Typography>
                <Chip
                  label={report.results === 1 ? "High Risk" : "Low Risk"}
                  color={report.results === 1 ? "error" : "success"}
                  size="small"
                  sx={{
                    backgroundColor: report.results === 1 ? "#f28b82" : "#81c784",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                />
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccessTimeIcon fontSize="small" sx={{ color: "#666" }} />
                  <Typography variant="body2" sx={{ color: "#444" }}>
                    {new Date(report.createdAt).toLocaleDateString()}
                  </Typography>
                </Stack>
              </Stack>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                background: "#fff",
                padding: "20px",
                borderLeft: "5px solid",
                borderColor: report.results === 1 ? "#f28b82" : "#81c784",
              }}
            >
              {report.surveyResponses.map((response, idx) => (
                <Grid
                  container
                  spacing={2}
                  key={idx}
                  sx={{
                    marginBottom: "15px",
                    padding: "15px",
                    background: idx % 2 === 0 ? "#f9f9f9" : "#ffffff",
                    borderRadius: "10px",
                    boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
                  }}
                >
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        color: "#3f51b5", // Blue for questions
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {`Q${idx + 1}: ${response.question}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      sx={{ color: "#555", display: "flex", alignItems: "center" }}
                    >
                      <strong style={{ marginRight: "5px", color: "#2196f3" }}>
                        Answer:
                      </strong>
                      {response.selectedAnswer}
                    </Typography>
                  </Grid>
                  {idx < report.surveyResponses.length - 1 && (
                    <Divider
                      variant="middle"
                      sx={{ width: "100%", marginTop: "10px", background: "#e0e0e0" }}
                    />
                  )}
                </Grid>
              ))}
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography
          variant="h6"
          align="center"
          sx={{ color: "#666", marginTop: "20px" }}
        >
          No reports available
        </Typography>
      )}
    </Box>
  );
};

export default PatientReports;
