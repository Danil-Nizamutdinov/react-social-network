import React from "react";
import "./styles/main.css";
import { createRoot } from "react-dom/client";
import AppT from "./AppT";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import VideoList from "./components/Video/VideoList/VideoList";
import Video from "./components/Video/VideoPage/Video";
import ChannelPage from "./components/Video/ChannelPage/ChannelPage";
import ChannelAbout from "./components/Video/ChannelPage/ChannelContent/ChannelAbout";
import ChannelShorts from "./components/Video/ChannelPage/ChannelContent/ChannelShorts";
import ChannelVideo from "./components/Video/ChannelPage/ChannelContent/ChannelVideo";
import Chats from "./components/Chat/Chats";
import PrivateRoute from "./components/Helper/PrivateRoute";
import ContactsSearch from "./components/Chat/ContactsSearch";
import Chat from "./components/Chat/Chat";

const store = setupStore();
const root = createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppT />,

    children: [
      {
        path: "/video",
        element: <VideoList />,
      },
      {
        path: "/video/:id",
        element: <Video />,
      },
      {
        path: "channel/:id",
        element: <ChannelPage />,
        children: [
          {
            path: "video",
            element: <ChannelVideo />,
          },
          {
            path: "shorts",
            element: <ChannelShorts />,
          },
          {
            path: "about",
            element: <ChannelAbout />,
          },
        ],
      },
      {
        path: "/chats",
        element: (
          <PrivateRoute>
            <Chats />
          </PrivateRoute>
        ),
      },
      {
        path: "/chats/:id",
        element: (
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        ),
      },
      {
        path: "/chats/contacts/:login",
        element: (
          <PrivateRoute>
            <ContactsSearch />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
