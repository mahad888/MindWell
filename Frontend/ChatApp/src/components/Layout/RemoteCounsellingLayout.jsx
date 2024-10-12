import { Stack } from '@mui/material';
import React from 'react';
import RemoteC_Header from './RemoteC_Header';
import RemoteC_footer from './RemoteC_footer';

const RemoteCounsellingLayout = (WrappedComponent) => {
  return function LayoutComponent(props) {
    return (
      <div>
        <RemoteC_Header />
        <Stack>
          <WrappedComponent {...props} />
        </Stack>
        <RemoteC_footer />
      </div>
    );
  };
};

export default RemoteCounsellingLayout;
