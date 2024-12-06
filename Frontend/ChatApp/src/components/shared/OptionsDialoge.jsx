import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  IconButton,
  Checkbox,
  FormControlLabel,
  Tooltip,
} from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import { VideoCallOutlined } from '@mui/icons-material';

const OptionsDialog = ({ open, onClose, content }) => {
  const navigate = useNavigate();
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(open);

  // Load user preference from localStorage on component mount
  useEffect(() => {
    const userPreference = localStorage.getItem('dontShowAgain');
    if (userPreference === 'true') {
      setIsDialogVisible(false);
    } else {
      setIsDialogVisible(open);
    }
  }, [open]);

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  const handleCheckboxChange = (event) => {
    setDontShowAgain(event.target.checked);
  };

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('dontShowAgain', 'true');
    }
    onClose();
  };

  if (!isDialogVisible) return null; // Only render dialog if visible

  return (
    <Dialog
      open={isDialogVisible}
      onClose={onClose}
      maxWidth="xs"
      PaperProps={{
        sx: { borderRadius: 4, padding: 3, bgcolor: '#f9f9f9', boxShadow: 3 },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>
        Choose Your Next Step
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 3, color: '#616161', textAlign: 'center' }}>
          We’ve detected signs of stress or depressive thoughts in your {content}. Consider exploring one of the following options for support:
        </Typography>

        <Stack spacing={2} alignItems="center">
          {[
            { path: '/interactive-exercises', label: 'Interactive Exercises', Icon: SelfImprovementIcon, bgColor: '#e3f2fd', hoverBg: '#bbdefb' },
            { path: '/mindful-games', label: 'Mindful Games', Icon: SportsEsportsIcon, bgColor: '#e1f5fe', hoverBg: '#b3e5fc' },
            { path: '/remote-counselling', label: 'Remote Counseling', Icon: VideoCallOutlined, bgColor: '#e8f5e9', hoverBg: '#c8e6c9' }
          ].map((option, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                width: '100%',
                p: 2,
                bgcolor: option.bgColor,
                borderRadius: 2,
                boxShadow: 1,
                '&:hover': { bgcolor: option.hoverBg, cursor: 'pointer', boxShadow: 3 },
                transition: 'all 0.3s ease',
              }}
              onClick={() => handleNavigate(option.path)}
            >
              <IconButton size="large" color="primary">
                <option.Icon />
              </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {option.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Tooltip title="Select this to hide future recommendations">
          <FormControlLabel
            control={
              <Checkbox
                checked={dontShowAgain}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label="Don't show again"
          />
        </Tooltip>
        <Button onClick={handleClose} variant="contained" fullWidth sx={{ mt: 2, borderRadius: 3 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OptionsDialog;
