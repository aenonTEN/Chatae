import { Timestamp } from 'firebase/firestore';
import { ProfileUser } from "./user";

export interface Chat {
    id: string;
    lastMessage?: string;
    lastMessageDate?: Date & Timestamp;
    userIds: string[];
    users: ProfileUser[];
  
    // Not stored, only for display
    chatPic?: string;
    chatName?: string;
  }

  export interface Message {
    text: string;
    senderId: string;
    sentDate: Date & Timestamp;
  }