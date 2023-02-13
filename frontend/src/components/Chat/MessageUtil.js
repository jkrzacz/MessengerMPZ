import { Message } from "@chatscope/chat-ui-kit-react";

const MessagesUtil = {
  mapMessageResponse: (data, readerIdNameMap, currentUserId) => {
    return data.map((msg) => {
      //TODO: add sender
      const sender = readerIdNameMap.get(msg.user_id);

      const readers = msg.message_readers
        .map((r) => readerIdNameMap.get(r.user_id))
        .join(", ");

      //TODO: add footer
      const readByFooterText = readers ? `Read by: ${readers}` : "Sent";

      return (
        <Message
          key={msg.id}
          model={{
            message: msg.message,
            sentTime: msg.create_datetime,
            direction: msg.user_id === currentUserId ? 0 : 1,
          }}
        ></Message>
      );
    });
  },
  mapSendMessageResponse: (data, readerIdNameMap) => {
    //TODO: add sender
    const sender = readerIdNameMap.get(data.user_id);

    return (
      <Message
        key={data.id}
        model={{
          message: data.message,
          sentTime: data.create_datetime,
          direction: 0,
        }}
      ></Message>
    );
  },
};

export default MessagesUtil;
