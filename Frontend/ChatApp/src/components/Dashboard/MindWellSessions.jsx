import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function MindWellSessions() {
  return (
    <React.Fragment>
      <Title>Recent Mindfulness Sessions</Title>
      <Typography component="p" variant="h4">
        3 Sessions
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Last session on 15 March, 2023
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View all sessions
        </Link>
      </div>
    </React.Fragment>
  );
}
