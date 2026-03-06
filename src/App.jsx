import React, { useState, useRef, useEffect } from 'react'
import {
  Home,
  Bell,
  Mail,
  Clock,
  SquarePen,
  ChevronDown,
  ChevronUp,
  Plus,
  Mic,
  MoreHorizontal,
  Check,
  Zap,
  Lightbulb,
  Sparkles,
  Images,
  BookText,
  ArrowUpRight,
  User,
  Award,
  MonitorPlay,
  Users,
  Bookmark,
  ListTodo,
  Radio,
  PenTool,
  Settings,
  HelpCircle,
  MoreHorizontal as Dots,
  Heart,
  Repeat2,
  MessageCircle,
  BarChart3,
  Share,
  Globe,
  X,
  Flag,
  Wrench,
} from 'lucide-react'

export class ErrorBoundary extends React.Component {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error, info) { console.error('ErrorBoundary caught:', error, info) }
  render() {
    if (this.state.hasError) {
      return (
        <div className="relative w-[393px] h-[852px] mx-auto bg-white flex flex-col items-center justify-center rounded-[44px] overflow-hidden" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,.25), inset 0 0 0 1px rgba(209,213,219,0.6)' }}>
          <Wrench size={40} className="text-gray-300 mb-3" strokeWidth={1.5} />
          <p className="text-[17px] font-semibold text-gray-400">oops, Michelle's still working!</p>
          <button
            className="mt-4 text-[15px] text-blue-500 font-medium active:opacity-60"
            onClick={() => this.setState({ hasError: false })}
          >
            go back
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

const AVATAR_COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444']

function Avatar({ index = 0, size = 24, className = '' }) {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length]
  return (
    <div
      className={`rounded-full flex-shrink-0 ${className}`}
      style={{ width: size, height: size, backgroundColor: color }}
    />
  )
}

function GrokIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
        fill="currentColor"
      />
    </svg>
  )
}

function EqIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="6" width="2.5" height="12" rx="1.25" fill="currentColor" />
      <rect x="9" y="3" width="2.5" height="18" rx="1.25" fill="currentColor" />
      <rect x="14" y="8" width="2.5" height="8" rx="1.25" fill="currentColor" />
      <rect x="19" y="5" width="2.5" height="14" rx="1.25" fill="currentColor" />
    </svg>
  )
}

const MODELS = [
  { id: 'auto', label: 'Auto', subtitle: 'Chooses Fast or Expert', icon: 'auto' },
  { id: 'fast', label: 'Fast', subtitle: 'Quick responses', icon: 'fast' },
  { id: 'expert', label: 'Expert', subtitle: 'Thinks hard', icon: 'expert' },
  { id: 'grok420', label: 'Grok 4.20 (Beta)', subtitle: '4 Agents', icon: 'grok420' },
]

function AutoIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 17L12 4L19 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.5 17L12 10L8.5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 21L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10.5 7L11.3 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ModelDropdown({ isOpen, selectedModel, onSelect, onClose }) {
  return (
    <>
      <div
        className={`absolute inset-0 z-30 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-[88px] z-40 rounded-2xl border border-gray-200/80 transition-all duration-200 overflow-hidden ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
        style={{ boxShadow: '0 12px 80px rgba(0,0,0,0.25)', width: 'calc(100% - 100px)', maxWidth: 240, backgroundColor: '#f5f5f5' }}
      >
        {MODELS.map((model, i) => {
          const isSelected = model.id === selectedModel
          return (
            <button
              key={model.id}
              onClick={() => { onSelect(model.id); onClose() }}
              className={`flex items-center w-full px-3.5 py-2.5 active:bg-gray-50 ${i < MODELS.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="w-7 flex-shrink-0">
                {isSelected && <Check size={18} className="text-gray-900" strokeWidth={2.5} />}
              </div>
              <div className="flex-1 text-left">
                <div className="text-[17px] font-semibold text-gray-900">{model.label}</div>
                <div className="text-[13px] text-gray-400 -mt-0.5">{model.subtitle}</div>
              </div>
              <div className="flex-shrink-0 ml-1 text-gray-700">
                {model.icon === 'auto' && <Sparkles size={20} strokeWidth={2} />}
                {model.icon === 'fast' && <Zap size={20} strokeWidth={2} />}
                {model.icon === 'expert' && <Lightbulb size={20} strokeWidth={2} />}
                {model.icon === 'grok420' && <GrokIcon size={20} />}
              </div>
            </button>
          )
        })}
      </div>
    </>
  )
}

const NEWS_ITEMS = [
  {
    title: 'Why Geeky AI Tools Outshine Sleek Consumer Gadgets',
    time: '9 hours ago',
    category: 'News',
    posts: '234 posts',
    emojis: '',
    avatarCount: 2,
  },
  {
    title: 'Block Cuts 4,000 Jobs to Embrace AI-Driven Efficiency',
    time: '13 hours ago',
    category: 'News',
    posts: '124K posts',
    emojis: '',
    avatarCount: 2,
  },
  {
    title: 'Vercel CEO: AI Makes Speed Common, Taste the Real Edge',
    time: '7 hours ago',
    category: 'Other',
    posts: '250 posts',
    emojis: '',
    avatarCount: 3,
  },
]

const NEWS_DETAILS = [
  {
    summary: 'A growing wave of developers and power users are finding that **unglamorous, technically complex AI tools** outperform polished consumer products. The trend suggests that raw capability and customizability matter more than sleek interfaces in the current AI landscape.',
    expandedSummary: 'A growing wave of developers and power users are finding that **unglamorous, technically complex AI tools** outperform polished consumer products. The trend suggests that raw capability and customizability matter more than sleek interfaces in the current AI landscape.\n\n**Key points**\n\n• Developer-focused tools like local LLM runners and terminal-based agents are seeing massive adoption despite minimal UI polish\n• Consumer-friendly AI apps struggle with the limitations of hiding complexity from users\n• Open-source alternatives consistently outpace commercial products in flexibility\n• The "power user gap" is widening as technical literacy becomes a competitive advantage',
    tweets: [
      { name: 'Dev Tools Daily', handle: '@devtoolsdaily', time: '6h', avatar: '#6366f1', verified: true, content: 'The era of "pretty but limited" AI tools is ending. Developers want control, not hand-holding.\n\nThe tools winning right now are ugly, powerful, and infinitely customizable.', stats: { comments: 89, retweets: 234, likes: '1.2K', views: '45K' } },
      { name: 'Sarah Chen', handle: '@sarahcodes', time: '8h', avatar: '#ec4899', verified: true, content: 'I switched from a $20/mo AI assistant to a free open-source one running locally. It\'s not as pretty, but it\'s 10x more useful.\n\nThe secret? I can actually modify how it works.', stats: { comments: 45, retweets: 156, likes: '890', views: '32K' } },
    ],
  },
  {
    summary: 'Block Inc. (formerly Square) announced layoffs of approximately **4,000 employees** as CEO Jack Dorsey pushes the company toward an **AI-first operational model**, aiming to replace many roles with automated systems.',
    expandedSummary: 'Block Inc. (formerly Square) announced layoffs of approximately **4,000 employees** as CEO Jack Dorsey pushes the company toward an **AI-first operational model**, aiming to replace many roles with automated systems.\n\n**What happened**\n\n• Block is eliminating roughly 25% of its workforce in the largest AI-driven layoff to date\n• Dorsey stated that AI can now handle most support, operations, and even some engineering tasks\n• Affected teams include customer support, HR operations, and internal tooling\n• Remaining employees will be expected to work alongside AI agents\n\nThe move has sparked intense debate about the pace of AI-driven workforce displacement and whether companies are moving too fast to automate.',
    tweets: [
      { name: 'Bloomberg Tech', handle: '@BloombergTech', time: '12h', avatar: '#1e293b', verified: true, content: 'BREAKING: Block Inc. cuts 4,000 jobs in major restructuring push toward AI-driven operations. Jack Dorsey says the company will be "fundamentally different" by end of 2026.', stats: { comments: 312, retweets: '1.8K', likes: '4.2K', views: '890K' } },
      { name: 'Kara Swisher', handle: '@karaswisher', time: '11h', avatar: '#dc2626', verified: true, content: 'This is the first domino. Every tech CEO I\'ve talked to in the last month is planning similar moves. The AI replacement wave is here and it\'s faster than anyone predicted.', stats: { comments: 198, retweets: '1.1K', likes: '3.5K', views: '520K' } },
    ],
  },
  {
    summary: 'Vercel CEO Guillermo Rauch argues that **AI has commoditized development speed**, making technical execution table stakes. He believes **taste and design sensibility** are now the primary differentiators for successful products.',
    expandedSummary: 'Vercel CEO Guillermo Rauch argues that **AI has commoditized development speed**, making technical execution table stakes. He believes **taste and design sensibility** are now the primary differentiators for successful products.\n\n**Core argument**\n\n• AI tools now let anyone ship production code in hours, not weeks\n• Speed alone no longer creates competitive advantage\n• Products win on design quality, UX polish, and aesthetic coherence\n• The best engineers are the ones with strong design intuition\n\nRauch points to the explosion of AI-built apps that are technically functional but visually generic as evidence that taste is the new moat.',
    tweets: [
      { name: 'Guillermo Rauch', handle: '@raaborern', time: '5h', avatar: '#000000', verified: true, content: 'Hot take: the best AI engineer in 2026 is the one with the best taste.\n\nSpeed is free now. Everyone can build fast. The question is: can you build something beautiful?', stats: { comments: 267, retweets: '2.1K', likes: '8.9K', views: '1.2M' } },
      { name: 'Syntax.fm', handle: '@syntaxfm', time: '4h', avatar: '#f59e0b', verified: true, content: 'Rauch is right about this. We\'ve reviewed dozens of AI-built apps this month. They all work. Almost none of them feel good to use.\n\nTaste > speed in 2026.', stats: { comments: 78, retweets: 345, likes: '1.8K', views: '95K' } },
    ],
  },
]

const TRENDING_ITEMS = [
  { title: '#TechTwitter', subtitle: 'Technology · Trending', promoted: false },
  { title: 'Sam Altman', subtitle: 'Trending in Technology', promoted: false },
  { title: 'OpenClaw', subtitle: 'Technology · Trending', promoted: false },
]

const QUICK_ACTIONS = [
  { label: 'Create Image', icon: 'create' },
  { label: 'Edit Image', icon: 'edit' },
  { label: 'Voice Mode', icon: 'voice' },
  { label: 'Grokipedia', icon: 'grokipedia' },
]

const RECENT_PEOPLE = [
  { name: 'Lauren Tsai', handle: '@LaLaChuu', color: '#6366f1' },
  { name: 'Sam Che...', handle: '@samfcheng', color: '#ec4899' },
  { name: 'seb', handle: '@sebaastti...', color: '#3b82f6' },
  { name: 'elissa', handle: '@elissafied', color: '#10b981' },
  { name: 'Hong Yu', handle: '@h_youtbe', color: '#f59e0b' },
]

const RECENT_SEARCHES = [
  'alysa liu',
  'baria alaswad',
  'bella a16z',
  'origami archive',
  'ryo macos',
  'react server components',
  'figma to code workflow',
  'claude 4 benchmarks',
  'tailwind v4 migration',
  'neural radiance fields',
  'startup pitch deck tips',
  'best mechanical keyboards 2026',
  'solana meme coins',
  'typography best practices',
  'ambient music playlists',
]

const SEARCH_SUGGESTIONS = {
  'what is': {
    completions: [
      'what is openclaw',
      'what is balanced approach to cardio vs strength training',
      'what is my ip',
      'what is pizzagate',
    ],
    accounts: [
      { name: 'what is real?', handle: '@whatisrealart', verified: true, color: '#1e293b', letter: '?' },
      { name: 'The "What is Money?" Show', handle: '@WhatisMoneyShow', verified: true, color: '#4338ca', letter: 'WiM' },
      { name: 'State of Statecraft Conference', handle: '@statecraft', verified: true, color: '#dc2626', letter: 'S' },
    ],
  },
  default: {
    completions: [
      'grok app version & build',
      'balanced approach to cardio vs strength training',
      'my ip address lookup',
      'latest tech news today',
    ],
    accounts: [
      { name: 'OpenAI', handle: '@OpenAI', verified: true, color: '#000', letter: 'O' },
      { name: 'Elon Musk', handle: '@elonmusk', verified: true, color: '#1e293b', letter: 'E' },
    ],
  },
}

function getSearchSuggestions(query) {
  const q = query.toLowerCase().trim()
  if (!q) return null
  for (const [key, val] of Object.entries(SEARCH_SUGGESTIONS)) {
    if (key === 'default') continue
    if (q.length <= key.length && q.startsWith(key.substring(0, q.length))) {
      return { ...val, prefix: q }
    }
    if (q.startsWith(key)) {
      const filtered = val.completions.filter((c) => c.toLowerCase().includes(q))
      return {
        completions: filtered.length > 0 ? filtered : val.completions,
        accounts: val.accounts,
        prefix: q,
      }
    }
  }
  return { ...SEARCH_SUGGESTIONS.default, prefix: q }
}

function StackedImagesIcon({ size = 20, className = '', hovered = false }) {
  const imgSize = size * 0.75
  return (
    <div className={className} style={{ width: size, height: size, position: 'relative' }}>
      <img
        src="/stacked-img-1.png"
        alt=""
        style={{
          position: 'absolute', top: 0, left: 0, width: imgSize, height: imgSize,
          borderRadius: 3, objectFit: 'cover',
          transform: hovered ? 'rotate(-12deg) translate(-1px, -1px)' : 'rotate(-8deg)',
          transition: 'transform 0.25s ease',
        }}
      />
      <img
        src="/stacked-img-2.png"
        alt=""
        style={{
          position: 'absolute', bottom: 0, right: 0, width: imgSize, height: imgSize,
          borderRadius: 3, objectFit: 'cover',
          transform: hovered ? 'rotate(8deg) translate(1px, 1px)' : 'rotate(4deg)',
          transition: 'transform 0.25s ease',
        }}
      />
    </div>
  )
}

function EditImageIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className}>
      <path d="M13.149 4.84743C13.1549 5.03321 13.1234 5.21828 13.0564 5.39165C12.9893 5.56502 12.8881 5.72314 12.7588 5.85664C12.6295 5.99013 12.4746 6.09628 12.3035 6.16876C12.1324 6.24125 11.9484 6.2786 11.7626 6.2786C11.5767 6.2786 11.3927 6.24125 11.2216 6.16876C11.0505 6.09628 10.8956 5.99013 10.7663 5.85664C10.637 5.72314 10.5358 5.56502 10.4688 5.39165C10.4017 5.21828 10.3702 5.03321 10.3761 4.84743C10.3875 4.48725 10.5385 4.14563 10.7973 3.89487C11.0561 3.64411 11.4022 3.5039 11.7626 3.5039C12.1229 3.5039 12.469 3.64411 12.7278 3.89487C12.9866 4.14563 13.1377 4.48725 13.149 4.84743ZM0 3.46146C0 2.54342 0.36464 1.66299 1.0137 1.01384C1.66277 0.364688 2.54309 0 3.461 0H13.149C14.0669 0 14.9473 0.364688 15.5963 1.01384C16.2454 1.66299 16.61 2.54342 16.61 3.46146V5.61864C16.155 5.51851 15.6848 5.50769 15.2256 5.58679V3.46146C15.2256 2.91064 15.0069 2.38238 14.6174 1.99289C14.228 1.6034 13.6998 1.38458 13.149 1.38458H3.461C2.91025 1.38458 2.38206 1.6034 1.99262 1.99289C1.60318 2.38238 1.3844 2.91064 1.3844 3.46146V13.1508C1.3844 13.472 1.45639 13.7752 1.58652 14.0466L6.64097 8.99148C7.08232 8.55013 7.68089 8.30219 8.30502 8.30219C8.92914 8.30219 9.52771 8.55013 9.96907 8.99148L10.4398 9.46224L9.46238 10.4411L8.9903 9.97038C8.90031 9.88037 8.79347 9.80897 8.67589 9.76026C8.55831 9.71155 8.43229 9.68647 8.30502 9.68647C8.17775 9.68647 8.05172 9.71155 7.93414 9.76026C7.81656 9.80897 7.70973 9.88037 7.61974 9.97038L2.56529 15.0241C2.83664 15.1543 3.13982 15.2276 3.461 15.2276H5.94738L5.60128 16.6122H3.461C2.54309 16.6122 1.66277 16.2475 1.0137 15.5984C0.36464 14.9492 0 14.0688 0 13.1508V3.46146ZM15.5925 6.93261C15.107 6.98779 14.6546 7.20597 14.3092 7.55152L8.37562 13.4886C7.89567 13.9706 7.55095 14.5703 7.37608 15.2276L7.36362 15.2733L6.94415 16.9501C6.90868 17.0916 6.91048 17.24 6.94939 17.3806C6.9883 17.5213 7.06298 17.6494 7.16616 17.7526C7.26934 17.8558 7.39749 17.9305 7.53812 17.9694C7.67875 18.0083 7.82707 18.0101 7.96861 17.9747L9.64373 17.5551C10.319 17.3848 10.9359 17.0356 11.4296 16.5444L17.3659 10.6073C17.6833 10.2905 17.8942 9.88279 17.9694 9.4407C18.0446 8.99861 17.9804 8.54407 17.7856 8.14015C17.5908 7.73623 17.2751 7.40296 16.8824 7.18658C16.4897 6.9702 16.0393 6.88143 15.5939 6.93261" fill="currentColor" />
    </svg>
  )
}

function QuickActionPill({ action, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-[12px] border border-gray-200 bg-white flex-shrink-0 active:bg-gray-50 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-shadow duration-200"
    >
      {action.icon === 'create' && <StackedImagesIcon size={20} className="flex-shrink-0" hovered={hovered} />}
      {action.icon === 'edit' && <EditImageIcon size={20} className="text-gray-500 flex-shrink-0" />}
      {action.icon === 'voice' && <EqIcon size={20} className="text-gray-500 flex-shrink-0" />}
      {action.icon === 'grokipedia' && <BookText size={20} className="text-gray-500 flex-shrink-0" strokeWidth={1.8} />}
      <span className="text-[13px] font-medium text-gray-900 whitespace-nowrap">{action.label}</span>
    </button>
  )
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-8 h-[38px] flex-shrink-0">
      <span className="text-[15px] font-semibold">9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="3" width="3" height="9" rx="1" opacity="0.3" /><rect x="5" y="2" width="3" height="10" rx="1" opacity="0.5" /><rect x="10" y="1" width="3" height="11" rx="1" opacity="0.7" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><path d="M8.5 2.5C10.8 2.5 12.8 3.5 14.2 5.1L15.5 3.8C13.7 1.8 11.2 0.5 8.5 0.5C5.8 0.5 3.3 1.8 1.5 3.8L2.8 5.1C4.2 3.5 6.2 2.5 8.5 2.5ZM8.5 6.5C9.9 6.5 11.1 7.1 12 8L13.3 6.7C12 5.4 10.3 4.5 8.5 4.5C6.7 4.5 5 5.4 3.7 6.7L5 8C5.9 7.1 7.1 6.5 8.5 6.5ZM8.5 10.5C9.1 10.5 9.6 10.2 10 9.8L8.5 8L7 9.8C7.4 10.2 7.9 10.5 8.5 10.5Z" /></svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="currentColor"><rect x="0" y="1" width="22" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35" /><rect x="23.5" y="4.5" width="2" height="4" rx="1" opacity="0.4" /><rect x="2" y="3" width="18" height="7" rx="1.5" /></svg>
      </div>
    </div>
  )
}

function BottomNavBar() {
  return (
    <div className="h-[64px] bg-white border-t border-gray-100 flex items-start justify-around px-6 pt-1">
      <div className="p-2 text-gray-900"><Home size={24} strokeWidth={1.8} /></div>
      <div className="p-2 relative">
        <img src="/grok-icon-bg.svg" alt="" className="w-7 h-7 rounded-[8px] -mt-px" />
      </div>
      <div className="p-2 text-gray-900"><img src="/ph_bell-bold.svg" alt="" className="w-6 h-6" /></div>
      <div className="p-2 text-gray-900"><img src="/lucide_mail.svg" alt="" className="w-6 h-6" /></div>
    </div>
  )
}

function HeaderBar({ left, center, onModelClick, currentModel, modelDropdownOpen, rightButtons }) {
  return (
    <div className="relative flex items-center justify-between px-4 py-2.5 min-h-[52px]">
      <div className="flex-shrink-0 z-10">{left}</div>
      {center ? (
        <div className="absolute left-1/2 -translate-x-1/2">
          {center}
        </div>
      ) : onModelClick && currentModel ? (
        <button
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5"
          onClick={onModelClick}
        >
          {currentModel.icon === 'auto' && <Sparkles size={16} className="text-gray-900" strokeWidth={2} />}
          {currentModel.icon === 'fast' && <Zap size={16} className="text-gray-900" strokeWidth={2} />}
          {currentModel.icon === 'expert' && <Lightbulb size={16} className="text-gray-900" strokeWidth={2} />}
          {currentModel.icon === 'grok420' && <GrokIcon size={16} className="text-gray-900" />}
          <span className="text-[16px] font-semibold">{currentModel.label}</span>
          {modelDropdownOpen
            ? <ChevronUp size={16} className="text-gray-500" />
            : <ChevronDown size={16} className="text-gray-500" />
          }
        </button>
      ) : null}
      <div className="flex items-center gap-4 z-10">
        {rightButtons}
      </div>
    </div>
  )
}

function TextSelectionPopup({ containerRef, wrapperRef, onAskGrok }) {
  const [pos, setPos] = useState(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const check = () => {
      const sel = window.getSelection()
      if (!sel || sel.isCollapsed || !sel.rangeCount) { setPos(null); return }
      const range = sel.getRangeAt(0)
      if (!container.contains(range.commonAncestorContainer)) { setPos(null); return }
      const rect = range.getBoundingClientRect()
      const wrapper = wrapperRef?.current || container.parentElement
      const wRect = wrapper.getBoundingClientRect()
      setPos({ x: rect.left + rect.width / 2 - wRect.left, y: rect.top - wRect.top })
    }
    document.addEventListener('selectionchange', check)
    return () => document.removeEventListener('selectionchange', check)
  }, [containerRef, wrapperRef])

  if (!pos) return null
  const popupWidth = 310
  const wrapperWidth = wrapperRef?.current?.offsetWidth || 393
  let left = pos.x - popupWidth / 2
  if (left < 4) left = 4
  if (left + popupWidth > wrapperWidth - 4) left = wrapperWidth - popupWidth - 4

  return (
    <div
      className="absolute z-[60] flex items-center rounded-full py-0.5 px-0.5"
      style={{ left, top: pos.y - 40, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', boxShadow: '0 4px 32px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.06)' }}
    >
      <button
        className="flex items-center gap-1.5 px-3 py-[3px] rounded-full active:bg-black/5"
        onClick={() => {
          const sel = window.getSelection()
          const text = sel?.toString()?.trim()
          if (text && onAskGrok) onAskGrok(text)
          sel?.removeAllRanges()
          setPos(null)
        }}
      >
        <img src="/grok-logo.svg" alt="" className="w-3.5 h-3.5" />
        <span className="text-[13px] text-gray-900 font-medium whitespace-nowrap">Ask Grok</span>
      </button>
      <div className="w-px h-4 bg-gray-300/40" />
      <button
        className="px-3 py-[3px] rounded-full active:bg-black/5"
        onClick={() => {
          const sel = window.getSelection()
          if (sel) { navigator.clipboard?.writeText(sel.toString()); sel.removeAllRanges() }
          setPos(null)
        }}
      >
        <span className="text-[13px] text-gray-900 font-medium">Copy</span>
      </button>
      <div className="w-px h-4 bg-gray-300/40" />
      <button
        className="px-3 py-[3px] rounded-full active:bg-black/5"
        onClick={() => {
          const container = containerRef.current
          if (container) {
            const range = document.createRange()
            range.selectNodeContents(container)
            const sel = window.getSelection()
            sel?.removeAllRanges()
            sel?.addRange(range)
          }
        }}
      >
        <span className="text-[13px] text-gray-900 font-medium whitespace-nowrap">Select All</span>
      </button>
      <div className="w-px h-4 bg-gray-300/40" />
      <button className="px-2 py-[3px] rounded-full active:bg-black/5">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
      </button>
    </div>
  )
}

function BackArrow({ onClick }) {
  return (
    <button onClick={onClick} className="w-8 h-8 flex items-center justify-center active:opacity-60">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
    </button>
  )
}

const SEARCH_BAR_GRADIENT = 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(252,252,252,1) 40%)'

function AddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0 active:bg-gray-50 shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
    >
      <Plus size={18} className="text-gray-500" />
    </button>
  )
}

function SearchInputBar({ onPlusClick, onInputClick, onEqClick, onMicClick }) {
  return (
    <div className="px-3 py-2 flex items-center gap-2">
      <AddButton onClick={onPlusClick} />
      <div
        className="flex-1 flex items-center bg-white rounded-full px-3.5 py-2 gap-2 shadow-[0_2px_12px_rgba(0,0,0,0.1)] cursor-pointer"
        onClick={onInputClick}
      >
        <img src="/grok-search-logo.svg" alt="" className="w-5 h-5 flex-shrink-0" />
        <span className="text-[15px] text-gray-400 flex-1 text-left">Search with Grok</span>
        <button onClick={(e) => { e.stopPropagation(); onMicClick?.() }} className="active:opacity-60">
          <Mic size={18} className="text-gray-400 flex-shrink-0" />
        </button>
      </div>
      <button
        className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0 active:bg-gray-700 shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
        onClick={onEqClick}
      >
        <EqIcon size={18} className="text-white" />
      </button>
    </div>
  )
}

function BottomBarOverlay({ onPlusClick, onInputClick, onEqClick, onMicClick }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
      <div className="pointer-events-auto" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,1) 50%)' }}>
        <div className="pt-6">
          <SearchInputBar onPlusClick={onPlusClick} onInputClick={onInputClick} onEqClick={onEqClick} onMicClick={onMicClick} />
        </div>
        <BottomNavBar />
      </div>
    </div>
  )
}

function GrokipediaView({ onBack }) {
  return (
    <div className="absolute inset-0 bg-white z-30 flex flex-col" style={{ borderRadius: 44, overflow: 'hidden' }}>
      <StatusBar />
      <div className="flex-1 overflow-y-auto min-h-0 flex flex-col">
        <div className="flex items-center px-4 py-2.5 relative z-10">
          <BackArrow onClick={onBack} />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <h1 className="text-[36px] font-serif font-normal text-gray-900 tracking-tight">Grokipedia</h1>
          <span className="text-[15px] text-gray-400 italic -mt-0.5">v0.2</span>

          <div className="w-full mt-6">
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 gap-2.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 flex-shrink-0"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
              <span className="text-[15px] text-gray-400 flex-1">Quantum computing</span>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
              </div>
            </div>
          </div>

          <div className="w-full mt-4">
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-bold text-gray-900">Ali Khamenei</span>
                  <span className="text-[13px] text-gray-400">14 minutes ago</span>
                </div>
                <p className="text-[14px] text-gray-500 mt-0.5">New edit approved by Grok</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavBar />
    </div>
  )
}

