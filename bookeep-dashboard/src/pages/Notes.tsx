import { useState, useMemo } from 'react';
import { Card, CardContent, Badge, Button, Icon, Input } from '../components/UI';
import { 
  MessageSquare, 
  Search, 
  Filter,
  Plus,
  Hash,
  Users,
  BookOpen,
  TrendingUp,
  Paperclip,
  Smile,
  MoreHorizontal,
  Reply,
  Star,
  Send,
  AtSign
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  online: boolean;
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
}

interface Reaction {
  emoji: string;
  users: string[];
  count: number;
}

interface Message {
  id: string;
  content: string;
  author: User;
  timestamp: Date;
  type: 'message' | 'update' | 'document' | 'announcement';
  threadId?: string;
  parentId?: string;
  attachments?: Attachment[];
  reactions?: Reaction[];
  mentions?: string[];
  tags?: string[];
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  threadCount?: number;
  lastReply?: Date;
}

const Notes = () => {
  const [activeView, setActiveView] = useState<'all' | 'messages' | 'knowledge' | 'updates'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');

  // Sample team members
  const teamMembers: User[] = [
    {
      id: 'sarah-j',
      name: 'Sarah Johnson',
      avatar: 'SJ',
      role: 'Project Lead',
      online: true
    },
    {
      id: 'mike-c',
      name: 'Mike Chen',
      avatar: 'MC',
      role: 'Senior Developer',
      online: true
    },
    {
      id: 'emily-r',
      name: 'Emily Rodriguez',
      avatar: 'ER',
      role: 'DevOps Engineer',
      online: false
    },
    {
      id: 'david-p',
      name: 'David Park',
      avatar: 'DP',
      role: 'Client Success',
      online: true
    },
    {
      id: 'anna-w',
      name: 'Anna Williams',
      avatar: 'AW',
      role: 'UX Designer',
      online: true
    },
    {
      id: 'james-l',
      name: 'James Liu',
      avatar: 'JL',
      role: 'Marketing Lead',
      online: false
    }
  ];

  // Current user (you)
  const currentUser: User = {
    id: 'current-user',
    name: 'You',
    avatar: 'YU',
    role: 'Team Member',
    online: true
  };

  // Sample messages and conversations
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '🎉 Great news! TechCorp CRM integration is now live in production. Initial feedback from the client has been overwhelmingly positive. The automated lead scoring is working perfectly and they\'ve already seen a 40% improvement in their conversion rates.',
      author: teamMembers[0], // Sarah
      timestamp: new Date('2024-03-09T09:15:00'),
      type: 'announcement',
      threadCount: 8,
      lastReply: new Date('2024-03-09T11:30:00'),
      reactions: [
        { emoji: '🎉', users: ['mike-c', 'emily-r', 'david-p'], count: 3 },
        { emoji: '👏', users: ['anna-w', 'james-l'], count: 2 },
        { emoji: '🚀', users: ['mike-c'], count: 1 }
      ],
      tags: ['client-success', 'techcorp', 'milestone']
    },
    {
      id: '2',
      content: 'Hey team, I\'m seeing some intermittent issues with the RetailMax inventory sync. It seems to be timing out on larger datasets. @mike-c could you take a look at the batch processing logic?',
      author: teamMembers[2], // Emily
      timestamp: new Date('2024-03-09T10:45:00'),
      type: 'message',
      mentions: ['mike-c'],
      threadCount: 12,
      lastReply: new Date('2024-03-09T14:22:00'),
      tags: ['technical', 'retailmax', 'urgent'],
      priority: 'high'
    },
    {
      id: '3',
      content: 'Updated our client onboarding documentation with the new automation setup process. This should help streamline future implementations and reduce setup time by ~50%. Link: https://docs.internal/onboarding-v2',
      author: teamMembers[3], // David
      timestamp: new Date('2024-03-09T14:20:00'),
      type: 'document',
      threadCount: 3,
      lastReply: new Date('2024-03-09T15:10:00'),
      reactions: [
        { emoji: '📚', users: ['sarah-j', 'anna-w'], count: 2 },
        { emoji: '✨', users: ['emily-r'], count: 1 }
      ],
      tags: ['documentation', 'process', 'onboarding']
    },
    {
      id: '4',
      content: 'Daily standup summary 📋\n\n**Yesterday:**\n- Completed StartupCo email automation testing\n- Fixed critical bug in LogisticsCorp system\n- Client call with InvestBank went well\n\n**Today:**\n- Deploy RetailMax v2.1 updates\n- Begin InvestBank compliance documentation\n- Team planning session at 3pm',
      author: teamMembers[0], // Sarah
      timestamp: new Date('2024-03-09T08:30:00'),
      type: 'update',
      threadCount: 5,
      lastReply: new Date('2024-03-09T09:45:00'),
      reactions: [
        { emoji: '👍', users: ['mike-c', 'david-p', 'emily-r'], count: 3 }
      ],
      tags: ['standup', 'daily', 'planning']
    },
    {
      id: '5',
      content: 'Just had a breakthrough with the new ML-powered lead scoring algorithm! 🧠 Early tests show 85% accuracy vs 72% with our previous rule-based system. This could be a game-changer for our enterprise clients.',
      author: teamMembers[1], // Mike
      timestamp: new Date('2024-03-08T16:45:00'),
      type: 'message',
      threadCount: 15,
      lastReply: new Date('2024-03-09T12:15:00'),
      reactions: [
        { emoji: '🔥', users: ['sarah-j', 'emily-r', 'david-p', 'anna-w'], count: 4 },
        { emoji: '🧠', users: ['james-l'], count: 1 },
        { emoji: '🚀', users: ['sarah-j', 'david-p'], count: 2 }
      ],
      tags: ['machine-learning', 'innovation', 'lead-scoring']
    },
    {
      id: '6',
      content: 'Client feedback compilation for Q1:\n\n📈 **Satisfaction scores:**\n- TechCorp: 4.9/5 ("Exceeded expectations")\n- RetailMax: 4.8/5 ("Game-changing automation")\n- InvestBank: 4.6/5 ("Professional and reliable")\n\n🎯 **Common praise:** Speed of delivery, technical expertise, ongoing support\n⚠️ **Areas for improvement:** Initial setup complexity, documentation clarity',
      author: teamMembers[3], // David
      timestamp: new Date('2024-03-08T11:20:00'),
      type: 'update',
      threadCount: 7,
      lastReply: new Date('2024-03-08T17:30:00'),
      reactions: [
        { emoji: '📊', users: ['sarah-j', 'anna-w'], count: 2 },
        { emoji: '💪', users: ['mike-c', 'emily-r'], count: 2 }
      ],
      tags: ['client-feedback', 'quarterly-review', 'satisfaction']
    },
    {
      id: '7',
      content: 'New design system components are ready for the client dashboard! ✨ Implemented dark mode, improved accessibility, and added micro-interactions. The new onboarding flow is 60% more intuitive based on user testing.',
      author: teamMembers[4], // Anna
      timestamp: new Date('2024-03-08T13:40:00'),
      type: 'update',
      threadCount: 4,
      lastReply: new Date('2024-03-08T16:20:00'),
      reactions: [
        { emoji: '🎨', users: ['sarah-j', 'david-p'], count: 2 },
        { emoji: '✨', users: ['mike-c', 'james-l'], count: 2 }
      ],
      tags: ['design', 'ui-ux', 'accessibility']
    },
    {
      id: '8',
      content: 'Quick win: Automated our internal deployment process! 🚀 What used to take 45 minutes now takes 8 minutes. Zero-downtime deployments across all environments. Team productivity boost estimated at 15+ hours per week.',
      author: teamMembers[2], // Emily
      timestamp: new Date('2024-03-07T15:15:00'),
      type: 'announcement',
      threadCount: 6,
      lastReply: new Date('2024-03-08T09:10:00'),
      reactions: [
        { emoji: '🚀', users: ['sarah-j', 'mike-c', 'anna-w'], count: 3 },
        { emoji: '⚡', users: ['david-p', 'james-l'], count: 2 }
      ],
      tags: ['devops', 'automation', 'productivity']
    }
  ]);

  // Filter messages based on active view and search
  const filteredMessages = useMemo(() => {
    let filtered = messages;

    // Filter by view type
    if (activeView !== 'all') {
      switch (activeView) {
        case 'messages':
          filtered = filtered.filter(m => m.type === 'message');
          break;
        case 'knowledge':
          filtered = filtered.filter(m => m.type === 'document');
          break;
        case 'updates':
          filtered = filtered.filter(m => ['update', 'announcement'].includes(m.type));
          break;
      }
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(message => 
        message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (message.tags && message.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    }

    // Sort by timestamp (most recent first)
    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [messages, activeView, searchQuery]);

  const getMessageTypeIcon = (type: Message['type']) => {
    switch (type) {
      case 'message': return <Icon icon={MessageSquare} size="sm" className="text-blue-500" />;
      case 'update': return <Icon icon={TrendingUp} size="sm" className="text-green-500" />;
      case 'document': return <Icon icon={BookOpen} size="sm" className="text-purple-500" />;
      case 'announcement': return <Icon icon={Star} size="sm" className="text-yellow-500" />;
    }
  };

  const getMessageTypeLabel = (type: Message['type']) => {
    switch (type) {
      case 'message': return 'Message';
      case 'update': return 'Update';
      case 'document': return 'Document';
      case 'announcement': return 'Announcement';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: newMessage.trim(),
      author: currentUser,
      timestamp: new Date(),
      type: 'message',
      reactions: [],
      mentions: [],
      tags: [],
      priority: 'normal'
    };
    
    setMessages(prevMessages => [newMsg, ...prevMessages]);
    setNewMessage('');
  };

  const viewTabs = [
    { key: 'all', label: 'All', icon: Hash },
    { key: 'messages', label: 'Messages', icon: MessageSquare },
    { key: 'knowledge', label: 'Knowledge', icon: BookOpen },
    { key: 'updates', label: 'Updates', icon: TrendingUp }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Notes & Communication</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Team discussions, knowledge sharing, and project updates
          </p>
        </div>
        <Button variant="primary">
          <Icon icon={Plus} size="sm" className="mr-2" />
          New Post
        </Button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        {/* View Tabs */}
        <div className="flex items-center gap-1">
          {viewTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveView(tab.key as any)}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                activeView === tab.key
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Icon icon={tab.icon} size="sm" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Icon icon={Search} size="sm" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <Button variant="ghost" size="sm">
            <Icon icon={Filter} size="sm" />
          </Button>
        </div>
      </div>

      {/* Message Feed */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredMessages.map((message) => (
            <div 
              key={message.id} 
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150 group"
            >
              {/* Message Header */}
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white ${
                    message.author.online 
                      ? 'bg-gradient-to-br from-primary-500 to-primary-600' 
                      : 'bg-gradient-to-br from-gray-400 to-gray-500'
                  }`}>
                    {message.author.avatar}
                  </div>
                  {message.author.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full ring-2 ring-white dark:ring-gray-800"></div>
                  )}
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  {/* Author and Metadata */}
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{message.author.name}</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{message.author.role}</span>
                    <div className="flex items-center space-x-1">
                      {getMessageTypeIcon(message.type)}
                      <Badge variant="default" className="text-xs">
                        {getMessageTypeLabel(message.type)}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{formatTimestamp(message.timestamp)}</span>
                    {message.priority === 'high' && (
                      <Badge variant="error" className="text-xs">Urgent</Badge>
                    )}
                  </div>

                  {/* Message Text */}
                  <div className="prose prose-sm dark:prose-invert max-w-none mb-3">
                    <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>

                  {/* Tags */}
                  {message.tags && message.tags.length > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                      <Icon icon={Hash} size="xs" className="text-gray-400" />
                      <div className="flex gap-1 flex-wrap">
                        {message.tags.map((tag) => (
                          <Badge key={tag} variant="default" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reactions and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Reactions */}
                      {message.reactions && message.reactions.length > 0 && (
                        <div className="flex items-center space-x-2">
                          {message.reactions.map((reaction, index) => (
                            <button
                              key={index}
                              className="flex items-center space-x-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                              <span>{reaction.emoji}</span>
                              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                {reaction.count}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Thread Info */}
                      {message.threadCount && message.threadCount > 0 && (
                        <button 
                          onClick={() => setSelectedThread(message.id)}
                          className="flex items-center space-x-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                        >
                          <Icon icon={MessageSquare} size="xs" />
                          <span>{message.threadCount} replies</span>
                          {message.lastReply && (
                            <span className="text-gray-500 dark:text-gray-400">
                              • Last reply {formatTimestamp(message.lastReply)}
                            </span>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      <Button variant="ghost" size="sm" className="p-2">
                        <Icon icon={Smile} size="sm" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Icon icon={Reply} size="sm" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Icon icon={Star} size="sm" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Icon icon={MoreHorizontal} size="sm" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Composer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-end space-x-3">
            {/* User Avatar */}
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-sm font-medium text-white">
              YU
            </div>

            {/* Message Input */}
            <div className="flex-1">
              <div className="relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Share an update, ask a question, or start a discussion..."
                  rows={1}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  style={{ minHeight: '48px' }}
                />
                <div className="absolute right-3 bottom-3 flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="p-1">
                    <Icon icon={Paperclip} size="sm" className="text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1">
                    <Icon icon={Smile} size="sm" className="text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1">
                    <Icon icon={AtSign} size="sm" className="text-gray-400" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>Use @ to mention team members</span>
                </div>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="sm"
                >
                  <Icon icon={Send} size="sm" className="mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Icon icon={MessageSquare} size="lg" className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredMessages.filter(m => m.type === 'message').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Messages Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Icon icon={Users} size="lg" className="text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {teamMembers.filter(m => m.online).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Team Online</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Icon icon={TrendingUp} size="lg" className="text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredMessages.filter(m => ['update', 'announcement'].includes(m.type)).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Updates Shared</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Notes;