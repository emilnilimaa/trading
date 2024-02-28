import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/router";

const Fallback = () => {
  return null;
};

function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