function VoiceModeView({ onBack, onOpenChatHistory, onOpenNewChat, currentModel, onToggleModelDropdown, modelDropdownOpen }) {
  return (
    <div className="absolute inset-0 bg-white z-30 flex flex-col" style={{ borderRadius: 44, overflow: 'hidden' }}>
      <StatusBar />
      <HeaderBar
        left={<BackArrow onClick={onBack} />}
        onModelClick={onToggleModelDropdown}
        currentModel={currentModel}
        modelDropdownOpen={modelDropdownOpen}
        rightButtons={<>
          <button className="active:opacity-60" onClick={onOpenChatHistory}>
            <Clock size={22} className="text-gray-900" strokeWidth={1.8} />
          </button>
          <button className="active:opacity-60" onClick={onOpenNewChat}>
            <SquarePen size={22} className="text-gray-900" strokeWidth={1.8} />
          </button>
        </>}
      />
      <div className="flex-1 flex flex-col min-h-0">

        <div className="flex-1 flex flex-col items-center justify-center">
          <span className="text-[17px] text-gray-400">Start talking</span>
        </div>

        <div className="px-4 pb-3">
          <div className="flex gap-3 justify-center mb-4">
            <button className="flex-1 max-w-[120px] h-[52px] bg-gray-100 rounded-full flex items-center justify-center active:bg-gray-200">
              <Mic size={22} className="text-gray-700" strokeWidth={1.8} />
            </button>
            <button className="flex-1 max-w-[120px] h-[52px] bg-gray-100 rounded-full flex items-center justify-center active:bg-gray-200">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
            </button>
            <button className="flex-1 max-w-[120px] h-[52px] bg-gray-100 rounded-full flex items-center justify-center active:bg-gray-200">
              <Settings size={22} className="text-gray-700" strokeWidth={1.8} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center bg-gray-100 rounded-full px-3.5 py-2 gap-2">
              <span className="text-[15px] text-gray-400 flex-1">Ask anything</span>
            </div>
            <button className="h-[36px] px-4 bg-gray-900 rounded-full flex items-center gap-2 active:bg-gray-700">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>
              <span className="text-[14px] text-white font-medium">Stop</span>
            </button>
          </div>
        </div>
      </div>

      <BottomNavBar />
    </div>
  )
}

function UploadSheet({ isOpen, onClose, onCreateImage, onEditImage }) {
  return (
    <>
      <div
        className={`absolute inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-[16px] z-50 transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-[36px] h-[5px] bg-[#c4c5c7] rounded-full" />
        </div>
        <h3 className="text-center font-semibold text-[17px] pb-5">Upload</h3>
        <div className="px-6 flex flex-col gap-5 pb-4">
          <button className="flex items-center gap-4 w-full active:bg-gray-50 rounded-lg">
            <div className="w-[44px] h-[44px] rounded-full bg-[#eff3f4] flex items-center justify-center flex-shrink-0">
              <img src="/upload-files.svg" alt="" className="w-[20px] h-[20px]" />
            </div>
            <span className="text-[16px] font-medium">Files</span>
          </button>
          <button className="flex items-center gap-4 w-full active:bg-gray-50 rounded-lg">
            <div className="w-[44px] h-[44px] rounded-full bg-[#eff3f4] flex items-center justify-center flex-shrink-0">
              <img src="/upload-camera.svg" alt="" className="w-[20px] h-[20px]" />
            </div>
            <span className="text-[16px] font-medium">Camera</span>
          </button>
          <button className="flex items-center gap-4 w-full active:bg-gray-50 rounded-lg">
            <div className="w-[44px] h-[44px] rounded-full bg-[#eff3f4] flex items-center justify-center flex-shrink-0">
              <img src="/upload-photos.svg" alt="" className="w-[20px] h-[20px]" />
            </div>
            <span className="text-[16px] font-medium">Photos</span>
          </button>
        </div>
        <div className="mx-6 border-t border-gray-200" />
        <div className="px-6 flex flex-col gap-5 pt-5 pb-8">
          <button
            className="flex items-center gap-4 w-full active:bg-gray-50 rounded-lg"
            onClick={() => { onClose(); onCreateImage?.(); }}
          >
            <div className="w-[44px] h-[44px] rounded-full bg-[#eff3f4] flex items-center justify-center flex-shrink-0">
              <img src="/upload-create-image.svg" alt="" className="w-[20px] h-[20px]" />
            </div>
            <span className="text-[16px] font-medium">Create Image</span>
          </button>
          <button
            className="flex items-center gap-4 w-full active:bg-gray-50 rounded-lg"
            onClick={() => { onClose(); onEditImage?.(); }}
          >
            <div className="w-[44px] h-[44px] rounded-full bg-[#eff3f4] flex items-center justify-center flex-shrink-0">
              <img src="/upload-edit-image.svg" alt="" className="w-[20px] h-[20px]" />
            </div>
            <span className="text-[16px] font-medium">Edit Image</span>
          </button>
        </div>
      </div>
    </>
  )
}

const CHAT_IMAGES = [
  { color: '#f97316', label: 'Product shots' },
  { color: '#3b82f6', label: 'Neural art' },
  { color: '#1e293b', label: 'Fashion tech' },
  { color: '#d946ef', label: 'Mars colony' },
  { color: '#06b6d4', label: 'Abstract orb' },
  { color: '#334155', label: 'Dashboard' },
]

const CONVERSATIONS = [
  { title: 'Friendly Surprise Greeting', time: 'Today at 3:42 PM' },
  { title: 'OpenClaw: Open-Source AI Agent', time: 'Today at 2:26 PM' },
  { title: 'OpenClaw: Self-Hosted AI Agent', time: 'Today at 11:58 AM' },
  { title: 'Friendly Chat with Ara', time: 'Today at 9:50 AM' },
  { title: 'Norway Tops 2026 Winter Olympics Medals', time: 'Yesterday at 9:49 AM' },
  { title: 'Casual Audio Check Greeting', time: 'Yesterday at 2:23 AM' },
  { title: 'Fashion Tech Startup Perplexity Visual', time: 'Friday, February 20 at 5:49 PM' },
]

function ChatHistoryView({ onBack, onNewChat }) {
  return (
    <div className="absolute inset-0 bg-white z-30 flex flex-col" style={{ borderRadius: 44, overflow: 'hidden' }}>
      <StatusBar />
      <div className="flex-1 overflow-y-auto min-h-0">
        <HeaderBar
          left={<BackArrow onClick={onBack} />}
          center={<span className="text-[17px] font-bold">Chat History</span>}
          rightButtons={
            <button className="active:opacity-60" onClick={onNewChat}>
              <SquarePen size={22} className="text-gray-900" strokeWidth={1.8} />
            </button>
          }
        />
        {/* Content */}
        <div className="px-4">
        <h3 className="text-[15px] font-bold mb-2">Images</h3>
        <div className="grid grid-cols-3 gap-1.5 mb-5">
          {CHAT_IMAGES.map((img, i) => (
            <div key={i} className="aspect-square rounded-xl" style={{ backgroundColor: img.color }} />
          ))}
        </div>
        <h3 className="text-[15px] font-bold mb-1">Conversations</h3>
        {CONVERSATIONS.map((conv, i) => (
          <button key={i} className="w-full text-left py-3 active:bg-gray-50">
            <div className="text-[15px] font-semibold">{conv.title}</div>
            <div className="text-[13px] text-gray-400 mt-0.5">{conv.time}</div>
          </button>
        ))}
        <div className="h-8" />
        </div>
      </div>
    </div>
  )
}

function NewChatView({ onBack }) {
  return (
    <div className="absolute inset-0 bg-white z-30 flex flex-col items-center justify-center" style={{ borderRadius: 44 }}>
      <div className="absolute top-0 left-0 right-0 z-10"><StatusBar /></div>
      {/* Header */}
      <div className="absolute top-[38px] left-0 right-0 flex items-center justify-between px-4 py-2.5">
        <button onClick={onBack} className="active:opacity-60">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-[17px] font-bold">New Chat</span>
        <div className="w-6" />
      </div>
      {/* Empty State */}
      <div className="flex flex-col items-center gap-3">
        <GrokIcon size={48} className="text-gray-300" />
        <p className="text-gray-400 text-[15px]">What can I help you with?</p>
      </div>
    </div>
  )
}

const TRENDING_CATEGORIES = [
  { label: 'Technology', color: '#1e3a5f', gradient: 'linear-gradient(135deg, #0f2b46 0%, #1a4a7a 100%)' },
  { label: 'Business & Finance', color: '#1a2744', gradient: 'linear-gradient(135deg, #162038 0%, #2a4060 100%)' },
  { label: 'Food', color: '#5c3a1e', gradient: 'linear-gradient(135deg, #4a2e14 0%, #8a5a30 100%)' },
  { label: 'Sports', color: '#1a4a2e', gradient: 'linear-gradient(135deg, #0f3a20 0%, #2a6a40 100%)' },
  { label: 'Entertainment', color: '#4a1a4a', gradient: 'linear-gradient(135deg, #3a0e3a 0%, #6a2a6a 100%)' },
]

const TRENDING_PILLS = ['Hillary Clinton', 'Paramount', 'Warner Bros', 'Bill Clinton', 'NATO', 'Tesla']

const POPULAR_POSTS = [
  {
    name: 'dhwani',
    handle: '@dhwanisaraiya_',
    time: '17h',
    avatar: '#6366f1',
    content: 'there are sentences being said that have never been said before',
    quote: {
      icon: '📊',
      name: 'Polymarket',
      handle: '@Polymarket',
      verified: true,
      time: '20h',
      text: 'JUST IN: Pope Leo asks priests to stop using artificial intelligence to write sermons.',
    },
    stats: { comments: '211', retweets: '40K', likes: '369K', views: '4.6M' },
  },
  {
    name: 'Thomas Massie',
    handle: '@RepThomasMas...',
    time: '20h',
    avatar: '#3b82f6',
    verified: true,
    flag: '🇺🇸',
    content: 'CEO of World Economic Forum resigns.\nYou\'re welcome.',
    quote: {
      icon: '📊',
      name: 'Polymarket',
      handle: '@Polymarket',
      verified: true,
      time: '21h',
      text: 'BREAKING: President and CEO of the World Economic Forum resigns.',
    },
    stats: { comments: '1.2K', retweets: '18K', likes: '142K', views: '8.2M' },
  },
  {
    name: 'Lex Fridman',
    handle: '@lexfridman',
    time: '5h',
    avatar: '#1e293b',
    verified: true,
    content: 'The best ideas often come from people who have no business being in the room.',
    stats: { comments: '892', retweets: '12K', likes: '98K', views: '3.1M' },
  },
  {
    name: 'NASA',
    handle: '@NASA',
    time: '8h',
    avatar: '#1e40af',
    verified: true,
    content: 'Webb Space Telescope captures the most detailed image ever taken of a galaxy 13 billion light-years away. We\'re literally looking back in time.',
    stats: { comments: '3.4K', retweets: '52K', likes: '410K', views: '18M' },
  },
  {
    name: 'Sahil Bloom',
    handle: '@SahilBloom',
    time: '12h',
    avatar: '#059669',
    verified: true,
    content: 'The 5 most underrated skills:\n\n1. Asking good questions\n2. Saying no gracefully\n3. Writing clearly\n4. Listening without waiting to talk\n5. Admitting when you\'re wrong',
    stats: { comments: '1.8K', retweets: '24K', likes: '186K', views: '9.7M' },
  },
  {
    name: 'Reuters',
    handle: '@Reuters',
    time: '3h',
    avatar: '#dc2626',
    verified: true,
    content: 'BREAKING: EU reaches landmark agreement on comprehensive AI regulation framework, setting global precedent for technology governance.',
    quote: {
      icon: '🇪🇺',
      name: 'European Commission',
      handle: '@EU_Commission',
      verified: true,
      time: '4h',
      text: 'Today marks a historic moment for digital policy in Europe.',
    },
    stats: { comments: '2.1K', retweets: '31K', likes: '89K', views: '12M' },
  },
  {
    name: 'Patrick Collison',
    handle: '@patrickc',
    time: '14h',
    avatar: '#7c3aed',
    verified: true,
    content: 'Underappreciated fact: the average smartphone today has more computing power than all of NASA had during the Apollo missions. And we use it to argue with strangers.',
    stats: { comments: '654', retweets: '8.9K', likes: '72K', views: '4.3M' },
  },
  {
    name: 'The Economist',
    handle: '@TheEconomist',
    time: '6h',
    avatar: '#b91c1c',
    verified: true,
    content: 'Why the global economy is more resilient than you think — and what risks remain heading into Q2 2026.',
    stats: { comments: '445', retweets: '5.2K', likes: '28K', views: '2.8M' },
  },
]

function GlobalTrendingView({ onBack, onOpenUpload, onVoiceMode, onMicClick }) {
  return (
    <div className="absolute inset-0 bg-white z-30 flex flex-col" style={{ borderRadius: 44, overflow: 'hidden' }}>
      <StatusBar />
      <div className="flex-1 overflow-y-auto min-h-0">
        <HeaderBar
          left={
            <button onClick={onBack} className="active:opacity-60">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
          }
          center={<span className="text-[17px] font-bold">Global Trending</span>}
          rightButtons={<div className="w-6" />}
        />
        {/* Category Cards */}
        <div className="flex gap-2 px-4 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none' }}>
          {TRENDING_CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="flex-shrink-0 w-[140px] h-[70px] rounded-xl flex items-end p-2.5"
              style={{ background: cat.gradient }}
            >
              <span className="text-white text-[13px] font-semibold">{cat.label}</span>
            </div>
          ))}
        </div>

        {/* Trending Pills */}
        <div className="flex gap-2 px-4 overflow-x-auto py-2" style={{ scrollbarWidth: 'none' }}>
          {TRENDING_PILLS.map((pill) => (
            <button key={pill} className="flex-shrink-0 px-4 py-1.5 rounded-full border border-gray-200 bg-white text-[13px] font-medium text-gray-900 active:bg-gray-50">
              {pill}
            </button>
          ))}
        </div>

        {/* Popular today */}
        <div className="px-4 pt-2">
          <p className="text-[14px] font-semibold text-gray-500 mb-1">Popular today</p>
        </div>

        {POPULAR_POSTS.map((post, i) => (
          <div key={i} className="px-4 py-3 border-b border-gray-100">
            <div className="flex gap-2.5">
              <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[14px] font-bold" style={{ backgroundColor: post.avatar }}>
                {post.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-[15px] font-bold truncate">{post.name}</span>
                  {post.verified && <svg width="16" height="16" viewBox="0 0 24 24" fill="#1d9bf0"><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81C14.67 2.88 13.43 2 12 2s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81C9.33 21.12 10.57 22 12 22s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91C21.12 14.67 22 13.43 22 12zm-11.07 4.83l-3.43-3.43 1.06-1.06 2.37 2.37 5.7-5.7 1.06 1.06-6.76 6.76z" /></svg>}
                  {post.flag && <span className="text-[14px]">{post.flag}</span>}
                  <span className="text-[13px] text-gray-400">{post.handle} · {post.time}</span>
                  <X size={14} className="text-gray-300 ml-auto flex-shrink-0" />
                </div>
                <p className="text-[15px] text-gray-900 mt-0.5 whitespace-pre-line">{post.content}</p>

                {post.quote && (
                  <div className="mt-2 border border-gray-200 rounded-xl p-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px]">{post.quote.icon}</span>
                      <span className="text-[13px] font-bold">{post.quote.name}</span>
                      {post.quote.verified && <svg width="14" height="14" viewBox="0 0 24 24" fill="#f7b928"><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81C14.67 2.88 13.43 2 12 2s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81C9.33 21.12 10.57 22 12 22s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91C21.12 14.67 22 13.43 22 12zm-11.07 4.83l-3.43-3.43 1.06-1.06 2.37 2.37 5.7-5.7 1.06 1.06-6.76 6.76z" /></svg>}
                      <span className="text-[12px] text-gray-400">{post.quote.handle} · {post.quote.time}</span>
                    </div>
                    <p className="text-[14px] text-gray-900 mt-1">{post.quote.text}</p>
                  </div>
                )}

                <div className="flex items-center justify-between mt-3 text-gray-400">
                  <div className="flex items-center gap-1">
                    <MessageCircle size={15} strokeWidth={1.5} />
                    <span className="text-[12px]">{post.stats.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Repeat2 size={15} strokeWidth={1.5} />
                    <span className="text-[12px]">{post.stats.retweets}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart size={15} strokeWidth={1.5} />
                    <span className="text-[12px]">{post.stats.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart3 size={15} strokeWidth={1.5} />
                    <span className="text-[12px]">{post.stats.views}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bookmark size={15} strokeWidth={1.5} />
                    <Share size={15} strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="h-32" />
      </div>

      <BottomBarOverlay onPlusClick={onOpenUpload} onEqClick={onVoiceMode} onMicClick={onMicClick} />
    </div>
  )
}

const KEYBOARD_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'delete'],
]

const AUTOCOMPLETE_WORDS = {
  '': ['"the"', 'a', 'to'],
  'w': ['"was"', 'will', 'with'],
  'wh': ['"what"', 'when', 'where'],
  'wha': ['"what"', 'whatever', 'whale'],
  'what': ['"what"', 'whatever', 'whats'],
  'what ': ['"is"', 'are', 'do'],
  'what i': ['"is"', "isn't", 'issue'],
  'what is': ['"is"', "isn't", 'issue'],
  'what is ': ['"the"', 'a', 'my'],
}

function getAutocomplete(text) {
  const t = text.toLowerCase()
  if (AUTOCOMPLETE_WORDS[t]) return AUTOCOMPLETE_WORDS[t]
  const keys = Object.keys(AUTOCOMPLETE_WORDS).filter((k) => t.startsWith(k)).sort((a, b) => b.length - a.length)
  return keys.length > 0 ? AUTOCOMPLETE_WORDS[keys[0]] : ['"the"', 'I', 'to']
}

function IOSKeyboard({ isOpen, onKey, searchText, onHeightChange }) {
  const suggestions = getAutocomplete(searchText || '')
  const kbRef = useRef(null)

  useEffect(() => {
    if (kbRef.current && onHeightChange) {
      const h = kbRef.current.offsetHeight
      onHeightChange(h)
    }
  })

  return (
    <div
      ref={kbRef}
      className={`absolute left-0 right-0 bottom-0 z-40 transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full pointer-events-none'}`}
      style={{ background: '#d1d3d9' }}
    >
      {searchText && (
        <div className="flex border-b border-gray-300/60 bg-[#d1d3d9]">
          {suggestions.map((word, i) => (
            <button
              key={i}
              className={`flex-1 py-2 text-[15px] text-center ${i < suggestions.length - 1 ? 'border-r border-gray-300/60' : ''}`}
              onClick={() => {
                const clean = word.replace(/"/g, '')
                onKey(clean)
              }}
            >
              {word}
            </button>
          ))}
        </div>
      )}
      <div className="px-1 pt-2 pb-1">
        {KEYBOARD_ROWS.map((row, ri) => (
          <div key={ri} className="flex justify-center gap-[5px] mb-[6px]">
            {row.map((key) => {
              if (key === 'shift') return (
                <button key={key} className="w-10 h-[42px] bg-white rounded-[5px] flex items-center justify-center" style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.3)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                </button>
              )
              if (key === 'delete') return (
                <button key={key} className="w-10 h-[42px] bg-[#adb3bc] rounded-[5px] flex items-center justify-center" style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.3)' }} onClick={() => onKey('backspace')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z" /><line x1="18" y1="9" x2="12" y2="15" /><line x1="12" y1="9" x2="18" y2="15" /></svg>
                </button>
              )
              return (
                <button
                  key={key}
                  className="flex-1 max-w-[35px] h-[42px] bg-white rounded-[5px] flex items-center justify-center text-[20px] font-light"
                  style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.3)' }}
                  onClick={() => onKey(key)}
                >
                  {key}
                </button>
              )
            })}
          </div>
        ))}
      </div>
      <div className="flex gap-[5px] px-1 pb-1">
        <button className="h-[42px] px-3 bg-[#adb3bc] rounded-[5px] flex items-center justify-center text-[15px]" style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.3)' }}>123</button>
        <button className="h-[42px] px-3 bg-[#adb3bc] rounded-[5px] flex items-center justify-center" style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.3)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round" /><line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round" /></svg>
        </button>
        <button className="flex-1 h-[42px] bg-white rounded-[5px] flex items-center justify-center text-[15px]" style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.3)' }} onClick={() => onKey(' ')}>space</button>
        <button className="h-[42px] px-3 bg-[#adb3bc] rounded-[5px] flex items-center justify-center" style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.3)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 10 4 15 9 20" /><path d="M20 4v7a4 4 0 01-4 4H4" /></svg>
        </button>
      </div>
      <div className="flex items-center justify-between px-4 h-10 bg-[#d1d3d9]">
        <Globe size={22} className="text-gray-600" strokeWidth={1.5} />
        <Mic size={22} className="text-gray-600" strokeWidth={1.5} />
      </div>
    </div>
  )
}

