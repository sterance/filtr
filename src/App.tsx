import { Navbar } from "./components/Navbar.tsx";
import { Input } from "./pages/Input.tsx";
import { Output } from "./pages/Output.tsx";
import { Products } from "./pages/Products.tsx";
import { DimensionProvider } from "./pages/DimensionProvider.tsx";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <DimensionProvider>
      <Navbar />
      <main id="main" className="page" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Navigate to="/input" replace />} />
          <Route path="/input" element={<Input />} />
          <Route path="/output" element={<Output />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </main>
    </DimensionProvider>
  );
}

export default App;
