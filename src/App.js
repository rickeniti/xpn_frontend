import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  Paper,
} from '@mui/material';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('https://2fff82af-7bc7-4cce-ae93-6c1e0124be05-00-bsa72gjdnft0.spock.replit.dev/api/ask-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResponse(data.answer || data.response || 'No response received.');
    } catch (err) {
      console.error(err);
      setResponse('Error: could not reach server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        AI Agent Assistant
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          label="Ask something..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          variant="outlined"
        />
        <Button variant="contained" color="primary" type="submit" disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Send'}
        </Button>
      </Box>

      {response && (
        <Paper elevation={3} sx={{ p: 3, bgcolor: '#f9f9f9' }}>
          <Typography variant="h6">Response:</Typography>
          <Typography>{response}</Typography>
        </Paper>
      )}
    </Container>
  );
}

export default App;