const SEARCH_RESULT_TABS = ['Top', 'Latest', 'People', 'Videos', 'Photos']

const VIDEO_TWEETS = [
  {
    name: 'Learn Open Claw 🦞',
    handle: '@LearnOpenClaw',
    time: '8m',
    avatar: '#ef4444',
    verified: true,
    badge: '🤖 Automated',
    content: 'One hour crash course on **OpenClaw** for beginners just dropped 🦞',
    hasVideo: true,
    videoTitle: 'Build Your Own AI Agent',
    videoSubtitle: 'Go from 0 to 1 with OpenClaw 🦞',
    videoDuration: '78:31',
    stats: { comments: '211', retweets: '40K', likes: '389K', views: '4.6M' },
  },
  {
    name: 'Fireship',
    handle: '@firaborsa',
    time: '3h',
    avatar: '#f59e0b',
    verified: true,
    content: 'OpenClaw in 100 seconds. Self-hosted AI agents are the new hotness.',
    hasVideo: true,
    videoTitle: 'OpenClaw in 100 Seconds',
    videoSubtitle: 'Self-hosted AI agents explained fast',
    videoDuration: '2:14',
    stats: { comments: '145', retweets: '2.3K', likes: '18K', views: '890K' },
  },
  {
    name: 'AI Explained',
    handle: '@ai_explained',
    time: '6h',
    avatar: '#8b5cf6',
    verified: true,
    content: 'Deep dive into the architecture behind **OpenClaw** — how the multi-agent coordination actually works under the hood.',
    hasVideo: true,
    videoTitle: 'How OpenClaw Actually Works',
    videoSubtitle: 'Multi-agent architecture deep dive',
    videoDuration: '24:07',
    stats: { comments: '89', retweets: '1.1K', likes: '8.9K', views: '312K' },
  },
  {
    name: 'Theo',
    handle: '@t3dotgg',
    time: '12h',
    avatar: '#3b82f6',
    verified: true,
    content: 'I let **OpenClaw** manage my entire dev workflow for a day. Here\'s what happened.',
    hasVideo: true,
    videoTitle: 'OpenClaw Ran My Dev Life for 24h',
    videoSubtitle: 'The good, the bad, and the terrifying',
    videoDuration: '18:45',
    stats: { comments: '234', retweets: '3.4K', likes: '24K', views: '1.2M' },
  },
  {
    name: 'Code with Ryan',
    handle: '@codewithryan',
    time: '1d',
    avatar: '#10b981',
    content: 'Step-by-step **OpenClaw** setup tutorial on a $5/mo VPS. Fully self-hosted, no data leaves your server.',
    hasVideo: true,
    videoTitle: 'Self-Host OpenClaw for $5/month',
    videoSubtitle: 'Complete setup guide for beginners',
    videoDuration: '32:19',
    stats: { comments: '56', retweets: '890', likes: '5.6K', views: '178K' },
  },
]

const PHOTO_TWEETS = [
  {
    name: 'Business Buyer',
    handle: '@dawsmik',
    time: '20s',
    avatar: '#6366f1',
    verified: true,
    replyTo: '@lawyer4SMBs',
    content: 'I built this architecture for Openclaw to try and utilize the best attributes of each LLM.',
    photos: ['#e2e8f0', '#cbd5e1'],
    stats: { comments: '12', retweets: '89', likes: '1.2K', views: '45K' },
  },
  {
    name: 'Sarah K.',
    handle: '@sarahk_ai',
    time: '1h',
    avatar: '#ec4899',
    content: 'My **OpenClaw** dashboard setup. Clean terminal vibes 🧑‍💻',
    photos: ['#1e293b'],
    stats: { comments: '34', retweets: '210', likes: '1.8K', views: '56K' },
  },
  {
    name: 'AI Infographics',
    handle: '@ai_infographics',
    time: '3h',
    avatar: '#f97316',
    verified: true,
    content: 'OpenClaw vs AutoGPT vs CrewAI — a visual comparison of the three most popular open-source AI agent frameworks.',
    photos: ['#fef3c7', '#fde68a', '#fcd34d'],
    stats: { comments: '78', retweets: '1.4K', likes: '9.2K', views: '423K' },
  },
  {
    name: 'Dev Setups',
    handle: '@dev_setups',
    time: '5h',
    avatar: '#6366f1',
    content: 'Running **OpenClaw** on my home lab setup. 3x RTX 4090s for local inference. No cloud needed.',
    photos: ['#334155', '#475569'],
    stats: { comments: '156', retweets: '2.1K', likes: '15K', views: '678K' },
  },
  {
    name: 'Mike Torres',
    handle: '@miketorres',
    time: '8h',
    avatar: '#f59e0b',
    content: 'Screenshots of **OpenClaw** managing my entire morning routine. Calendar, emails, Slack — all on autopilot.',
    photos: ['#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8'],
    stats: { comments: '45', retweets: '670', likes: '4.3K', views: '198K' },
  },
]

const SEARCH_RESULT_TWEETS = [
  {
    name: 'Business Buyer',
    handle: '@dawsmik',
    time: '20s',
    avatar: '#6366f1',
    verified: true,
    replyTo: '@lawyer4SMBs',
    content: 'I built this architecture for Openclaw to try and utilize the best attributes of each LLM. Not sure how well it will work, but fingers crossed. Maybe you could get some ideas from it. I never thought about giving each persona their own SOUL file until it was brought up here.',
    hasImage: true,
    imageColor: '#f3f4f6',
    stats: { comments: '12', retweets: '89', likes: '1.2K', views: '45K' },
  },
  {
    name: 'Alex Chen',
    handle: '@alexc_dev',
    time: '2m',
    avatar: '#3b82f6',
    verified: true,
    content: 'Just tried OpenClaw and it\'s genuinely impressive. The multi-agent architecture is clever — each agent has a specific role and they coordinate through a shared context window. Open source too.',
    stats: { comments: '34', retweets: '156', likes: '892', views: '23K' },
  },
  {
    name: 'Sarah K.',
    handle: '@sarahk_ai',
    time: '5m',
    avatar: '#ec4899',
    content: 'OpenClaw vs AutoGPT vs CrewAI — a quick thread on what makes each unique 🧵\n\n1/ OpenClaw focuses on verification-first. Every agent is structurally prevented from agreeing with you.',
    stats: { comments: '67', retweets: '340', likes: '2.1K', views: '89K' },
  },
  {
    name: 'Dev Community',
    handle: '@dev_community',
    time: '15m',
    avatar: '#10b981',
    verified: true,
    content: 'OpenClaw just hit 10K stars on GitHub in its first week. The self-hosted AI agent space is heating up rapidly.',
    stats: { comments: '23', retweets: '412', likes: '3.4K', views: '156K' },
  },
  {
    name: 'Mike Torres',
    handle: '@miketorres',
    time: '1h',
    avatar: '#f59e0b',
    content: 'Finally got OpenClaw running locally. The installation guide is really well written. If you have a M-series Mac, you can run it fully offline with Llama 3.',
    stats: { comments: '8', retweets: '56', likes: '445', views: '12K' },
  },
]

const LATEST_TWEETS = [
  {
    name: 'Learn Open Claw 🦞',
    handle: '@LearnOpenClaw',
    time: '8m',
    avatar: '#ef4444',
    verified: true,
    badge: '🤖 Automated',
    content: 'One hour crash course on **OpenClaw** for beginners just dropped 🦞\n\n✅ Learn **what** AI Agents are\n\n✅ Learn **what** @openclaw **is** and **what** makes it so powerful\n\n✅ Learn to set up **OpenClaw** for under $5/month on the cloud (step by step even as a beginner)!',
    hasVideo: true,
    videoTitle: 'Build Your Own AI Agent',
    videoSubtitle: 'Go from 0 to 1 with OpenClaw 🦞',
    videoDuration: '78:31',
    stats: { comments: '211', retweets: '40K', likes: '389K', views: '4.6M' },
  },
  {
    name: 'Roger Griffin',
    handle: '@RogGriff',
    time: '12m',
    avatar: '#6366f1',
    verified: true,
    content: 'Just got my first @openclaw agent wired on front and backend fully separated for clean, secure data flow.\n\nJan was incredible help. The setup guide is 🔥',
    stats: { comments: '18', retweets: '124', likes: '890', views: '34K' },
  },
  {
    name: 'AI Daily',
    handle: '@ai_daily',
    time: '25m',
    avatar: '#3b82f6',
    verified: true,
    content: 'OpenClaw just crossed 25K GitHub stars. The pace of adoption for self-hosted AI agents is unprecedented.\n\nFor context: AutoGPT took 3 weeks to hit the same milestone.',
    stats: { comments: '89', retweets: '1.2K', likes: '5.6K', views: '234K' },
  },
]

