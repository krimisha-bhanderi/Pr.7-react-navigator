

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Add from "./Pages/Add";
import View from "./Pages/View";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Add />}></Route>
          <Route path="/View" element={<View />}></Route>
        </Routes>
      </BrowserRouter>
    
    </>
  );
}

export default App;
