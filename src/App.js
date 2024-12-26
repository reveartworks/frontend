// import logo from "./logo.svg";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Layout/Home";
import { ListArt } from "./Layout/ListArt";
import { UploadArt } from "./Layout/Admin/UploadArt";
import { ViewArt } from "./Layout/ViewArt";
import { Login } from "./Layout/Admin/Login";
import { Dashboard } from "./Layout/Admin/Dashboard";
import { PurchaseEnquiries } from "./Layout/Admin/PurchaseEnquiries";
import { ImageUploader } from "./Util/ImageUploader";
import useWindowSize from "./Util/useWindowSize";
import { useState } from "react";
import { Analytics } from "./Layout/Admin/Analytics";
import { ContactEnquiries } from "./Layout/Admin/ContactEnquiries";
function App() {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(width <= 500 ? true : false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(
    (width <= 1000 || (width > 1000 && width < 1400)) && !isMobile
      ? true
      : false
  );
  return (
    <div>
      <Router>
        <Routes>
          <Route
            element={
              <Home isMobile={isMobile} isMobileLandscape={isMobileLandscape} />
            }
            path=""
          />
          <Route
            element={
              <UploadArt
                isMobile={isMobile}
                isMobileLandscape={isMobileLandscape}
              />
            }
            path="uploadart"
          />
          <Route
            element={
              <ListArt
                isMobile={isMobile}
                isMobileLandscape={isMobileLandscape}
              />
            }
            path="viewartlist"
          />
          <Route
            element={
              <ViewArt
                isMobile={isMobile}
                isMobileLandscape={isMobileLandscape}
              />
            }
            path="artDetails/:id"
          />
          <Route
            element={
              <Login
                isMobile={isMobile}
                isMobileLandscape={isMobileLandscape}
              />
            }
            path="adminlogin"
          />
          <Route
            element={
              <Dashboard
                isMobile={isMobile}
                isMobileLandscape={isMobileLandscape}
              />
            }
            path="dashboard"
          />
          <Route
            element={
              <UploadArt
                isMobile={isMobile}
                isMobileLandscape={isMobileLandscape}
              />
            }
            path="edit/:id"
          />

          <Route
            element={
              <ImageUploader
                isMobile={isMobile}
                isMobileLandscape={isMobileLandscape}
              />
            }
            path="/converter"
          />
          <Route
            element={
              <Analytics
                isMobile={isMobile}
                isMobileLandscape={isMobileLandscape}
              />
            }
            path="/analytics"
          />
          <Route
            element={
              <PurchaseEnquiries
                isMobile={isMobile}
                isMobileLandscape={isMobileLandscape}
              />
            }
            path="/purchaseEnquiries"
          />
          <Route
            element={
              <ContactEnquiries
                isMobile={isMobile}
                isMobileLandscape={isMobileLandscape}
              />
            }
            path="/contactEnquiries"
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
