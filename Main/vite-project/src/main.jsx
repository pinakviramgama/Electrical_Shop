  import ReactDOM from "react-dom/client";
import App from "./App.jsx";

  import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ VERY IMPORTANT
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Toaster richColors position="top-right"/>
  </>

  );

