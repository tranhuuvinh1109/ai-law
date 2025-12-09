import { QUERY_KEYS } from "@/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  askAI,
  createNewConversation,
  getAllConversations,
  getMessageByConversationId,
} from "./chat.api";

export const useGetAllConversation = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_CONVERSATIONS],
    queryFn: getAllConversations,
  });
};

export const useCreateNewConversation = () => {
  return useMutation({
    mutationFn: createNewConversation,
  });
};

export const useGetMessageByConversationID = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MESSAGE_BY_CONVERSATION_ID, id],
    queryFn: () => getMessageByConversationId(id),
    enabled: !!id,
  });
};

export const useAskAI = () => {
  return useMutation({
    mutationFn: askAI,
  });
};
