import { ref, watch } from "vue";
import type { Chat } from "@/pages/message/MessagesPage.vue";

const STORAGE_KEY = "ielts-zone-chats";

const defaultChats: Chat[] = [
  {
    id: "1",
    name: "Angelie Crison",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Angelie",
    lastMessage: "Thank you very much. I'm glad...",
    timestamp: "1 m Ago",
    unread: true,
    isOnline: true,
    messages: [
      {
        id: "1",
        text: "Morning Angelie, I have question about My Task",
        timestamp: "Today 11:52",
        isSent: true,
      },
      {
        id: "2",
        text: "How to make a responsive display from the dashboard?",
        timestamp: "Today 11:52",
        isSent: true,
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
      },
      {
        id: "3",
        text: "Is there a plugin to do this task?",
        timestamp: "Today 11:52",
        isSent: true,
      },
      {
        id: "4",
        text: "Yes sure, Any problem with your assignment?",
        timestamp: "Today 11:53",
        isSent: false,
      },
      {
        id: "5",
        text: "No plugins. You just have to make it smaller according to the size of the phone.",
        timestamp: "Today 11:53",
        isSent: false,
      },
      {
        id: "6",
        text: "Thank you very much. I'm glad you asked about the assignment",
        timestamp: "Today 11:53",
        isSent: false,
      },
    ],
  },
  {
    id: "2",
    name: "Jakob Saris",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jakob",
    lastMessage: "You: Sure! let me tell you about w...",
    timestamp: "2 m Ago",
    unread: false,
    isOnline: false,
    messages: [
      {
        id: "1",
        text: "Hello!",
        timestamp: "Today 10:30",
        isSent: false,
      },
      {
        id: "2",
        text: "Sure! let me tell you about what I've been working on",
        timestamp: "Today 10:31",
        isSent: true,
      },
    ],
  },
  {
    id: "3",
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    lastMessage: "Great! Looking forward to it.",
    timestamp: "5 m Ago",
    unread: true,
    isOnline: true,
    messages: [
      {
        id: "1",
        text: "Hi there!",
        timestamp: "Today 09:15",
        isSent: false,
      },
      {
        id: "2",
        text: "Great! Looking forward to it.",
        timestamp: "Today 09:16",
        isSent: true,
      },
    ],
  },
];

export function useChatStorage() {
  const loadChats = (): Chat[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error loading chats from localStorage:", error);
    }
    return defaultChats;
  };

  const saveChats = (chats: Chat[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
    } catch (error) {
      console.error("Error saving chats to localStorage:", error);
    }
  };

  const chats = ref<Chat[]>(loadChats());

  watch(
    chats,
    (newChats) => {
      saveChats(newChats);
    },
    { deep: true },
  );

  return {
    chats,
    saveChats,
    loadChats,
  };
}
