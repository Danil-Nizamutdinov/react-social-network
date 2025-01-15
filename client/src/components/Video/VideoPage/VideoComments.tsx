import React, { useEffect, useState } from "react";
import expandArrow from "@src/assets/expand-arrow.png";
import like from "@src/assets/like.png";
import dislike from "@src/assets/dislike.png";
import likeActive from "@src/assets/like-active.png";
import dislikeActive from "@src/assets/dislike-active.png";
import { apiUrlStatic } from "@src/api";
import { convertToReadableDate } from "@src/components/Helper/readableDate";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import {
  addComment,
  addReaction,
  getReactions,
  getVideo,
} from "@src/store/reducers/ActionCreators/VideoAC";
import { useParams } from "react-router-dom";

const VideoComments: React.FC = () => {
  const [comment, setComment] = useState<string>("");
  const [isUpDown, setIsUpDown] = useState<boolean>(false);
  const commentReactions = useAppSelector(
    (state) => state.videoSlice.commentReactions
  );
  const user = useAppSelector((state) => state.userSlice.user);
  const comments = useAppSelector((state) => state.videoSlice.comments);

  const dispatch = useAppDispatch();

  const { id } = useParams();

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.length <= 2) return alert("Нужно ввести больше 2 символов");
    if (!user) return alert("авторизуйтесь что бы оставить комментарий");
    dispatch(addComment(comment));
    setComment("");
  };

  const handleAddReaction = async (commentId: number, emotion: number) => {
    if (!user) return alert("авторизуйтесь что бы оставить комментарий");
    await dispatch(
      addReaction({ type: "comment", contentId: commentId, emotion })
    );
    await dispatch(getVideo(Number(id)));
  };

  useEffect(() => {
    if (user) {
      dispatch(getReactions());
    }
  }, [id]);

  return (
    <div className="video_content">
      <div className="video_commetns">
        <div>{comments.length} комментариев</div>
        <div>
          <img
            src={expandArrow}
            className="cursor_pointer"
            onClick={() => setIsUpDown(!isUpDown)}
          />
        </div>
      </div>

      <div className={`up_down ${isUpDown ? "up_down_active" : ""}`}>
        <form className="form_comments" onSubmit={handleAddComment}>
          <div className="ava"></div>

          <div>
            <textarea
              placeholder="Оставьте ваш комментарий"
              className="channel_video_textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button className="button button_blue">отправить</button>
          </div>
        </form>

        {comments.map((c: any) => {
          const matchedItem = commentReactions.find(
            (item: any) => item.contentId === c.id
          );
          const emotion = matchedItem ? matchedItem.emotion : null;

          return (
            <div className="comment_wrapper" key={c.id}>
              <img
                src={apiUrlStatic + c.user.avatar}
                alt="ava"
                className="ava"
              />
              <div>
                <div className="comment_name">{c.user.login}</div>
                <div className="comment_date">
                  {convertToReadableDate(c.createdAt)}
                </div>
                <div className="comment">{c.content}</div>
                <div className="comment_active">
                  <img
                    src={emotion === 1 ? likeActive : like}
                    alt="like"
                    className="comment_like"
                    onClick={() => handleAddReaction(c.id, 1)}
                  />
                  {c.like}
                  <img
                    src={emotion === 0 ? dislikeActive : dislike}
                    alt="dislike"
                    className="comment_dislike"
                    onClick={() => handleAddReaction(c.id, 0)}
                  />
                  {c.dislike}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoComments;
