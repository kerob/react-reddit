import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThreadList from "./ThreadList";
import Navbar from "./Navbar";
import ThreadView from "./ThreadView";
import { ThreadProvider } from "./providers/ThreadProvider";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <ThreadProvider>
            <Routes>
              <Route path="/" element={<ThreadList />} />
              <Route path="/thread/:id" element={<ThreadView />} />
            </Routes>
          </ThreadProvider>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
