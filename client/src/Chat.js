import React from 'react';
import parse from 'html-react-parser';

function Chat(props) {
  return (
    (props.isHack) ? (
      <div className="Chat">{parse(props.children)}</div>
    ) : (
      <div className="Chat">{props.children}</div>
    )
  );
}

export default Chat;