const PEOPLE_RESULTS = [
  {
    name: 'OpenClaw 🦞 🍋',
    handle: '@openclaw',
    avatar: '#ef4444',
    verified: 'gold',
    bio: 'The AI that does things. Emails, calendar, home automation, from your favorite chat app. Your machine, your rules. New shell, same lobster soul. 🦞',
    followedBy: 'Followed by Laura Sandoval and 47 others',
  },
  {
    name: 'openchance',
    handle: '@openclaw_',
    avatar: '#1e293b',
  },
  {
    name: 'OpenClaw XL',
    handle: '@OpenClawXL',
    avatar: '#9ca3af',
  },
  {
    name: 'OpenClaw ONE',
    handle: '@Cesar55OC',
    avatar: '#f59e0b',
  },
  {
    name: 'OpenClaw',
    handle: '@OpenC51546',
    avatar: '#f97316',
  },
]

function TweetCard({ tweet }) {
  return (
    <div className="px-4 py-3 border-b border-gray-100">
      <div className="flex gap-2.5">
        <div
          className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[14px] font-bold"
          style={{ backgroundColor: tweet.avatar }}
        >
          {tweet.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-[15px] font-bold truncate flex-shrink min-w-0">{tweet.name}</span>
            {tweet.verified === true && <svg width="16" height="16" viewBox="0 0 24 24" fill="#1d9bf0" className="flex-shrink-0"><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81C14.67 2.88 13.43 2 12 2s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81C9.33 21.12 10.57 22 12 22s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91C21.12 14.67 22 13.43 22 12zm-11.07 4.83l-3.43-3.43 1.06-1.06 2.37 2.37 5.7-5.7 1.06 1.06-6.76 6.76z" /></svg>}
            <span className="text-[13px] text-gray-400 truncate flex-shrink min-w-0">{tweet.handle} · {tweet.time}</span>
            <MoreHorizontal size={16} className="text-gray-300 ml-auto flex-shrink-0" />
          </div>
          {tweet.badge && (
            <p className="text-[12px] text-gray-400 mt-0.5">{tweet.badge}</p>
          )}
          {tweet.replyTo && (
            <p className="text-[13px] text-gray-400 mt-0.5">Replying to <span className="text-blue-500">{tweet.replyTo}</span></p>
          )}
          <p className="text-[15px] text-gray-900 mt-1 whitespace-pre-line" dangerouslySetInnerHTML={{
            __html: tweet.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/@(\w+)/g, '<span class="text-blue-500">@$1</span>')
          }} />
          {tweet.hasImage && (
            <div className="mt-2 rounded-xl overflow-hidden border border-gray-200" style={{ backgroundColor: tweet.imageColor }}>
              <div className="h-[160px] flex items-center justify-center">
                <div className="text-center px-4">
                  <p className="text-[13px] font-bold text-gray-600">PRO SE LEGAL TEAM</p>
                  <p className="text-[11px] text-gray-400 mt-1">Multi-Agent Architecture v4</p>
                </div>
              </div>
            </div>
          )}
          {tweet.hasVideo && (
            <div className="mt-2 rounded-xl overflow-hidden border border-gray-200 bg-gray-900 relative">
              <div className="h-[180px] flex items-center justify-center">
                <div className="text-center px-6">
                  <p className="text-[16px] font-bold text-white">{tweet.videoTitle}</p>
                  <p className="text-[12px] text-gray-400 mt-1">{tweet.videoSubtitle}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 bg-black/70 px-1.5 py-0.5 rounded text-[11px] text-white font-medium">
                {tweet.videoDuration}
              </div>
            </div>
          )}
          {tweet.photos && (
            <div className={`mt-2 rounded-xl overflow-hidden border border-gray-200 grid gap-0.5 ${tweet.photos.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {tweet.photos.map((color, idx) => (
                <div
                  key={idx}
                  className={`${tweet.photos.length === 1 ? 'h-[200px]' : tweet.photos.length === 3 && idx === 0 ? 'h-[200px] row-span-2' : 'h-[100px]'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
          <div className="flex items-center justify-between mt-3 text-gray-400">
            <div className="flex items-center gap-1">
              <MessageCircle size={15} strokeWidth={1.5} />
              <span className="text-[12px]">{tweet.stats.comments}</span>
            </div>
            <div className="flex items-center gap-1">
              <Repeat2 size={15} strokeWidth={1.5} />
              <span className="text-[12px]">{tweet.stats.retweets}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={15} strokeWidth={1.5} />
              <span className="text-[12px]">{tweet.stats.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <BarChart3 size={15} strokeWidth={1.5} />
              <span className="text-[12px]">{tweet.stats.views}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bookmark size={15} strokeWidth={1.5} />
              <Share size={15} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NewsDetailView({ newsItem, newsDetail, onBack, onOpenUpload, onVoiceMode, onMicClick }) {
  const [activeTab, setActiveTab] = useState('Top')
  const [expanded, setExpanded] = useState(false)
  const summaryText = expanded ? newsDetail.expandedSummary : newsDetail.summary

  return (
    <div className="absolute inset-0 bg-white z-30 flex flex-col" style={{ borderRadius: 44, overflow: 'hidden' }}>
      <StatusBar />
      <div className="flex-1 overflow-y-auto min-h-0">
        <HeaderBar
          left={<BackArrow onClick={onBack} />}
          rightButtons={<>
            <button className="active:opacity-60">
              <Bookmark size={22} className="text-gray-900" strokeWidth={1.8} />
            </button>
            <button className="active:opacity-60">
              <Flag size={22} className="text-gray-900" strokeWidth={1.8} />
            </button>
            <button className="active:opacity-60">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            </button>
          </>}
        />

        <div className="px-4 pt-2 pb-4">
          <h1 className="text-[26px] font-extrabold leading-tight">{newsItem.title}</h1>
          <p className="text-[15px] text-gray-900 leading-relaxed mt-3" dangerouslySetInnerHTML={{
            __html: summaryText
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .split('\n\n').map(para =>
                para.startsWith('• ') || para.includes('\n• ')
                  ? para.split('\n').map(line =>
                      line.startsWith('• ')
                        ? `<div style="display:flex;gap:8px;margin-top:6px;margin-left:4px"><span>•</span><span>${line.slice(2)}</span></div>`
                        : `<p>${line}</p>`
                    ).join('')
                  : `<p style="margin-top:12px">${para}</p>`
              ).join('')
              + (expanded
                ? ''
                : ' <span class="news-show-more" style="color:#3b82f6;cursor:pointer">Show more</span>')
          }} onClick={(e) => { if (e.target.classList.contains('news-show-more')) setExpanded(true) }} />
          {expanded && (
            <span className="text-[15px] text-blue-500 cursor-pointer mt-1 inline-block" onClick={() => setExpanded(false)}>Show less</span>
          )}
          <p className="text-[13px] text-gray-400 mt-3 leading-relaxed">This story is a summary of posts on X and may evolve over time. Grok can make mistakes, verify its outputs.</p>
        </div>

        <div className="flex border-b border-gray-100 px-4">
          {['Top', 'Latest'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-[14px] font-semibold text-center relative ${activeTab === tab ? 'text-gray-900' : 'text-gray-400'}`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-1/4 right-1/4 h-[3px] bg-blue-500 rounded-full" />}
            </button>
          ))}
        </div>

        {newsDetail.tweets.map((tweet, i) => (
          <TweetCard key={i} tweet={tweet} />
        ))}
        <div className="h-32" />
      </div>

      <BottomBarOverlay onPlusClick={onOpenUpload} onEqClick={onVoiceMode} onMicClick={onMicClick} />
    </div>
  )
}

function SearchResultsView({ query, onBack, onOpenProfile, onOpenChatHistory, onOpenNewChat, currentModel, onToggleModelDropdown, modelDropdownOpen, onOpenUpload, onVoiceMode, onMicClick }) {
  const [loading, setLoading] = useState(true)
  const [activeResultTab, setActiveResultTab] = useState('Top')
  const [wipOpen, setWipOpen] = useState(false)
  const [currentQuery, setCurrentQuery] = useState(query)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [summaryExpanded, setSummaryExpanded] = useState(false)
  const [summaryModalOpen, setSummaryModalOpen] = useState(false)
  const [kbHeight, setKbHeight] = useState(0)
  const [typedChars, setTypedChars] = useState(0)
  const [doneTyping, setDoneTyping] = useState(false)
  const [voiceListening, setVoiceListening] = useState(false)
  const [askGrokQuote, setAskGrokQuote] = useState(null)
  const inputRef = useRef(null)
  const summaryRef = useRef(null)
  const summaryTextRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => { setLoading(false); setTypedChars(0); setDoneTyping(false) }, 1000)
    return () => clearTimeout(timer)
  }, [currentQuery])

  useEffect(() => {
    if (searchFocused && inputRef.current) inputRef.current.focus()
  }, [searchFocused])

  const fullQuery = currentQuery.charAt(0).toUpperCase() + currentQuery.slice(1)
  const aiSummary = {
    text: `**OpenClaw** is an extremely popular **open-source, self-hosted AI agent** / personal AI assistant project that exploded in popularity in early 2026.`,
    expandedText: `**OpenClaw** is an extremely popular **open-source, self-hosted AI agent** / personal AI assistant project that exploded in popularity in early 2026.\n\n**What it does**\n\nOpenClaw lets you run a fully autonomous AI assistant on your own hardware. It can browse the web, write and execute code, manage files, interact with APIs, and chain together complex multi-step tasks — all without sending your data to external servers.\n\n**Important caveats**\n\nMany security researchers and companies (CrowdStrike, Microsoft, Malwarebytes, etc.) have published warnings about it because:\n\n• It can run arbitrary shell commands and access files on the machine it's installed on\n• Prompt injection remains unsolved → malicious messages could potentially make it do harmful things\n• A lot of people exposed instances publicly by accident\n• Running it safely usually means: isolated VM/container, limited permissions, audited skills, strong models, etc.\n\nIn short: OpenClaw is basically the breakout "AI that actually does stuff in your life" open-source project of early 2026 — hugely powerful and customizable, but comes with real security responsibility if you give it access to important accounts or data.`,
    pills: ['Think harder', 'OpenClaw installation guide', 'Similar'],
  }

  const plainWords = aiSummary.text.replace(/\*\*(.*?)\*\*/g, '$1').split(/\s+/)
  const totalWords = plainWords.length
  useEffect(() => {
    if (loading || doneTyping) return
    if (typedChars >= totalWords) {
      setDoneTyping(true)
      return
    }
    const wordsPerTick = Math.max(1, Math.ceil(totalWords / 20))
    const timer = setTimeout(() => setTypedChars(c => c + wordsPerTick), 20)
    return () => clearTimeout(timer)
  }, [loading, typedChars, doneTyping, totalWords])

  const handleNewSearch = (overrideQuery) => {
    const q = overrideQuery || searchText.trim()
    if (q) {
      setCurrentQuery(q)
      setSearchText('')
      setSearchFocused(false)
      setLoading(true)
      setActiveResultTab('Top')
      setTypedChars(0)
      setDoneTyping(false)
      setSummaryExpanded(false)
      setAskGrokQuote(null)
    }
  }

  return (
    <div className="absolute inset-0 bg-white z-30 flex flex-col" style={{ borderRadius: 44, overflow: 'hidden' }}>
      <StatusBar />
      <div className="flex-1 overflow-y-auto min-h-0">
        <HeaderBar
          left={
            <button onClick={onOpenProfile} className="active:opacity-60">
              <img src="/profile.png" alt="Profile" className="w-8 h-8 rounded-full object-cover" />
            </button>
          }
          onModelClick={onToggleModelDropdown}
          currentModel={currentModel}
          modelDropdownOpen={modelDropdownOpen}
          rightButtons={<>
            <button className="active:opacity-60" onClick={onOpenChatHistory}>
              <Clock size={22} className="text-gray-900" strokeWidth={1.8} />
            </button>
            <button className="active:opacity-60" onClick={onOpenNewChat}>
              <SquarePen size={22} className="text-gray-900" strokeWidth={1.8} />
            </button>
          </>}
        />
        {/* User query bubble */}
        <div className="flex justify-end px-4 pt-2 pb-4">
          <div className="bg-gray-100 rounded-[26px] px-4 py-2.5 max-w-[80%]">
            <span className="text-[15px]">{currentQuery.charAt(0).toUpperCase() + currentQuery.slice(1)}</span>
          </div>
        </div>

        {loading ? (
          <div className="px-4">
            <div className="flex items-center gap-2 mb-2">
              <img src="/grok-logo.svg" alt="" className="w-5 h-5" style={{ filter: 'brightness(0) opacity(0.5)' }} />
            </div>
            <p className="text-[15px] text-gray-500 mb-4 shimmer-text">Thinking</p>
            <div className="flex justify-center py-12">
              <svg width="32" height="32" viewBox="0 0 32 32">
                {Array.from({ length: 8 }).map((_, i) => (
                  <rect
                    key={i}
                    x="14.5"
                    y="2"
                    width="3"
                    height="8"
                    rx="1.5"
                    fill="#c0c0c0"
                    opacity={1 - i * 0.1}
                    transform={`rotate(${i * 45} 16 16)`}
                    style={{ animation: `ios-fade 0.8s ${i * 0.1}s infinite linear` }}
                  />
                ))}
              </svg>
            </div>
          </div>
        ) : (
          <>
            {/* AI Summary */}
            <div ref={summaryRef} className="px-4 py-4 relative">
              <TextSelectionPopup containerRef={summaryTextRef} wrapperRef={summaryRef} onAskGrok={(text) => { setAskGrokQuote(text); setSearchFocused(false); setTimeout(() => inputRef.current?.focus(), 50) }} />
              {summaryExpanded ? (
                <>
                  <div ref={summaryTextRef} className="text-[15px] text-gray-900 leading-relaxed" style={{ userSelect: 'text', WebkitUserSelect: 'text' }} dangerouslySetInnerHTML={{
                    __html: aiSummary.expandedText
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .split('\n\n').map((para, idx) =>
                        para.startsWith('• ') || para.includes('\n• ')
                          ? para.split('\n').map(line =>
                              line.startsWith('• ')
                                ? `<div style="display:flex;gap:8px;margin-top:6px;margin-left:4px"><span>•</span><span>${line.slice(2)}</span></div>`
                                : `<p style="${idx > 0 ? 'margin-top:12px' : ''}">${line}</p>`
                            ).join('')
                          : `<p style="${idx > 0 ? 'margin-top:12px' : ''}">${para}</p>`
                      ).join('')
                  }} />
                  <div className="flex items-center gap-4 mt-3 text-gray-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5"/><path d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2v-6l-3.4-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.8 1.1z"/></svg>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M4 22H2V11h2"/></svg>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v2a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M20 2h2v11h-2"/></svg>
                  </div>
                  <span
                    className="text-[15px] text-blue-500 cursor-pointer mt-2 inline-block"
                    onClick={() => { setSummaryExpanded(false); summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
                  >Show less</span>
                  <div className="flex items-center mt-2">
                    <img src="/grok-logo.svg" alt="" className="w-4 h-4" style={{ filter: 'brightness(0) opacity(0.4)' }} />
                    <button onClick={() => setSummaryModalOpen(true)} className="ml-auto active:opacity-60">
                      <MoreHorizontal size={16} className="text-gray-300" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {(() => {
                    const src = aiSummary.text
                    let wordCount = 0
                    let result = ''
                    let i = 0
                    while (i < src.length) {
                      if (src.slice(i).startsWith('**')) {
                        const end = src.indexOf('**', i + 2)
                        if (end !== -1) {
                          const inner = src.slice(i + 2, end)
                          const innerWords = inner.split(/\s+/)
                          const visibleWords = innerWords.slice(0, Math.max(0, typedChars - wordCount))
                          if (visibleWords.length > 0) result += `<strong>${visibleWords.join(' ')}</strong>`
                          wordCount += innerWords.length
                          i = end + 2
                          if (wordCount >= typedChars) break
                          continue
                        }
                      }
                      const wsMatch = src.slice(i).match(/^\s+/)
                      if (wsMatch) {
                        result += wsMatch[0]
                        i += wsMatch[0].length
                        continue
                      }
                      const wordMatch = src.slice(i).match(/^\S+/)
                      if (wordMatch) {
                        wordCount++
                        if (wordCount <= typedChars) {
                          result += wordMatch[0]
                        } else {
                          break
                        }
                        i += wordMatch[0].length
                        continue
                      }
                      i++
                    }
                    const showMore = doneTyping ? ' <span class="summary-show-more" style="color:#3b82f6;cursor:pointer">Show more</span>' : ''
                    return (
                      <div ref={!summaryExpanded ? summaryTextRef : undefined} className="text-[15px] text-gray-900 leading-relaxed" style={{ userSelect: 'text', WebkitUserSelect: 'text' }} dangerouslySetInnerHTML={{
                        __html: result + showMore
                      }} onClick={(e) => { if (e.target.classList.contains('summary-show-more')) setSummaryExpanded(true) }} />
                    )
                  })()}
                  <div className={`flex items-center mt-2 transition-opacity duration-300 ${typedChars > 0 || doneTyping ? 'opacity-100' : 'opacity-0'}`}>
                    <img src="/grok-logo.svg" alt="" className="w-4 h-4" style={{ filter: 'brightness(0) opacity(0.4)' }} />
                    <button onClick={() => setSummaryModalOpen(true)} className={`ml-2 active:opacity-60 transition-opacity duration-300 ${doneTyping ? 'opacity-100' : 'opacity-0'}`}>
                      <MoreHorizontal size={16} className="text-gray-300" />
                    </button>
                  </div>
                </>
              )}
              <div className={`flex gap-2 mt-3 overflow-x-auto no-scrollbar -mx-4 px-4 transition-opacity duration-300 ${doneTyping || summaryExpanded ? 'opacity-100' : 'opacity-0'}`}>
                {aiSummary.pills.map((pill) => (
                  <button key={pill} className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-200 bg-[#f0f0f0] text-[13px] font-medium text-gray-700 active:bg-gray-200" onClick={() => handleNewSearch(pill)}>
                    {pill === 'Think harder' && <Lightbulb size={14} strokeWidth={2} />}
                    {pill}
                  </button>
                ))}
              </div>
            </div>

            {/* Result Tabs */}
            <div className="flex border-b border-gray-100 px-2">
              {SEARCH_RESULT_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveResultTab(tab)}
                  className={`flex-1 py-2.5 text-[14px] font-semibold text-center relative ${activeResultTab === tab ? 'text-gray-900' : 'text-gray-400'}`}
                >
                  {tab}
                  {activeResultTab === tab && <div className="absolute bottom-0 left-1/4 right-1/4 h-[3px] bg-blue-500 rounded-full" />}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeResultTab === 'Top' && (
              <>
                {SEARCH_RESULT_TWEETS.map((tweet, i) => (
                  <TweetCard key={i} tweet={tweet} />
                ))}
              </>
            )}

            {activeResultTab === 'Latest' && (
              <>
                {LATEST_TWEETS.map((tweet, i) => (
                  <TweetCard key={i} tweet={tweet} />
                ))}
              </>
            )}

            {activeResultTab === 'People' && (
              <>
                {PEOPLE_RESULTS.map((person, i) => (
                  <div key={i} className="px-4 py-3 border-b border-gray-100">
                    <div className="flex gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[14px] font-bold"
                        style={{ backgroundColor: person.avatar }}
                      >
                        {person.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="text-[15px] font-bold truncate">{person.name}</span>
                              {person.verified === 'gold' && <svg width="16" height="16" viewBox="0 0 24 24" fill="#f7b928"><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81C14.67 2.88 13.43 2 12 2s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81C9.33 21.12 10.57 22 12 22s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91C21.12 14.67 22 13.43 22 12zm-11.07 4.83l-3.43-3.43 1.06-1.06 2.37 2.37 5.7-5.7 1.06 1.06-6.76 6.76z" /></svg>}
                              {person.verified === true && <svg width="16" height="16" viewBox="0 0 24 24" fill="#1d9bf0"><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81C14.67 2.88 13.43 2 12 2s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81C9.33 21.12 10.57 22 12 22s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91C21.12 14.67 22 13.43 22 12zm-11.07 4.83l-3.43-3.43 1.06-1.06 2.37 2.37 5.7-5.7 1.06 1.06-6.76 6.76z" /></svg>}
                            </div>
                            <span className="text-[13px] text-gray-400">{person.handle}</span>
                          </div>
                          <button className="px-5 py-1.5 bg-gray-900 text-white text-[14px] font-bold rounded-full flex-shrink-0 active:bg-gray-700">
                            Follow
                          </button>
                        </div>
                        {person.bio && (
                          <p className="text-[14px] text-gray-900 mt-1.5 leading-snug">{person.bio}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {activeResultTab === 'Videos' && (
              <>
                {VIDEO_TWEETS.map((tweet, i) => (
                  <TweetCard key={i} tweet={tweet} />
                ))}
              </>
            )}

            {activeResultTab === 'Photos' && (
              <>
                {PHOTO_TWEETS.map((tweet, i) => (
                  <TweetCard key={i} tweet={tweet} />
                ))}
              </>
            )}
            <div className="h-32" />
          </>
        )}
      </div>

      {/* Search bar */}
      {searchFocused && !askGrokQuote ? (
        <>
          <div className="absolute top-0 left-0 right-0 bg-white" style={{ zIndex: 16 }}>
            <StatusBar />
            <HeaderBar
              left={
                <button onClick={onOpenProfile} className="active:opacity-60">
                  <img src="/profile.png" alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                </button>
              }
              onModelClick={onToggleModelDropdown}
              currentModel={currentModel}
              modelDropdownOpen={modelDropdownOpen}
              rightButtons={<>
                <button className="active:opacity-60" onClick={onOpenChatHistory}>
                  <Clock size={22} className="text-gray-900" strokeWidth={1.8} />
                </button>
                <button className="active:opacity-60" onClick={onOpenNewChat}>
                  <SquarePen size={22} className="text-gray-900" strokeWidth={1.8} />
                </button>
              </>}
            />
          </div>
          <div className="absolute left-0 right-0 bg-white overflow-y-auto px-4 pt-4 pb-14" style={{ top: 90, zIndex: 15, bottom: `${kbHeight - 2}px` }}>
            {!searchText.trim() && (
              <div className="animate-fade-in-up">
                <h2 className="text-[18px] font-bold mb-3">Recent Searches</h2>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                  {RECENT_PEOPLE.map((person, i) => (
                    <button key={i} className="flex flex-col items-center gap-1.5 flex-shrink-0 w-[60px]">
                      <div
                        className="w-[52px] h-[52px] rounded-full"
                        style={{ backgroundColor: person.color }}
                      />
                      <span className="text-[11px] font-medium text-gray-900 truncate w-full text-center">{person.name}</span>
                      <span className="text-[10px] text-blue-500 truncate w-full text-center -mt-1">{person.handle}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-1">
                  {RECENT_SEARCHES.map((term, i) => (
                    <button
                      key={i}
                      className="flex items-center justify-between w-full py-3 active:bg-gray-50"
                      onClick={() => { handleNewSearch(); setCurrentQuery(term); setSearchText(''); setSearchFocused(false); setLoading(true); setActiveResultTab('Top') }}
                    >
                      <span className="text-[15px] text-gray-900">{term}</span>
                      <ArrowUpRight size={16} className="text-blue-500 flex-shrink-0" strokeWidth={2} />
                    </button>
                  ))}
                </div>
              </div>
            )}
            {searchText.trim() && (() => {
              const suggestions = getSearchSuggestions(searchText)
              if (!suggestions) return null
              return (
                <>
                  {suggestions.completions.map((item, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-3 w-full py-3 active:bg-gray-50"
                      onClick={() => handleNewSearch(item)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                      <span className="text-[15px] text-gray-900 flex-1 text-left">
                        <span className="font-bold">{searchText.trim()}</span>
                        {item.toLowerCase().startsWith(searchText.toLowerCase().trim())
                          ? <span className="text-gray-400">{item.slice(searchText.trim().length)}</span>
                          : <span className="text-gray-400"> {item}</span>
                        }
                      </span>
                    </button>
                  ))}
                </>
              )
            })()}
          </div>
          <div
            className="absolute left-0 right-0 z-20 px-3 pt-2 pb-3 flex items-center gap-2"
            style={{ bottom: `${kbHeight - 2}px`, background: 'white' }}
          >
            <AddButton onClick={onOpenUpload} />
            <div className={`flex-1 min-w-0 flex items-center rounded-full pl-3.5 gap-2 shadow-[0_2px_12px_rgba(0,0,0,0.1)] ${voiceListening ? 'bg-[#d6ecff] pr-1.5 py-1.5' : searchText.trim() ? 'bg-white pr-1.5 py-1' : 'bg-white pr-3.5 py-2'}`}>
              <img src="/grok-search-logo.svg" alt="" className="w-5 h-5 flex-shrink-0" />
              {!voiceListening && (
                <input
                  ref={inputRef}
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && searchText.trim()) handleNewSearch() }}
                  placeholder="Search with Grok"
                  className="text-[15px] text-gray-900 flex-1 bg-transparent outline-none placeholder:text-gray-400"
                />
              )}
              {voiceListening ? (
                <>
                  <span className="text-[15px] text-gray-600 flex-1 shimmer-text">Grok is listening...</span>
                  <button
                    className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0"
                    onClick={() => { setVoiceListening(false); setSearchText('what is openclaw') }}
                  >
                    <div className="w-3 h-3 rounded-sm bg-white" />
                  </button>
                </>
              ) : searchText.trim() ? (
                <button
                  className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0"
                  onClick={handleNewSearch}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
                </button>
              ) : (
                <button onClick={() => setVoiceListening(true)} className="active:opacity-60">
                  <Mic size={18} className="text-gray-400 flex-shrink-0" />
                </button>
              )}
            </div>
            {!voiceListening && (
              <button
                className="text-[13px] text-gray-500 font-medium flex-shrink-0 active:text-gray-700 pl-1 tracking-normal"
                onClick={() => { setSearchFocused(false); setSearchText('') }}
              >
                Cancel
              </button>
            )}
          </div>
          <IOSKeyboard
            isOpen={searchFocused}
            searchText={searchText}
            onHeightChange={setKbHeight}
            onKey={(key) => {
              if (key === 'backspace') setSearchText((t) => t.slice(0, -1))
              else setSearchText((t) => t + key)
            }}
          />
        </>
      ) : (
        <>
          <div
            className={`absolute left-0 right-0 z-20 px-3 pt-8 pb-3 flex items-end gap-2 transition-all duration-300 ease-out ${askGrokQuote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
            style={{ bottom: 64, background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 25%, rgba(255,255,255,1) 45%)' }}
          >
            <AddButton onClick={onOpenUpload} />
            <div className="flex-1 min-w-0 flex flex-col bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.1)] px-3.5 py-2 gap-1.5">
              {askGrokQuote && (
                <div className="inline-flex items-center gap-1 bg-blue-50 rounded-full pl-1.5 pr-1 py-0.5 self-start max-w-full overflow-hidden -ml-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><polyline points="9 14 4 9 9 4" /><path d="M20 20v-7a4 4 0 0 0-4-4H4" /></svg>
                  <span className="text-[12px] text-blue-700 font-medium truncate">{askGrokQuote}</span>
                  <button
                    className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 active:opacity-60"
                    onClick={() => setAskGrokQuote(null)}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && searchText.trim()) handleNewSearch() }}
                  placeholder="Ask about this..."
                  className="text-[15px] text-gray-900 flex-1 bg-transparent outline-none placeholder:text-gray-400"
                  autoFocus
                />
                {searchText.trim() ? (
                  <button
                    className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0"
                    onClick={handleNewSearch}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
                  </button>
                ) : (
                  <Mic size={18} className="text-gray-400 flex-shrink-0" />
                )}
              </div>
            </div>
            <button
              className="text-[13px] text-gray-500 font-medium flex-shrink-0 active:text-gray-700 pl-1 tracking-normal mb-2"
              onClick={() => { setAskGrokQuote(null); setSearchText('') }}
            >
              Cancel
            </button>
          </div>
          <div className={`transition-all duration-300 ease-out ${askGrokQuote ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
            <BottomBarOverlay onPlusClick={onOpenUpload} onInputClick={() => setSearchFocused(true)} onEqClick={onVoiceMode} onMicClick={onMicClick} />
          </div>
        </>
      )}

      {/* Search Summary Modal */}
      <>
        <div className={`absolute inset-0 bg-black/40 z-50 transition-opacity duration-300 ${summaryModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSummaryModalOpen(false)} />
        <div className={`absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-[16px] transition-transform duration-300 ease-out ${summaryModalOpen ? 'translate-y-0' : 'translate-y-full'}`} style={{ maxHeight: '60%' }}>
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-[36px] h-[5px] bg-[#c4c5c7] rounded-full" />
            </div>
            <div className="px-5 pb-6">
              <h3 className="text-[17px] font-bold text-center mb-5">Search Summary</h3>

              <div className="flex items-center gap-3 mb-4">
                <img src="/grok-logo.svg" alt="" className="w-7 h-7 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-[15px] font-semibold">Summarized by Grok</p>
                  <p className="text-[13px] text-gray-400">x.ai/grok</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <button className="flex items-center justify-between w-full py-3 active:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-[13px] font-semibold text-gray-900">1</span>
                    </div>
                    <div className="text-left">
                      <p className="text-[15px] text-gray-900">OpenClaw - GitHub Repository</p>
                      <p className="text-[13px] text-gray-400">github.com</p>
                    </div>
                  </div>
                  <ChevronDown size={18} className="text-gray-300 -rotate-90 flex-shrink-0" />
                </button>
                <button className="flex items-center justify-between w-full py-3 active:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-[13px] font-semibold text-gray-900">2</span>
                    </div>
                    <div className="text-left">
                      <p className="text-[15px] text-gray-900">OpenClaw Documentation & Setup</p>
                      <p className="text-[13px] text-gray-400">docs.openclaw.dev</p>
                    </div>
                  </div>
                  <ChevronDown size={18} className="text-gray-300 -rotate-90 flex-shrink-0" />
                </button>
                <button className="flex items-center justify-between w-full py-3 active:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-[13px] font-semibold text-gray-900">3</span>
                    </div>
                    <div className="text-left">
                      <p className="text-[15px] text-gray-900">OpenClaw: Self-Hosted AI Agents...</p>
                      <p className="text-[13px] text-gray-400">en.wikipedia.org</p>
                    </div>
                  </div>
                  <ChevronDown size={18} className="text-gray-300 -rotate-90 flex-shrink-0" />
                </button>
              </div>

              <div className="flex justify-center gap-8 mt-5 pt-4 border-t border-gray-100">
                <button className="flex flex-col items-center gap-1.5 active:opacity-60" onClick={() => setSummaryModalOpen(false)}>
                  <div className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M4 22H2V11h2"/></svg>
                  </div>
                  <span className="text-[12px] text-gray-600 font-medium">Good Response</span>
                </button>
                <button className="flex flex-col items-center gap-1.5 active:opacity-60" onClick={() => setSummaryModalOpen(false)}>
                  <div className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v2a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M20 2h2v11h-2"/></svg>
                  </div>
                  <span className="text-[12px] text-gray-600 font-medium">Bad Response</span>
                </button>
              </div>
            </div>
          </div>
      </>

      {askGrokQuote && !searchFocused && (
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <BottomNavBar />
        </div>
      )}

      {wipOpen && <WorkInProgressView onGoBack={() => setWipOpen(false)} />}
    </div>
  )
}

function ProfileDrawer({ isOpen, onClose }) {
  const menuItems = [
    { icon: User, label: 'Profile' },
    { icon: Award, label: 'Premium' },
    { icon: MonitorPlay, label: 'Video' },
    { icon: Users, label: 'Communities' },
    { icon: Bookmark, label: 'Bookmarks' },
    { icon: ListTodo, label: 'Lists' },
    { icon: Radio, label: 'Spaces' },
    { icon: PenTool, label: 'Creator Studio' },
  ]
  const bottomItems = [
    { icon: GrokIcon, label: 'Open Grok', isCustom: true },
    { icon: Settings, label: 'Settings and privacy' },
    { icon: HelpCircle, label: 'Help Center' },
  ]

  return (
    <>
      <div
        className={`absolute inset-0 bg-black/40 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`absolute top-0 left-0 bottom-0 w-[300px] bg-white z-50 transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ borderTopLeftRadius: 44, borderBottomLeftRadius: 44 }}
      >
        <div className="pt-14 px-5 pb-4 overflow-y-auto h-full flex flex-col">
          {/* Profile Header */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <img src="/profile.png" alt="Profile" className="w-10 h-10 rounded-full object-cover" />
              <div className="flex gap-1.5">
                <div className="w-7 h-7 rounded-full bg-green-400 flex items-center justify-center text-[11px] font-bold text-white">N</div>
                <div className="w-7 h-7 rounded-full bg-lime-400 flex items-center justify-center text-[13px]">😊</div>
              </div>
              <button className="ml-auto">
                <MoreHorizontal size={20} className="text-gray-600" />
              </button>
            </div>
            <div className="mt-2.5">
              <div className="flex items-center gap-1">
                <span className="text-[16px] font-bold">Michelle Liu</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1d9bf0"><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81C14.67 2.88 13.43 2 12 2s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81C9.33 21.12 10.57 22 12 22s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91C21.12 14.67 22 13.43 22 12zm-11.07 4.83l-3.43-3.43 1.06-1.06 2.37 2.37 5.7-5.7 1.06 1.06-6.76 6.76z" /></svg>
              </div>
              <p className="text-[14px] text-gray-500">@michelletliu</p>
            </div>
            <div className="flex gap-4 mt-2">
              <span className="text-[14px]"><strong>618</strong> <span className="text-gray-500">Following</span></span>
              <span className="text-[14px]"><strong>1,931</strong> <span className="text-gray-500">Followers</span></span>
            </div>
          </div>

          {/* Main Menu */}
          <div className="flex-1">
            {menuItems.map((item) => (
              <button key={item.label} className="flex items-center gap-5 w-full py-3.5 active:bg-gray-50">
                <item.icon size={24} className="text-gray-900" strokeWidth={1.6} />
                <span className="text-[18px] font-bold">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Divider + Bottom Items */}
          <div className="border-t border-gray-100 pt-2 mt-2">
            {bottomItems.map((item) => (
              <button key={item.label} className="flex items-center gap-5 w-full py-3 active:bg-gray-50">
                {item.isCustom ? (
                  <img src="/grok-logo.svg" alt="" className="w-6 h-6" style={{ filter: 'brightness(0)' }} />
                ) : (
                  <item.icon size={24} className="text-gray-900" strokeWidth={1.6} />
                )}
                <span className="text-[15px]">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function WorkInProgressView({ onGoBack }) {
  return (
    <div className="absolute inset-0 bg-white z-30 flex flex-col items-center justify-center" style={{ borderRadius: 44 }}>
      <Wrench size={40} className="text-gray-300 mb-3" strokeWidth={1.5} />
      <p className="text-[17px] font-semibold text-gray-400">work in progress!</p>
      <button
        className="mt-4 text-[15px] text-blue-500 font-medium active:opacity-60"
        onClick={onGoBack}
      >
        go back
      </button>
    </div>
  )
}

export default function App() {
  const [uploadOpen, setUploadOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('search')
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState('expert')
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [chatHistoryOpen, setChatHistoryOpen] = useState(false)
  const [globalTrendingOpen, setGlobalTrendingOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState(null)
  const [kbHeight, setKbHeight] = useState(0)
  const [activeQuickAction, setActiveQuickAction] = useState(null)
  const [editImage, setEditImage] = useState(null)
  const [isMultiLine, setIsMultiLine] = useState(false)
  const [voiceListening, setVoiceListening] = useState(false)
  const [activeNewsItem, setActiveNewsItem] = useState(null)
  const [wipOpen, setWipOpen] = useState(false)
  const fileInputRef = useRef(null)
  const searchInputRef = useRef(null)
  const scrollRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  const currentModel = MODELS.find((m) => m.id === selectedModel)

  const handleNewChat = () => {
    setSearchQuery(null)
    setSearchFocused(false)
    setSearchText('')
    setIsMultiLine(false)
    setActiveQuickAction(null)
    setEditImage(null)
    setGlobalTrendingOpen(false)
    setChatHistoryOpen(false)
    setModelDropdownOpen(false)
    setActiveNewsItem(null)
    setWipOpen(false)
  }

  useEffect(() => {
    if (searchFocused && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchFocused])

  return (
    <div className="relative w-[393px] h-[852px] bg-white rounded-[44px] overflow-hidden shadow-2xl" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,.25), inset 0 0 0 1px rgba(209,213,219,0.6)' }}>
      {/* Status Bar */}
      <div
        className={`relative z-[6] flex items-center justify-between px-8 h-[38px] transition-all duration-200 ${scrollY > 44 ? 'border-b border-gray-100 bg-white' : ''}`}
      >
        <span className="text-[15px] font-semibold">9:41</span>
        <div className="flex items-center gap-1.5">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
            <rect x="0" y="3" width="3" height="9" rx="1" opacity="0.3" />
            <rect x="5" y="2" width="3" height="10" rx="1" opacity="0.5" />
            <rect x="10" y="1" width="3" height="11" rx="1" opacity="0.7" />
            <rect x="15" y="0" width="3" height="12" rx="1" />
          </svg>
          <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
            <path d="M8.5 2.5C10.8 2.5 12.8 3.5 14.2 5.1L15.5 3.8C13.7 1.8 11.2 0.5 8.5 0.5C5.8 0.5 3.3 1.8 1.5 3.8L2.8 5.1C4.2 3.5 6.2 2.5 8.5 2.5ZM8.5 6.5C9.9 6.5 11.1 7.1 12 8L13.3 6.7C12 5.4 10.3 4.5 8.5 4.5C6.7 4.5 5 5.4 3.7 6.7L5 8C5.9 7.1 7.1 6.5 8.5 6.5ZM8.5 10.5C9.1 10.5 9.6 10.2 10 9.8L8.5 8L7 9.8C7.4 10.2 7.9 10.5 8.5 10.5Z" />
          </svg>
          <svg width="27" height="13" viewBox="0 0 27 13" fill="currentColor">
            <rect x="0" y="1" width="22" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35" />
            <rect x="23.5" y="4.5" width="2" height="4" rx="1" opacity="0.4" />
            <rect x="2" y="3" width="18" height="7" rx="1.5" />
          </svg>
        </div>
      </div>

      {/* Scroll fade overlay - only while header is partially visible */}
      {scrollY > 0 && scrollY <= 44 && (
        <div
          className="absolute left-0 right-0 pointer-events-none z-[5]"
          style={{
            top: 38,
            height: 50,
            opacity: scrollY / 44,
            background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
            backdropFilter: `blur(${(scrollY / 44) * 10}px)`,
            WebkitBackdropFilter: `blur(${(scrollY / 44) * 10}px)`,
          }}
        />
      )}

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className={`overflow-y-auto ${searchFocused ? 'flex flex-col' : ''}`}
        style={{ height: searchFocused ? `calc(100% - 38px - ${kbHeight + 56}px)` : 'calc(100% - 38px - 64px)' }}
        onScroll={(e) => setScrollY(e.target.scrollTop)}
      >
        {/* Header */}
        <HeaderBar
          left={
            <button onClick={() => setProfileOpen(true)} className="active:opacity-60">
              <img src="/profile.png" alt="Profile" className="w-8 h-8 rounded-full object-cover" />
            </button>
          }
          onModelClick={() => setModelDropdownOpen(!modelDropdownOpen)}
          currentModel={currentModel}
          modelDropdownOpen={modelDropdownOpen}
          rightButtons={<>
            <button className="active:opacity-60" onClick={() => setChatHistoryOpen(true)}>
              <Clock size={22} className="text-gray-900" strokeWidth={1.8} />
            </button>
            <button className="active:opacity-60" onClick={handleNewChat}>
              <SquarePen size={22} className="text-gray-900" strokeWidth={1.8} />
            </button>
          </>}
        />
        {searchFocused ? (
          <div className={`px-4 pt-2 flex-1 flex flex-col overflow-y-auto justify-start`}>
            {activeQuickAction !== 'create' && !editImage && (searchText.trim() ? (() => {
              const suggestions = getSearchSuggestions(searchText)
              if (!suggestions) return null
              return (
                <>
                  {suggestions.completions.map((item, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-3 w-full py-3 active:bg-gray-50"
                      onClick={() => { setSearchQuery(item); setSearchFocused(false); setSearchText(''); setIsMultiLine(false) }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                      <span className="text-[15px] text-gray-900 flex-1 text-left">
                        <span className="font-bold">{searchText.trim()}</span>
                        {item.toLowerCase().startsWith(searchText.toLowerCase().trim())
                          ? <span className="text-gray-400">{item.slice(searchText.trim().length)}</span>
                          : <span className="text-gray-400"> {item}</span>
                        }
                      </span>
                      <ChevronDown size={16} className="text-gray-300 flex-shrink-0 rotate-[-90deg]" />
                    </button>
                  ))}
                  {suggestions.accounts.length > 0 && (
                    <div className="mt-1 border-t border-gray-100 pt-1">
                      {suggestions.accounts.map((acct, i) => (
                        <button key={i} className="flex items-center gap-3 w-full py-2.5 active:bg-gray-50" onClick={() => setWipOpen(true)}>
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0"
                            style={{ backgroundColor: acct.color }}
                          >
                            {acct.letter}
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="text-[15px] font-bold truncate">{acct.name}</span>
                              {acct.verified && <svg width="16" height="16" viewBox="0 0 24 24" fill="#1d9bf0"><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81C14.67 2.88 13.43 2 12 2s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81C9.33 21.12 10.57 22 12 22s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91C21.12 14.67 22 13.43 22 12zm-11.07 4.83l-3.43-3.43 1.06-1.06 2.37 2.37 5.7-5.7 1.06 1.06-6.76 6.76z" /></svg>}
                            </div>
                            <span className="text-[13px] text-gray-400">{acct.handle}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )
            })() : (
              <div className="animate-fade-in-up flex flex-col flex-1 min-h-0">
                <h2 className="text-[18px] font-bold mb-3 flex-shrink-0">Recent Searches</h2>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 flex-shrink-0">
                  {RECENT_PEOPLE.map((person, i) => (
                    <button key={i} className="flex flex-col items-center gap-1.5 flex-shrink-0 w-[60px]" onClick={() => setWipOpen(true)}>
                      <div
                        className="w-[52px] h-[52px] rounded-full flex-shrink-0"
                        style={{ backgroundColor: person.color }}
                      />
                      <span className="text-[11px] font-medium text-gray-900 truncate w-full text-center">{person.name}</span>
                      <span className="text-[10px] text-blue-500 truncate w-full text-center -mt-1">{person.handle}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-1 flex-1 overflow-y-auto min-h-0">
                  {RECENT_SEARCHES.map((term, i) => (
                    <button
                      key={i}
                      className="flex items-center justify-between w-full py-3 active:bg-gray-50"
                      onClick={() => { setSearchQuery(term); setSearchFocused(false); setSearchText('') }}
                    >
                      <span className="text-[15px] text-gray-900">{term}</span>
                      <ArrowUpRight size={16} className="text-blue-500 flex-shrink-0" strokeWidth={2} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <button className="px-4 pt-2 pb-6 w-full" onClick={() => setGlobalTrendingOpen(true)}>
              <img
                src="/global-trending.png"
                alt="Global Trending"
                className="w-full rounded-2xl"
              />
            </button>

            {/* Today's News */}
            <div className="px-4 mt-1">
              <h2 className="text-[16px] font-extrabold mb-1">Today&apos;s News</h2>
              <div className="divide-y divide-gray-100">
                {NEWS_ITEMS.map((item, i) => (
                  <button
                    key={i}
                    className="py-3.5 w-full text-left active:bg-gray-50"
                    onClick={() => setActiveNewsItem(i)}
                  >
                    <h3 className="text-[15px] font-bold leading-snug">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      {item.emojis && <span className="text-[14px]">{item.emojis}</span>}
                      <div className="flex -space-x-1.5">
                        {Array.from({ length: item.avatarCount }).map((_, j) => (
                          <Avatar key={j} index={i * 2 + j} size={20} className="border-2 border-white" />
                        ))}
                      </div>
                      <span className="text-[13px] text-gray-500">
                        {item.time} · {item.category} · {item.posts}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div className="px-4 mt-6">
              <h2 className="text-[16px] font-extrabold mb-1">Trending</h2>
              {TRENDING_ITEMS.map((item, i) => (
                <button
                  key={i}
                  className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0 w-full text-left active:bg-gray-50"
                  onClick={() => { setSearchQuery(item.title); setSearchFocused(false) }}
                >
                  <div>
                    <h3 className="text-[15px] font-bold">{item.title}</h3>
                    <p className="text-[13px] text-gray-500 mt-0.5">{item.subtitle}</p>
                  </div>
                  <div className="mt-1">
                    <MoreHorizontal size={18} className="text-gray-400" />
                  </div>
                </button>
              ))}
              <div className="h-32" />
            </div>
          </>
        )}
      </div>

      {/* Quick Actions + Search Bar */}
      <div
        className={`absolute left-0 right-0 z-10 flex flex-col transition-all duration-300 ${searchFocused ? '' : 'bottom-[64px] overflow-hidden'}`}
        style={{ background: searchFocused ? 'white' : SEARCH_BAR_GRADIENT, ...(searchFocused ? { bottom: `${kbHeight - 2}px`, paddingBottom: 2 } : {}) }}
      >
        {!activeQuickAction && !editImage && !searchText.trim() && <div className="pt-8 pb-1.5">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pl-4">
            {QUICK_ACTIONS.map((action) => (
              <QuickActionPill
                key={action.label}
                action={action}
                onClick={() => {
                  if (action.icon === 'create') {
                    setActiveQuickAction('create')
                    setSearchFocused(true)
                  } else if (action.icon === 'edit') {
                    fileInputRef.current?.click()
                  } else if (action.icon === 'voice') {
                    setActiveQuickAction('voice')
                    setSearchFocused(false)
                  } else if (action.icon === 'grokipedia') {
                    setActiveQuickAction('grokipedia')
                    setSearchFocused(false)
                  }
                }}
              />
            ))}
            <div className="flex-shrink-0 w-2" />
          </div>
        </div>}

        {searchFocused && editImage && !searchText.trim() && (
          <div className="flex flex-col gap-2 px-4 pb-3 items-start">
            <button className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#f0f0f0] active:bg-gray-200 whitespace-nowrap" onClick={() => setWipOpen(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 flex-shrink-0"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></svg>
              <span className="text-[14px] text-gray-900">Make it holographic</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#f0f0f0] active:bg-gray-200 whitespace-nowrap" onClick={() => setWipOpen(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 flex-shrink-0"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
              <span className="text-[14px] text-gray-900">Reimagine as Junji Ito manga</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#f0f0f0] active:bg-gray-200 whitespace-nowrap" onClick={() => setWipOpen(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 flex-shrink-0"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /></svg>
              <span className="text-[14px] text-gray-900">Van Gogh style painting</span>
            </button>
          </div>
        )}
        {searchFocused && activeQuickAction === 'create' && !searchText.trim() && (
          <div className="flex flex-col gap-2 px-4 pb-3 items-start">
            <button className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#f0f0f0] active:bg-gray-200 whitespace-nowrap" onClick={() => setWipOpen(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 flex-shrink-0"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></svg>
              <span className="text-[14px] text-gray-900">Cyberpunk city sunset</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#f0f0f0] active:bg-gray-200 whitespace-nowrap" onClick={() => setWipOpen(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 flex-shrink-0"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
              <span className="text-[14px] text-gray-900">Cat in a spacesuit, oil painting</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#f0f0f0] active:bg-gray-200 whitespace-nowrap" onClick={() => setWipOpen(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 flex-shrink-0"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /></svg>
              <span className="text-[14px] text-gray-900">Minimalist coffee brand logo</span>
            </button>
          </div>
        )}
        {searchFocused ? (
          <div className="px-3 pt-2 pb-3 flex items-end gap-2">
            <div className="mb-1"><AddButton onClick={() => setUploadOpen(true)} /></div>
            <div className={`flex-1 flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.1)] ${activeQuickAction === 'create' ? 'rounded-t-[22px] rounded-b-[26px] bg-[#ececec]' : editImage ? 'rounded-t-[22px] rounded-b-[16px] bg-white' : isMultiLine ? 'rounded-[20px] bg-white' : 'rounded-full bg-white'}`}>
              {activeQuickAction === 'create' && (
                <div className="flex items-center justify-between px-4 py-1.5">
                  <span className="text-[13px] text-[#65747d]">Create Image</span>
                  <button onClick={() => setActiveQuickAction(null)} className="active:opacity-60">
                    <X size={15} className="text-[#65747d]" />
                  </button>
                </div>
              )}
              {editImage && (
                <>
                  <div className="px-4 pt-3 pb-2">
                    <div className="relative inline-block">
                      <img src={editImage} alt="" className="w-20 h-24 rounded-xl object-cover" />
                      <button
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-600/80 rounded-full flex items-center justify-center"
                        onClick={() => setEditImage(null)}
                      >
                        <X size={12} className="text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="h-px bg-gray-200 mx-0" />
                </>
              )}
              {voiceListening ? (
                <div className="flex items-center gap-2 pl-3.5 pr-1.5 py-1.5 bg-[#d6ecff] rounded-full">
                  <img src="/grok-search-logo.svg" alt="" className="w-5 h-5 flex-shrink-0 -mt-px" />
                  <span className="text-[15px] text-gray-600 flex-1 shimmer-text">Grok is listening...</span>
                  <button
                    className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0"
                    onClick={() => { setVoiceListening(false); setSearchText('what is openclaw') }}
                  >
                    <div className="w-3 h-3 rounded-sm bg-white" />
                  </button>
                </div>
              ) : (
                <div className={`flex pl-3.5 gap-2 ${activeQuickAction === 'create' ? 'bg-[#f9f9f9] rounded-full' : ''} ${isMultiLine ? 'items-end pr-1.5 py-1' : `items-center ${searchText.trim() ? 'pr-1.5 py-1' : 'pr-3.5 py-2'}`}`}>
                  <div className={`flex ${isMultiLine ? 'items-start' : 'items-center'} gap-2 flex-1 min-w-0`}>
                    <img src="/grok-search-logo.svg" alt="" className={`w-5 h-5 flex-shrink-0 ${isMultiLine ? 'mt-1' : '-mt-px'}`} />
                    <textarea
                      ref={searchInputRef}
                      value={searchText}
                      onChange={(e) => {
                        setSearchText(e.target.value)
                        e.target.style.height = 'auto'
                        e.target.style.height = e.target.scrollHeight + 'px'
                        setIsMultiLine(e.target.scrollHeight > 28)
                      }}
                      onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey && searchText.trim()) { e.preventDefault(); setSearchQuery(searchText.trim()); setSearchFocused(false); setSearchText(''); setIsMultiLine(false) } }}
                      placeholder="Ask anything"
                      rows={1}
                      className="text-[15px] text-gray-900 flex-1 bg-transparent outline-none placeholder:text-gray-400 resize-none leading-snug"
                      style={{ maxHeight: 120 }}
                    />
                  </div>
                  {searchText.trim() ? (
                    <button
                      className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0"
                      onClick={() => { setSearchQuery(searchText.trim()); setSearchFocused(false); setSearchText(''); setIsMultiLine(false) }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
                    </button>
                  ) : (
                    <button onClick={() => setVoiceListening(true)} className="active:opacity-60">
                      <Mic size={18} className="text-gray-400 flex-shrink-0" />
                    </button>
                  )}
                </div>
              )}
            </div>
            {!voiceListening && (
              <button
                className="text-[13px] text-gray-500 font-medium flex-shrink-0 active:text-gray-700 pl-1 tracking-normal mb-2"
                onClick={() => { setSearchFocused(false); setSearchText(''); setIsMultiLine(false); setActiveQuickAction(null); setEditImage(null) }}
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <SearchInputBar
            onPlusClick={() => setUploadOpen(true)}
            onInputClick={() => setSearchFocused(true)}
            onEqClick={() => setActiveQuickAction('voice')}
            onMicClick={() => { setSearchFocused(true); setVoiceListening(true) }}
          />
        )}
      </div>

      {/* Bottom Tab Bar */}
      <div className={`absolute bottom-0 left-0 right-0 transition-opacity duration-200 ${searchFocused ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <BottomNavBar />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            const url = URL.createObjectURL(file)
            setEditImage(url)
            setSearchFocused(true)
          }
          e.target.value = ''
        }}
      />

      {/* News Detail */}
      {activeNewsItem !== null && (
        <NewsDetailView
          newsItem={NEWS_ITEMS[activeNewsItem]}
          newsDetail={NEWS_DETAILS[activeNewsItem]}
          onBack={() => setActiveNewsItem(null)}
          onOpenUpload={() => setUploadOpen(true)}
          onVoiceMode={() => { setActiveNewsItem(null); setActiveQuickAction('voice') }}
          onMicClick={() => { setSearchFocused(true); setVoiceListening(true) }}
        />
      )}

      {/* Global Trending */}
      {globalTrendingOpen && <GlobalTrendingView onBack={() => setGlobalTrendingOpen(false)} onOpenUpload={() => setUploadOpen(true)} onVoiceMode={() => { setGlobalTrendingOpen(false); setActiveQuickAction('voice') }} onMicClick={() => { setSearchFocused(true); setVoiceListening(true) }} />}

      {/* Grokipedia */}
      {activeQuickAction === 'grokipedia' && (
        <GrokipediaView onBack={() => setActiveQuickAction(null)} />
      )}

      {/* Voice Mode */}
      {activeQuickAction === 'voice' && (
        <VoiceModeView
          onBack={() => setActiveQuickAction(null)}
          onOpenChatHistory={() => setChatHistoryOpen(true)}
          onOpenNewChat={handleNewChat}
          currentModel={currentModel}
          onToggleModelDropdown={() => setModelDropdownOpen(!modelDropdownOpen)}
          modelDropdownOpen={modelDropdownOpen}
        />
      )}

      {/* Work In Progress */}
      {wipOpen && <WorkInProgressView onGoBack={handleNewChat} />}

      {/* Search Results */}
      {searchQuery && (
        <SearchResultsView
          query={searchQuery}
          onBack={() => setSearchQuery(null)}
          onOpenProfile={() => setProfileOpen(true)}
          onOpenChatHistory={() => setChatHistoryOpen(true)}
          onOpenNewChat={handleNewChat}
          currentModel={currentModel}
          onToggleModelDropdown={() => setModelDropdownOpen(!modelDropdownOpen)}
          modelDropdownOpen={modelDropdownOpen}
          onOpenUpload={() => setUploadOpen(true)}
          onVoiceMode={() => { setSearchQuery(null); setActiveQuickAction('voice') }}
          onMicClick={() => { setSearchFocused(true); setVoiceListening(true) }}
        />
      )}

      <ModelDropdown
        isOpen={modelDropdownOpen}
        selectedModel={selectedModel}
        onSelect={setSelectedModel}
        onClose={() => setModelDropdownOpen(false)}
      />

      {/* Upload Bottom Sheet */}
      <UploadSheet
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onCreateImage={() => { setActiveQuickAction('create'); setSearchFocused(true) }}
        onEditImage={() => fileInputRef.current?.click()}
      />

      {/* Profile Drawer */}
      <ProfileDrawer isOpen={profileOpen} onClose={() => setProfileOpen(false)} />

      {/* Chat History */}
      {chatHistoryOpen && <ChatHistoryView onBack={() => setChatHistoryOpen(false)} onNewChat={handleNewChat} />}


      {/* iOS Keyboard */}
      <IOSKeyboard
        isOpen={searchFocused}
        searchText={searchText}
        onHeightChange={setKbHeight}
        onKey={(key) => {
          if (key === 'backspace') setSearchText((t) => t.slice(0, -1))
          else setSearchText((t) => t + key)
        }}
      />
    </div>
  )
}
