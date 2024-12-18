import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store.js";
import App from "./App.jsx";
import "./index.css";
import {
  Following,
  Foryou,
  Home,
  Login,
  Signup,
  Tweet,
  Inbox,
  Profile,
  Search,
  Settings,
  UserFollow,
  ProfileTweets,
} from "./pages/index.js";
import { AuthLayout } from "./components/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication={true}>
            <Home />
          </AuthLayout>
        ),
        children: [
          { path: "/", element: <Foryou /> }, //default page
          { path: "/following", element: <Following /> },
          { path: "/tweet/:id", element: <Tweet /> },
        ],
      },

      {
        path: "/search",
        element: (
          <AuthLayout authentication={true}>
            <Search />
          </AuthLayout>
        ),
      },

      {
        path: "/profile/:id",
        element: (
          <AuthLayout authentication={true}>
            <Profile />
          </AuthLayout>
        ),
        children: [
          {
            path: "/profile/:id/follow",
            element: <UserFollow />,
          },
          {
            path: "/profile/:id/",
            element: <ProfileTweets />,
          },
        ],
      },
      {
        path: "/settings",
        element: (
          <AuthLayout authentication={true}>
            <Settings />
          </AuthLayout>
        ),
      },
      {
        path: "/inbox",
        element: (
          <AuthLayout authentication={true}>
            <Inbox />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />,
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </StrictMode>,
);
