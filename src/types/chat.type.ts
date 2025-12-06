export type ChatMessageType = {
  id: string;
  conversation_id: string;
  message: string;
  message_type: string;
  sender_id: string;
  created_at: string;
  metadata?: string;
};
