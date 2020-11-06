import React, { forwardRef } from "react";
import { Card, Typography } from "@material-ui/core";
import "./style.css";

const Message = forwardRef(({ message, username }, ref) => {
  const isUser = username === message.username;
  //   const time = Intl.DateTimeFormat("en", {
  //     timeStyle: "short",
  //     dateStyle: "short",
  //   }).format(message.timestamp.toDate());
  return (
    <div ref={ref} className={`message ${isUser && "message_user"}`}>
      <Card
        className={`message_card ${
          isUser ? "message_userCard" : "message_guestCard"
        }`}
      >
        <div className="message_cardContent">
          <Typography color="white" variant="h6" component="h3">
            {!isUser &&
              `${message.username ? message.username : "Unknow User"}: `}
            {message.message}
          </Typography>
        </div>
      </Card>
      {/* <Typography color="white" variant="subtitle2">
        {time}
      </Typography> */}
    </div>
  );
});

export default Message;
