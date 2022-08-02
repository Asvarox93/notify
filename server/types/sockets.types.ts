export type chatJoinAttributes = {
  room: string;
  token: string;
};

export type chatSuccessAttributes = {
  status: string;
  room: string;
};

export type chatErrorAttributes = {
  status: string;
  message: string;
};

export type chatMessageAttributes = {
  room: string;
  senderID: number;
  receiverID?: number;
  message: string;
};

export type chatMessageDeliveredAttributes = {
  status: string;
  message: string;
};

export interface ServerToClientEvents {
  "chat:demit": (arg: chatErrorAttributes) => void;
  "chat:receive": (arg: chatErrorAttributes, callback?: () => void) => void;
  "chat:success": (arg: chatSuccessAttributes) => void;
  "chat:delivered": (arg: chatMessageDeliveredAttributes) => void;
  "chat:undelivered": (arg: chatMessageDeliveredAttributes) => void;
}

export interface ClientToServerEvents {
  "chat:join": (data: chatJoinAttributes) => void;
  "chat:send": (data: chatMessageAttributes) => void;
}

export interface SocketData {
  nickname: string;
  token: number;
}
