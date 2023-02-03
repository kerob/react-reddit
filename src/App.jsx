import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import ThreadList from "./pages/ThreadList";
import Navbar from "./components/Navbar";
import ThreadView from "./pages/ThreadView";
import { ThreadProvider } from "./providers/ThreadProvider";
import { AuthProvider } from "./providers/AuthProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import CreateThread from "./pages/CreateThread";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Error from "./pages/Error";
import Login from "./pages/Login";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Navbar />
      <ThreadProvider>
        <div className="main-window">
          <Outlet />
        </div>
      </ThreadProvider>
    </AuthProvider>
  );
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<Error />}>
        <Route index element={<ThreadList />} />
        <Route path="/submit" element={<CreateThread />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/thread/:id"
          element={<ThreadView />}
          // loader={threadLoader}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <div className="App">
      {/* <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <ThreadProvider>
            <Routes>
              <Route index element={<ThreadList />} />
              <Route path="/submit" element={<CreateThread />} />
              <Route
                path="/thread/:id"
                element={<ThreadView />}
                // loader={threadLoader}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ThreadProvider>
        </BrowserRouter>
      </AuthProvider> */}
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
