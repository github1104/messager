import React from "react";

import ListItem from "@material-ui/core/ListItem";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import "./style.css";

import "../../public/iconUser.png";

const ListUser = (props) => {
  return (
    <ListItem
      button
      alignItems="flex-start"
      style={{ background: props.isReaded ? '#3B4257' : 'rgb(174 198 212)', color: 'white' }}
    >
      <ListItemAvatar>
        <Avatar alt="avatar" src={props.avatar} />
      </ListItemAvatar>
      <div style={{ flex: 1, width: "80%" }}>
        <div
          style={{
            flex: 1,
            justifyContent: "space-between",
            display: "flex",
            margin: "0 10px",
          }}
        >
          <span style={{ fontWeight: 500 }}>{props.name}</span>
          <span
            className={props.isOnline ? `onlineStatus` : `onlineStatus off`}
            style={{ marginTop: "auto" }}
          ></span>
        </div>
        <div
          style={{
            margin: "0 10px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {!props.isReaded ? `${props.name} has sent you a message ` : null}
        </div>
      </div>
    </ListItem>
  );
};
export default ListUser;
