
import { useMemo, useState, useRef, useEffect } from "react";
import {
  Search,
  MessageCircle,
  MoreVertical,
  Plus,
  Send,
  Paperclip,
  Smile,
  ArrowLeft,
  CheckCheck,
  Phone,
  Video,
  Image as ImageIcon,
  X,
} from "lucide-react";

const initialUsers = [
  {
    id: "1",
    username: "Rahul Sharma",
    profile: "https://i.pravatar.cc/100?img=12",
    online: true,
  },
  {
    id: "2",
    username: "Priya Patel",
    profile: "https://i.pravatar.cc/100?img=47",
    online: true,
  },
  {
    id: "3",
    username: "Amit Kumar",
    profile: "https://i.pravatar.cc/100?img=13",
    online: false,
  },
  {
    id: "4",
    username: "Neha Shah",
    profile: "https://i.pravatar.cc/100?img=44",
    online: false,
  },
  {
    id: "5",
    username: "Jay Patel",
    profile: "https://i.pravatar.cc/100?img=11",
    online: true,
  },
];

const initialMessages = {
  "1": [
    {
      id: 1,
      text: "Hey! How are you?",
      sender: "them",
      time: "10:40 AM",
    },
    {
      id: 2,
      text: "I'm good! What about you?",
      sender: "me",
      time: "10:41 AM",
    },
    {
      id: 3,
      text: "I'm doing great 😊",
      sender: "them",
      time: "10:42 AM",
    },
    {
      id: 4,
      text: "Are you working on the chat app?",
      sender: "them",
      time: "10:43 AM",
    },
    {
      id: 5,
      text: "Yes! I'm building it with React and Socket.IO.",
      sender: "me",
      time: "10:44 AM",
    },
  ],
  "2": [
    {
      id: 1,
      text: "Hello! 👋",
      sender: "them",
      time: "10:15 AM",
    },
    {
      id: 2,
      text: "Hey Priya, what's up?",
      sender: "me",
      time: "10:16 AM",
    },
    {
      id: 3,
      text: "See you tomorrow!",
      sender: "them",
      time: "10:20 AM",
    },
  ],
};

function getTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatPage() {
  const [users] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(initialUsers[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttach, setShowAttach] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.username.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const currentMessages = messages[selectedUser?.id] || [];

  const lastMessage = (user) => {
    const userMessages = messages[user.id] || [];
    return userMessages.length
      ? userMessages[userMessages.length - 1].text
      : "Start a conversation";
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages.length, selectedUser?.id]);

  const selectUser = (user) => {
    setSelectedUser(user);
    setMobileChatOpen(true);
    setShowEmoji(false);
    setShowAttach(false);
  };

  const sendMessage = (e) => {
    e?.preventDefault();

    const text = message.trim();

    if (!text || !selectedUser) return;

    const newMessage = {
      id: `${Date.now()}-${Math.random()}`,
      text,
      sender: "me",
      time: getTime(),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [
        ...(prev[selectedUser.id] || []),
        newMessage,
      ],
    }));

    setMessage("");
    setShowEmoji(false);
    inputRef.current?.focus();
  };

  const addEmoji = (emoji) => {
    setMessage((prev) => prev + emoji);
    setShowEmoji(false);
    inputRef.current?.focus();
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-white text-gray-900">
      {/* SIDEBAR */}
      <aside
        className={`${
          mobileChatOpen ? "hidden md:flex" : "flex"
        } w-full shrink-0 flex-col border-r border-gray-200 bg-white md:w-[340px] lg:w-[380px]`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Messages
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Chat with your friends
            </p>
          </div>

          <button
            aria-label="New chat"
            onClick={() => inputRef.current?.focus()}
            className="rounded-xl bg-green-50 p-3 text-green-700 transition hover:bg-green-100"
          >
            <Plus size={21} />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 rounded-xl bg-gray-100 px-4 py-3 transition focus-within:ring-2 focus-within:ring-green-500">
            <Search size={19} className="shrink-0 text-gray-400" />

            <input
              type="text"
              placeholder="Search friends..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />

            {search && (
              <button
                aria-label="Clear search"
                onClick={() => setSearch("")}
              >
                <X size={16} className="text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Friend list */}
        <div className="flex items-center justify-between px-5 pb-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Friends
          </h2>
          <span className="text-xs text-gray-400">
            {filteredUsers.length}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-3">
          {filteredUsers.length ? (
            filteredUsers.map((user) => {
              const active = selectedUser?.id === user.id;

              return (
                <button
                  key={user.id}
                  onClick={() => selectUser(user)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                    active
                      ? "bg-green-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={user.profile}
                      alt={user.username}
                      className="h-12 w-12 rounded-full object-cover"
                    />

                    {user.online && (
                      <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate text-sm font-semibold">
                        {user.username}
                      </h3>
                      <span className="shrink-0 text-[11px] text-gray-400">
                        {messages[user.id]?.length
                          ? messages[user.id].at(-1).time
                          : ""}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-1">
                      <p className="truncate text-sm text-gray-500">
                        {lastMessage(user)}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="px-5 py-16 text-center">
              <Search
                size={30}
                className="mx-auto mb-3 text-gray-300"
              />
              <p className="font-medium text-gray-700">
                No friends found
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Try another name.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar footer */}
        <div className="border-t border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <MessageCircle size={16} />
            <span>Your conversations, all in one place</span>
          </div>
        </div>
      </aside>

      {/* CHAT WINDOW */}
      <main
        className={`${
          mobileChatOpen ? "flex" : "hidden md:flex"
        } min-w-0 flex-1 flex-col bg-[#f8faf9]`}
      >
        {selectedUser ? (
          <>
            {/* Chat header */}
            <header className="z-10 flex items-center justify-between border-b border-gray-200 bg-white px-3 py-3 sm:px-6 sm:py-4">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  aria-label="Back to friends"
                  onClick={() => setMobileChatOpen(false)}
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
                >
                  <ArrowLeft size={21} />
                </button>

                <div className="relative shrink-0">
                  <img
                    src={selectedUser.profile}
                    alt={selectedUser.username}
                    className="h-11 w-11 rounded-full object-cover"
                  />

                  {selectedUser.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="truncate font-semibold">
                    {selectedUser.username}
                  </h2>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {selectedUser.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1 sm:gap-3">
                <button
                  aria-label="Voice call"
                  className="rounded-full p-2.5 text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                >
                  <Phone size={19} />
                </button>

                <button
                  aria-label="Video call"
                  className="rounded-full p-2.5 text-gray-500 transition hover:bg-green-50 hover:text-green-700"
                >
                  <Video size={20} />
                </button>

                <button
                  aria-label="More chat options"
                  className="rounded-full p-2.5 text-gray-500 transition hover:bg-gray-100"
                >
                  <MoreVertical size={20} />
                </button>
              </div>
            </header>

            {/* Messages */}
            <section className="flex-1 overflow-y-auto px-3 py-5 sm:px-6 sm:py-7">
              <div className="mx-auto flex max-w-3xl flex-col gap-4">
                <div className="mb-3 flex justify-center">
                  <span className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs text-gray-500 shadow-sm">
                    Today
                  </span>
                </div>

                {currentMessages.length ? (
                  currentMessages.map((msg) => {
                    const mine = msg.sender === "me";

                    return (
                      <div
                        key={msg.id}
                        className={`flex ${
                          mine ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[75%] ${
                            mine
                              ? "rounded-br-sm bg-green-600 text-white"
                              : "rounded-bl-sm border border-gray-100 bg-white text-gray-800"
                          }`}
                        >
                          <p className="whitespace-pre-wrap break-words text-sm leading-6">
                            {msg.text}
                          </p>

                          <div
                            className={`mt-1.5 flex items-center justify-end gap-1 text-[10px] ${
                              mine
                                ? "text-green-100"
                                : "text-gray-400"
                            }`}
                          >
                            <span>{msg.time}</span>
                            {mine && <CheckCheck size={15} />}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center py-16 text-center">
                    <img
                      src={selectedUser.profile}
                      alt=""
                      className="mb-4 h-16 w-16 rounded-full object-cover"
                    />
                    <h3 className="font-semibold text-gray-800">
                      {selectedUser.username}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Start your conversation with a friendly message.
                    </p>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>
            </section>

            {/* Message composer */}
            <footer className="relative border-t border-gray-200 bg-white px-3 py-3 sm:px-6 sm:py-4">
              {showEmoji && (
                <div className="absolute bottom-20 left-4 z-20 flex gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg">
                  {["😀", "😂", "❤️", "👍", "🔥", "😊", "🎉", "🙏"].map(
                    (emoji) => (
                      <button
                        key={emoji}
                        onClick={() => addEmoji(emoji)}
                        className="text-xl transition hover:scale-125"
                      >
                        {emoji}
                      </button>
                    )
                  )}
                </div>
              )}

              {showAttach && (
                <div className="absolute bottom-20 left-4 z-20 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                  <button
                    onClick={() => {
                      setShowAttach(false);
                      document.getElementById("chat-image-input")?.click();
                    }}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm hover:bg-gray-50"
                  >
                    <ImageIcon size={19} className="text-green-600" />
                    Send an image
                  </button>
                </div>
              )}

              <form
                onSubmit={sendMessage}
                className="mx-auto flex max-w-3xl items-center gap-2 sm:gap-3"
              >
                <button
                  type="button"
                  aria-label="Attach file"
                  onClick={() => {
                    setShowAttach((prev) => !prev);
                    setShowEmoji(false);
                  }}
                  className="shrink-0 rounded-full p-2.5 text-gray-500 transition hover:bg-gray-100"
                >
                  <Paperclip size={21} />
                </button>

                <input
                  id="chat-image-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setMessage((prev) =>
                        `${prev}${prev ? " " : ""}[Image selected: ${file.name}]`
                      );
                    }
                    e.target.value = "";
                  }}
                />

                <button
                  type="button"
                  aria-label="Choose emoji"
                  onClick={() => {
                    setShowEmoji((prev) => !prev);
                    setShowAttach(false);
                  }}
                  className="shrink-0 rounded-full p-2.5 text-gray-500 transition hover:bg-gray-100"
                >
                  <Smile size={22} />
                </button>

                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="min-w-0 flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
                />

                <button
                  type="submit"
                  disabled={!message.trim()}
                  aria-label="Send message"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-600 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={19} className="translate-x-[-1px]" />
                </button>
              </form>
            </footer>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-5 rounded-3xl bg-green-50 p-6 text-green-600">
              <MessageCircle size={48} strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-semibold">
              Your messages
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Select a friend from the sidebar to start chatting.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
