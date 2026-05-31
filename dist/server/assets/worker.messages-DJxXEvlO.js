import { r as reactExports, W as jsxRuntimeExports } from "./server-Brds8CES.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-BjfoNoSO.js";
import { I as Input } from "./input-BTyUWXgW.js";
import { u as useAuth, k as Route, s as supabase, d as cn, m as motion } from "./router-fTGMDcAU.js";
import { L as LoaderCircle } from "./loader-circle-CqDBv23a.js";
import { S as Search } from "./search-Dcw4fBWn.js";
import { P as Phone } from "./phone-C2yrhDIE.js";
import { V as Video, P as Paperclip, S as Smile, a as Send } from "./video-hz0JVPQP.js";
import { M as MessageSquare } from "./message-square-D47VuXPd.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-DRyp94vH.js";
import "./index-CyVeoe2Y.js";
import "./index-Buhi5q-1.js";
import "./index-XFZqbW9A.js";
function formatMessageTime(createdAtString) {
  const date = new Date(createdAtString);
  const now = /* @__PURE__ */ new Date();
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  } else {
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric"
    });
  }
}
function WorkerMessages() {
  const {
    user
  } = useAuth();
  const {
    userId: urlUserId
  } = Route.useSearch();
  const [messages, setMessages] = reactExports.useState([]);
  const [contacts, setContacts] = reactExports.useState([]);
  const [activeContactId, setActiveContactId] = reactExports.useState(null);
  const [input, setInput] = reactExports.useState("");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const messagesEndRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, activeContactId]);
  reactExports.useEffect(() => {
    async function loadData() {
      if (!user) return;
      setIsLoading(true);
      try {
        const {
          data: dbMsgs,
          error: msgsErr
        } = await supabase.from("messages").select("*").or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`).order("created_at", {
          ascending: true
        });
        if (msgsErr) throw msgsErr;
        const msgs = dbMsgs || [];
        setMessages(msgs);
        const uniqueContactIds = /* @__PURE__ */ new Set();
        msgs.forEach((m) => {
          if (m.sender_id !== user.id) uniqueContactIds.add(m.sender_id);
          if (m.receiver_id !== user.id) uniqueContactIds.add(m.receiver_id);
        });
        if (urlUserId && urlUserId !== user.id) {
          uniqueContactIds.add(urlUserId);
        }
        if (uniqueContactIds.size === 0) {
          setContacts([]);
          setIsLoading(false);
          return;
        }
        const {
          data: profiles,
          error: profilesErr
        } = await supabase.from("profiles").select("*").in("id", Array.from(uniqueContactIds));
        if (profilesErr) throw profilesErr;
        const contactList = (profiles || []).map((p) => {
          const chatMsgs = msgs.filter((m) => m.sender_id === user.id && m.receiver_id === p.id || m.sender_id === p.id && m.receiver_id === user.id);
          const lastMsg = chatMsgs.length > 0 ? chatMsgs[chatMsgs.length - 1] : null;
          return {
            id: p.id,
            name: p.name,
            avatar: p.avatar || p.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase(),
            lastMessage: lastMsg ? lastMsg.message_text : "No messages yet",
            lastMessageTime: lastMsg ? formatMessageTime(lastMsg.created_at) : "",
            lastMessageTimestamp: lastMsg ? lastMsg.created_at : (/* @__PURE__ */ new Date(0)).toISOString(),
            unread: 0
          };
        });
        contactList.sort((a, b) => {
          if (urlUserId) {
            if (a.id === urlUserId) return -1;
            if (b.id === urlUserId) return 1;
          }
          return new Date(b.lastMessageTimestamp).getTime() - new Date(a.lastMessageTimestamp).getTime();
        });
        setContacts(contactList);
        if (urlUserId && contactList.some((c) => c.id === urlUserId)) {
          setActiveContactId(urlUserId);
        } else if (contactList.length > 0) {
          setActiveContactId(contactList[0].id);
        }
      } catch (err) {
        console.error("Exception loading messaging data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [user, urlUserId]);
  reactExports.useEffect(() => {
    if (!user) return;
    const channel = supabase.channel("worker-messages").on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "messages"
    }, async (payload) => {
      const newMsg = payload.new;
      if (newMsg.sender_id === user.id || newMsg.receiver_id === user.id) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === newMsg.id)) return prev;
          return [...prev, newMsg];
        });
        const otherUserId = newMsg.sender_id === user.id ? newMsg.receiver_id : newMsg.sender_id;
        setContacts((prevContacts) => {
          const idx = prevContacts.findIndex((c) => c.id === otherUserId);
          if (idx !== -1) {
            const updated = [...prevContacts];
            updated[idx] = {
              ...updated[idx],
              lastMessage: newMsg.message_text,
              lastMessageTime: formatMessageTime(newMsg.created_at),
              lastMessageTimestamp: newMsg.created_at
            };
            return updated.sort((a, b) => {
              if (urlUserId) {
                if (a.id === urlUserId) return -1;
                if (b.id === urlUserId) return 1;
              }
              return new Date(b.lastMessageTimestamp).getTime() - new Date(a.lastMessageTimestamp).getTime();
            });
          } else {
            supabase.from("profiles").select("*").eq("id", otherUserId).single().then(({
              data: profile
            }) => {
              if (profile) {
                const newContact = {
                  id: profile.id,
                  name: profile.name,
                  avatar: profile.avatar || profile.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase(),
                  lastMessage: newMsg.message_text,
                  lastMessageTime: formatMessageTime(newMsg.created_at),
                  lastMessageTimestamp: newMsg.created_at,
                  unread: 0
                };
                setContacts((prev) => [newContact, ...prev]);
              }
            });
            return prevContacts;
          }
        });
      }
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, urlUserId]);
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !activeContactId || !user) return;
    const messageText = input.trim();
    setInput("");
    try {
      const {
        data,
        error
      } = await supabase.from("messages").insert({
        sender_id: user.id,
        receiver_id: activeContactId,
        message_text: messageText
      }).select().single();
      if (error) throw error;
      if (data) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === data.id)) return prev;
          return [...prev, data];
        });
        try {
          await supabase.from("notifications").insert({
            user_id: activeContactId,
            title: `New message from ${user.name || "User"}`,
            body: messageText.length > 60 ? `${messageText.slice(0, 60)}...` : messageText,
            type: "chat",
            unread: true
          });
        } catch (notifErr) {
          console.warn("Could not insert message notification:", notifErr);
        }
        setContacts((prevContacts) => {
          const idx = prevContacts.findIndex((c) => c.id === activeContactId);
          if (idx !== -1) {
            const updated = [...prevContacts];
            updated[idx] = {
              ...updated[idx],
              lastMessage: data.message_text,
              lastMessageTime: formatMessageTime(data.created_at),
              lastMessageTimestamp: data.created_at
            };
            return updated.sort((a, b) => {
              if (urlUserId) {
                if (a.id === urlUserId) return -1;
                if (b.id === urlUserId) return 1;
              }
              return new Date(b.lastMessageTimestamp).getTime() - new Date(a.lastMessageTimestamp).getTime();
            });
          }
          return prevContacts;
        });
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };
  const filteredContacts = contacts.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const activeChat = contacts.find((c) => c.id === activeContactId);
  const activeChatMessages = messages.filter((m) => m.sender_id === user?.id && m.receiver_id === activeContactId || m.sender_id === activeContactId && m.receiver_id === user?.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-extrabold tracking-tight", children: "Messages" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Chat with contractors in real time." }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col items-center justify-center gap-3 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 text-primary animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading chats..." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4 h-[calc(100dvh-15rem)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "rounded-3xl bg-card border border-border shadow-soft overflow-hidden flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search conversations", className: "h-10 pl-9 rounded-full bg-muted/60 border-transparent", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: filteredContacts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center text-xs text-muted-foreground", children: "No conversations found." }) : filteredContacts.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveContactId(c.id), className: cn("w-full text-left p-3 flex items-center gap-3 hover:bg-muted/40 transition-colors border-b border-border", activeContactId === c.id && "bg-primary/5"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-11 w-11", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-primary text-primary-foreground font-semibold", children: c.avatar }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success ring-2 ring-card" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: c.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground shrink-0", children: c.lastMessageTime })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate mt-0.5", children: c.lastMessage })
          ] })
        ] }, c.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "rounded-3xl bg-card border border-border shadow-soft overflow-hidden flex flex-col", children: activeChat ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "px-5 py-4 border-b border-border flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-10 w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-primary text-primary-foreground font-semibold", children: activeChat.avatar }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: activeChat.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-success inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-success" }),
              " Online"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "h-9 w-9 rounded-full grid place-items-center hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "h-9 w-9 rounded-full grid place-items-center hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-5 space-y-3 bg-muted/20", children: [
          activeChatMessages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-8 w-8 mb-2 opacity-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No messages yet. Send a message to start the conversation!" })
          ] }) : activeChatMessages.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
            opacity: 0,
            y: 6
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            delay: Math.min(i * 0.02, 0.4)
          }, className: cn("flex", m.sender_id === user?.id ? "justify-end" : "justify-start"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm", m.sender_id === user?.id ? "bg-gradient-primary text-primary-foreground rounded-br-md" : "bg-card border border-border rounded-bl-md"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap break-words", children: m.message_text }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-[10px] mt-1 text-right", m.sender_id === user?.id ? "text-primary-foreground/70" : "text-muted-foreground"), children: formatMessageTime(m.created_at) })
          ] }) }, m.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSendMessage, className: "p-3 border-t border-border flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "h-10 w-10 rounded-full grid place-items-center hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: input, onChange: (e) => setInput(e.target.value), placeholder: "Type a message…", className: "h-11 rounded-full bg-muted/60 border-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "h-10 w-10 rounded-full grid place-items-center hover:bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smile, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "h-11 px-5 rounded-full bg-gradient-primary text-primary-foreground font-semibold inline-flex items-center gap-2 shadow-soft hover:brightness-105 transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
            " Send"
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col items-center justify-center p-8 text-center text-muted-foreground bg-muted/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-12 w-12 text-primary opacity-50 mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground mb-1", children: "No Active Conversation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm max-w-sm", children: `Select a contractor from the sidebar or click "Chat" on a job's details page to start chatting.` })
      ] }) })
    ] })
  ] });
}
export {
  WorkerMessages as component
};
