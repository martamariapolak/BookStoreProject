import { BrowserRouter } from "react-router-dom";
import { AccessTokenProvider } from "../../context/AccessTokenContext";
import Router from "../Routing/Router";

function App() {
  return (
    <BrowserRouter>
      <AccessTokenProvider>
        <Router />
      </AccessTokenProvider>
    </BrowserRouter>
  );
}

export default App;