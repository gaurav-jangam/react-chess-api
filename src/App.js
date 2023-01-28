import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<> 
            <div className="bg-light text-center rounded shadow fs-2 mt-5 p-3">
Page Not Found!!! 
</div>
          </>} />
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
