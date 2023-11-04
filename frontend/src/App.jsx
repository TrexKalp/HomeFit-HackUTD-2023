import { useState } from "react";
import Page1 from "./components/Page1";
import SidebarWithHeader from "./components/SideBar";
import "./App.css";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="form-style">
      <SidebarWithHeader />
    </div>
  );
}

export default App;
