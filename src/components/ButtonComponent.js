import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';


const CustomizedButton = styled(Button)({
  textTransform: 'none',
  backgroundColor: '#00567a',
  borderColor: '#0063cc',
  textAlign: 'center',
  fontFamily: ["-apple-system", "BlinkMacSystemFont", "Helvetica Neue"].join(','),

  '&:hover': {
    backgroundColor: '#73A5C6',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#00567a',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

export const ButtonComponent = props => {
  return (
      <CustomizedButton variant="contained" disableRipple {...props}/>
  );
}
