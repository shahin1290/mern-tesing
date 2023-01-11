import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function ServerError() {
  const history = useNavigate();
  const { state } = useLocation();

  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography variant="h3" color="error" gutterBottom>
            {state.error.title}
          </Typography>
          <Divider />
          <Typography>
            {state.error.detail || "Internal server error"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server Error
        </Typography>
      )}
      <Button onClick={() => history("/catalog")}>Go back to the store</Button>
    </Container>
  );
}
