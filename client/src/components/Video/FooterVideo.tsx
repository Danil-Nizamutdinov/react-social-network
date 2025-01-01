import React from "react";
import home from "@src/assets/home.png";
import subscriptions from "@src/assets/subscriptions.png";
import tikTok from "@src/assets/tik-tok.png";

const FooterVideo = () => {
  return (
    <footer className="footer_video">
      <div className="footer_video_content">
        <div className="footer_video_content_item">
          <img src={home} alt="home" />
          <div className="footer_video_text">Главная</div>
        </div>
        <div className="footer_video_content_item">
          <img src={tikTok} alt="tikTok" />
          <div className="footer_video_text">Shorts</div>
        </div>
        <div className="footer_video_content_item">
          <img src={subscriptions} alt="subscriptions" />
          <div className="footer_video_text">Подписки</div>
        </div>
      </div>
    </footer>
  );
};

export default FooterVideo;
