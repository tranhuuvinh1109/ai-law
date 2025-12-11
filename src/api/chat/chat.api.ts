import { API_ROUTES } from "@/constants/apiRoute";
import axiosClient from "../axiosInstant";
import {
  AskAIPayloadType,
  AskAIResponseDataType,
  CreateNewConversationResponseDataType,
  CreateNewConversationResponseType,
  GetAllConversationsResponseDataType,
  GetAllMessagesByConversationIDResponseDataType,
  UpdateConversationPayloadType,
  UpdateConversationResponseDataType,
} from "./chat.type";

export const getAllConversations = async () => {
  try {
    const response = await axiosClient.get<GetAllConversationsResponseDataType>(
      API_ROUTES.GET_ALL_CONVERSATIONS
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
  }
};

export const createNewConversation = async () => {
  try {
    const response = await axiosClient.post(API_ROUTES.CREATE_NEW_CONVERSATION);
    console.log("Create new conversation response:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
  }
};

export const getMessageByConversationId = async (id: string) => {
  try {
    const response = await axiosClient.get<GetAllMessagesByConversationIDResponseDataType>(
      API_ROUTES.GET_MESSAGE_BY_CONVERSATION_ID(id)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
  }
};

export const askAI = async (payload: AskAIPayloadType) => {
  try {
    const response = await axiosClient.post<AskAIResponseDataType>(
      API_ROUTES.ASK_AI(payload.conversation_id),
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
  }
};

export const updateConversation = async (payload: UpdateConversationPayloadType) => {
  try {
    const response = await axiosClient.put<UpdateConversationResponseDataType>(
      API_ROUTES.UPDATE_CONVERSATION(payload.id),
      {
        title: payload.title,
        user_id: payload.user_id,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
  }
};
