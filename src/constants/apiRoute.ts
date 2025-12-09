export const API_ROUTES = {
  GET_ALL_CONVERSATIONS: "/conversation",
  CREATE_NEW_CONVERSATION: "/conversation",
  GET_MESSAGE_BY_CONVERSATION_ID: (id: string) => `/conversation/${id}/messages`,
  ASK_AI: (id: string) => `/conversation/${id}/ask`,
  UPDATE_CONVERSATION: (id: string) => `/conversation/${id}`,
  ME: "/me",
  LOGIN: "/login",
  REGISTER: "/register",
};
