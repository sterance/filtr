import { Navbar } from "./components/Navbar.tsx";
import { Input } from "./pages/Input.tsx";
import { Output } from "./pages/Output.tsx";
import { Products } from "./pages/Products.tsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="page" tabIndex={-1}>
        <Routes>
          <Route path="/input" element={<Input />} />
          <Route path="/output" element={<Output />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
