import React from "react";
import { toggle } from "@src/store/reducers/toggleSlice";
import { useAppSelector } from "@src/hooks/redux";
import Modal from "../Helper/Modal";
import Login from "./LoginModal/Login";
import HeaderMenu from "./MenuModal/HeaderMenu";
import Profile from "./ProfileModal/Profile";
import AddVideo from "./AddVideoModal/AddVideo";
import ChannelDescription from "./ChannelDescription/ChannelDescription";
import ChannelBackground from "./ChannelBackground/ChannelBackground";
import { ActiveToggle } from "@src/types/main";

const Modals: React.FC = () => {
  const activeToggle = useAppSelector(
    (state) => state.toggleSlice.activeToggle
  );

  return (
    <>
      <Modal
        isPopup={activeToggle === "login" ? true : false}
        close={() => toggle(ActiveToggle.LOGIN)}
      >
        <Login />
      </Modal>
      <Modal
        isPopup={activeToggle === "addVideo" ? true : false}
        close={() => toggle(ActiveToggle.ADD_VIDEO)}
      >
        <AddVideo />
      </Modal>
      <Modal
        isPopup={activeToggle === "menu" ? true : false}
        close={() => toggle(ActiveToggle.MENU)}
        isMenu={true}
      >
        <HeaderMenu />
      </Modal>
      <Modal
        isPopup={activeToggle === "profile" ? true : false}
        close={() => toggle(ActiveToggle.PROFILE)}
      >
        <Profile />
      </Modal>
      <Modal
        isPopup={activeToggle === "description" ? true : false}
        close={() => toggle(ActiveToggle.DESCRIPTION)}
      >
        <ChannelDescription />
      </Modal>
      <Modal
        isPopup={activeToggle === "background" ? true : false}
        close={() => toggle(ActiveToggle.BACKGROUND)}
      >
        <ChannelBackground />
      </Modal>
    </>
  );
};

export default Modals;
