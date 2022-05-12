import App from './App';
import { AuthContextProvider } from './Context/AuthContext';
import "./index.css"
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
