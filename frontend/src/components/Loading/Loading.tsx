import * as React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography } from '@material-ui/core';
interface LoadingOverlayProps {
  overlay?: boolean;
}
export const Loading: React.FC<LoadingOverlayProps> = ({ overlay }) => {
  return (
    <Box
      position={overlay ? 'fixed' : 'relative'}
      style={{ top: 80, left: 0 }}
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <div style={{ width: '80%' }}>
        <Box textAlign="center" py={2}>
          <Typography style={{ fontSize: 18 }}>Chargement...</Typography>
        </Box>
        <LinearProgress />
      </div>
    </Box>
  );
};
