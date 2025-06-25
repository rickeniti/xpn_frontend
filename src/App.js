import { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://2fff82af-7bc7-4cce-ae93-6c1e0124be05-00-bsa72gjdnft0.spock.replit.dev/", { query });
      setResponse(res.data.response);
    } catch (err) {
      console.error(err);
      setResponse("Error: could not reach server.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Talk to Your AI Agent</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter query"
          style={{ width: "300px" }}
        />
        <button type="submit" style={{ marginLeft: "1rem" }}>Send</button>
      </form>
      {response && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
