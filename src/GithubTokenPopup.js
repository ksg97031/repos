import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useCookies} from 'react-cookie';

export default function GithubTokenPopup() {
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = React.useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['githubToken']);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setToken(event.target.value);
  };

  const handleSetup = () => {
    // Set the 'githubToken' cookie with the input token and set its expiration to 30 days.
    if (token === '') {
        removeCookie('githubToken', { path: '/' });
    } else {
        setCookie('githubToken', token, { path: '/', maxAge: 2592000, sameSite: 'strict' });
        location.reload();
    }
    handleClose();
  };

  React.useEffect(() => {
    if (!cookies.githubToken) {
      setOpen(true);
    }
  }, [cookies.githubToken]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Authorize</DialogTitle>
        <DialogContent>
          <DialogContentText>          
            In order to access the Github Organization API with an increased rate limit, we need the Github Token for authentication. <br/><br/>
            This token will not be stored on the server; instead, it will be saved in the client's browser cookies and remain valid for 30 days.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Github Access Token"
            type="secret"
            fullWidth
            variant="standard"
            placeholder='github_...'
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSetup}>Setup</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}