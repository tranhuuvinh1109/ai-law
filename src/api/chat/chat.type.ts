import { ConversationItemType } from "@/types/conversation.type";
import { ApiReponseType } from "../common.type";
import { ChatMessageType } from "@/types/chat.type";

export type GetAllConversationsResponseDataType = ConversationItemType[];
export type GetAllConversationsResponseType = ApiReponseType<GetAllConversationsResponseDataType>;

export type CreateNewConversationResponseDataType = { data: ConversationItemType };
export type CreateNewConversationResponseType =
  ApiReponseType<CreateNewConversationResponseDataType>;

export type GetAllMessagesByConversationIDResponseDataType = ChatMessageType[];
export type GetAllMessagesByConversationIDResponseType =
  ApiReponseType<GetAllMessagesByConversationIDResponseDataType>;

export type AskAIPayloadType = {
  conversation_id: string;
  message: string;
  mode?: string;
};
export type AskAIResponseDataType = ChatMessageType;
export type AskAIResponseType = ApiReponseType<AskAIResponseDataType>;

export type UpdateConversationPayloadType = {
  id: string;
  user_id: string;
  title: string;
};
export type UpdateConversationResponseDataType = ConversationItemType;
export type UpdateConversationResponseType = ApiReponseType<UpdateConversationResponseDataType>;
