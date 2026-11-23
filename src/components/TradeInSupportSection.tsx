import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Phone,
  Mail,
  Building,
  Sparkles,
  Loader2,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

interface TradeInSupportSectionProps {
  onShowToast: (title: string, msg: string) => void;
  onOpenPrepGuide: () => void;
}

export const TradeInSupportSection: React.FC<TradeInSupportSectionProps> = ({
  onShowToast,
  onOpenPrepGuide,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'agent',
      text: "Hello! I'm your R3UP Chicago Trade-In Specialist. How can I help you today? You can ask about our Loop & Lincoln Park store hours, valuation estimates, trade-in preparation, or instant cash payouts.",
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Trade-In Quote Inquiry');
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/support/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      const agentMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: data.reply || "Our Chicago team is ready to assist you. Feel free to call us at (312) 555-7387 or drop by our Loop Hub at 100 N LaSalle St.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, agentMsg]);
    } catch (err) {
      console.error(err);
      const agentMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: "You can drop off your phone at our 100 N LaSalle St Loop hub for immediate cash payout (under 15 mins), or call us directly at (312) 555-7387.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, agentMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast(
      'Message Received',
      `Thank you ${contactName}! Our Chicago Loop support team will reply within 15 minutes.`
    );
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  const quickQuestions = [
    'What if my screen is cracked?',
    'What are the Loop hub hours?',
    'How do I turn off Find My / iCloud?',
    'Can I receive cash in hand today?',
  ];

  return (
    <section id="support-chat" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200/90">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Real-Time Chat Assistant */}
        <div className="lg:col-span-7 neu-card p-5 sm:p-6 rounded-3xl bg-white shadow-xl flex flex-col h-[520px]">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  R3UP Live Trade-In Support
                </h3>
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Chicago Tech Available · Real-Time
                </span>
              </div>
            </div>

            <button
              onClick={onOpenPrepGuide}
              className="text-xs font-bold text-slate-600 hover:text-emerald-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Prep Guide</span>
            </button>
          </div>

          {/* Quick FAQ Chips */}
          <div className="flex flex-wrap gap-1.5 pb-2 mb-2 border-b border-slate-100">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                className="text-[11px] font-semibold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200/60 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Message History */}
          <div
            ref={chatScrollRef}
            className="flex-1 overflow-y-auto space-y-3 pr-1 py-1"
          >
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                      isUser
                        ? 'bg-slate-900 text-white rounded-br-none shadow-sm'
                        : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/70'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 px-1">{m.time}</span>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 px-3 py-2 rounded-xl w-fit">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                <span>Specialist is typing...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 pt-3 border-t border-slate-100 mt-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about phone values, drop-off hubs, or cash..."
              className="flex-1 neu-input py-2.5 px-4 rounded-xl text-xs font-medium text-slate-800 outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl shadow-sm transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Direct Contact & Chicago Help Info */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Local Support Desk
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Have Custom or Bulk Trade-In Questions?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Selling 3+ devices for your business or have a vintage model? Our Chicago team provides custom volume quotes with free on-site pickup across Cook County.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Phone Hotline</span>
                <a href="tel:3125557387" className="text-xs font-black text-slate-900 hover:text-emerald-700">
                  (312) 555-R3UP · (312) 555-7387
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Email Support</span>
                <a href="mailto:chicago@r3upnation.com" className="text-xs font-black text-slate-900 hover:text-emerald-700">
                  chicago@r3upnation.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Primary Intake Hub</span>
                <span className="text-xs font-black text-slate-900">
                  100 N LaSalle St, Suite 400, Chicago, IL 60602
                </span>
              </div>
            </div>
          </div>

          {/* Quick Direct Message Form */}
          <form onSubmit={handleContactSubmit} className="neu-card p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5">
            <h4 className="text-xs font-black text-slate-900">Send an Inquiry to Chicago Team</h4>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Your Name"
                className="w-full neu-input py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-800"
              />
              <input
                type="text"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Email or Phone"
                className="w-full neu-input py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-800"
              />
            </div>
            <select
              value={contactSubject}
              onChange={(e) => setContactSubject(e.target.value)}
              className="w-full neu-input py-1.5 px-3 rounded-lg text-xs font-bold text-slate-800 outline-none bg-white"
            >
              <option>Trade-In Quote Inquiry</option>
              <option>Chicago Local Drop-Off Appointment</option>
              <option>Bulk / Business Device Sell (5+ Units)</option>
              <option>Cracked / Water Damaged Device Question</option>
            </select>
            <textarea
              required
              rows={2}
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Tell us what you're selling or your question..."
              className="w-full neu-input py-1.5 px-3 rounded-lg text-xs font-medium text-slate-800 outline-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs py-2 rounded-xl transition-all"
            >
              Submit Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
