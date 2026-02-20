// ================================================
// SCIENTIST TECHNOLOGIES — CLIENT ENQUIRY CHATBOT
// ================================================

// Chatbot Q&A Database
const chatbotData = {
    mainQuestions: [
        {
            id: 'services',
            question: 'What services do you provide?',
            answer: 'We offer AI Products (Urban AI), AI & Data Staffing, and Consulting services.',
            followUps: ['industries', 'custom-ai']
        },
        {
            id: 'urban-ai',
            question: 'What is Urban AI?',
            answer: 'Urban AI is a smart system that uses traffic cameras to automatically watch and analyze how cars and people move. It spots "near-miss" accidents and dangerous patterns in real-time so cities can fix roads before a crash happens. It basically replaces manual traffic monitoring with clever data to make streets much safer and less chaotic.',
            followUps: ['demo']
        },
        {
            id: 'ai-developers',
            question: 'Do you provide AI developers on contract?',
            answer: 'Yes, we provide skilled AI and Data Engineers based on your project requirements.',
            followUps: ['deployment-time']
        },
        {
            id: 'custom-ai',
            question: 'Do you provide custom AI solutions?',
            answer: 'Yes, we design and develop custom AI models based on your business challenges.',
            followUps: ['project-start']
        },
        {
            id: 'data-security',
            question: 'How do you ensure data security?',
            answer: 'We follow strict data protection policies and secure development practices.',
            followUps: ['partner']
        },
        {
            id: 'partner',
            question: 'How can we partner with you?',
            answer: 'You can contact us via our website at <a href="mailto:contact@scientisttechnologies.uk">contact@scientisttechnologies.uk</a>, and our team will schedule a consultation call.',
            followUps: []
        }
    ],
    followUpQuestions: {
        'industries': {
            question: 'Which industries do you serve?',
            answer: 'Retail, Mobility, Smart Cities, and enterprise AI solutions etc.',
            followUps: ['custom-ai', 'partner']
        },
        'demo': {
            question: 'Can I request a demo?',
            answer: 'Yes, we can schedule a live demo based on your business needs.',
            followUps: ['partner']
        },
        'deployment-time': {
            question: 'How quickly can resources be deployed?',
            answer: 'Depending on availability, within 1–3 weeks.',
            followUps: ['partner']
        },
        'project-start': {
            question: 'How do you start a project?',
            answer: 'We begin with a consultation call to understand your problem and suggest a solution roadmap.',
            followUps: ['partner']
        }
    },
    closingMessages: [
        'Would you like to speak to our team?',
        'Would you like to schedule a demo?',
        'Please share your email and requirement at <a href="mailto:contact@scientisttechnologies.uk">contact@scientisttechnologies.uk</a>'
    ]
};

class Chatbot {
    constructor() {
        this.isExpanded = false;
        this.messageCount = 0;
        this.conversationHistory = [];
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.attachEventListeners();
        this.checkContactPage();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <!-- Chatbot Minimized Button -->
            <div class="chatbot-minimized" id="chatbotMinimized">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </div>

            <!-- Chatbot Expanded Window -->
            <div class="chatbot-expanded" id="chatbotExpanded">
                <div class="chatbot-header">
                    <div class="chatbot-header-content">
                        <div class="chatbot-avatar">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                <line x1="15" y1="9" x2="15.01" y2="9"></line>
                            </svg>
                        </div>
                        <div>
                            <h3 class="chatbot-title">Scientist AI Assistant</h3>
                            <p class="chatbot-status">Online</p>
                        </div>
                    </div>
                    <button class="chatbot-minimize-btn" id="chatbotMinimizeBtn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>
                <div class="chatbot-messages" id="chatbotMessages">
                    <!-- Messages will be added here -->
                </div>
                <div class="chatbot-input-area">
                    <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Type your question...">
                    <button class="chatbot-send-btn" id="chatbotSendBtn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        const minimizedBtn = document.getElementById('chatbotMinimized');
        const minimizeBtn = document.getElementById('chatbotMinimizeBtn');
        const sendBtn = document.getElementById('chatbotSendBtn');
        const input = document.getElementById('chatbotInput');

        minimizedBtn.addEventListener('click', () => this.expand());
        minimizeBtn.addEventListener('click', () => this.minimize());
        sendBtn.addEventListener('click', () => this.handleSend());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSend();
        });

        // Removed auto-minimize on outside click - only manual minimize button works
    }

    checkContactPage() {
        // Auto-expand on contact page only
        if (window.location.pathname.includes('contact.html')) {
            setTimeout(() => this.expand(), 500);
        } else {
            // Hide chatbot completely on non-contact pages
            document.getElementById('chatbotMinimized').style.display = 'none';
            document.getElementById('chatbotExpanded').style.display = 'none';
        }
    }

    expand() {
        this.isExpanded = true;
        document.getElementById('chatbotMinimized').classList.add('hidden');
        document.getElementById('chatbotExpanded').classList.add('active');
        
        // Show welcome message if first time
        if (this.messageCount === 0) {
            this.showWelcomeMessage();
        }
    }

    minimize() {
        this.isExpanded = false;
        document.getElementById('chatbotExpanded').classList.remove('active');
        document.getElementById('chatbotMinimized').classList.remove('hidden');
    }

    showWelcomeMessage() {
        const welcomeMsg = {
            type: 'bot',
            text: 'Hello! 👋 I\'m here to help you learn more about Scientist Technologies. How can I assist you today?'
        };
        this.addMessage(welcomeMsg);
        this.showQuickQuestions(chatbotData.mainQuestions.map(q => q.id));
    }

    showQuickQuestions(questionIds) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const quickQuestionsHTML = `
            <div class="chatbot-quick-questions">
                ${questionIds.map(id => {
                    const question = this.getQuestionById(id);
                    return question ? `<button class="chatbot-quick-btn" data-id="${id}">${question.question}</button>` : '';
                }).join('')}
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', quickQuestionsHTML);
        
        // Attach click handlers
        messagesContainer.querySelectorAll('.chatbot-quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const questionId = btn.getAttribute('data-id');
                this.handleQuickQuestion(questionId);
            });
        });
        
        this.scrollToBottom();
    }

    getQuestionById(id) {
        const mainQ = chatbotData.mainQuestions.find(q => q.id === id);
        if (mainQ) return mainQ;
        return chatbotData.followUpQuestions[id];
    }

    handleQuickQuestion(questionId) {
        const questionData = this.getQuestionById(questionId);
        if (!questionData) return;

        // Remove quick question buttons
        const quickQuestions = document.querySelector('.chatbot-quick-questions');
        if (quickQuestions) quickQuestions.remove();

        // Add user message
        this.addMessage({ type: 'user', text: questionData.question });

        // Add bot response after delay
        setTimeout(() => {
            this.addMessage({ type: 'bot', text: questionData.answer });
            this.messageCount++;

            // Show follow-ups or closing message
            if (questionData.followUps && questionData.followUps.length > 0) {
                setTimeout(() => this.showQuickQuestions(questionData.followUps), 500);
            } else if (this.messageCount >= 2) {
                setTimeout(() => this.showClosingMessage(), 500);
            }
        }, 800);
    }

    handleSend() {
        const input = document.getElementById('chatbotInput');
        const userMessage = input.value.trim();
        if (!userMessage) return;

        // Add user message
        this.addMessage({ type: 'user', text: userMessage });
        input.value = '';

        // Simple keyword matching for custom questions
        setTimeout(() => {
            const response = this.matchQuestion(userMessage);
            this.addMessage({ type: 'bot', text: response.answer });
            this.messageCount++;

            if (response.followUps && response.followUps.length > 0) {
                setTimeout(() => this.showQuickQuestions(response.followUps), 500);
            } else if (this.messageCount >= 2) {
                setTimeout(() => this.showClosingMessage(), 500);
            }
        }, 800);
    }

    matchQuestion(userInput) {
        const input = userInput.toLowerCase();
        
        // Check main questions
        for (const q of chatbotData.mainQuestions) {
            if (input.includes(q.id.replace('-', ' ')) || 
                q.question.toLowerCase().includes(input) ||
                input.includes(q.question.toLowerCase().split(' ')[0])) {
                return q;
            }
        }

        // Check follow-up questions
        for (const key in chatbotData.followUpQuestions) {
            const q = chatbotData.followUpQuestions[key];
            if (input.includes(key.replace('-', ' ')) || 
                q.question.toLowerCase().includes(input)) {
                return q;
            }
        }

        // Fallback response
        return {
            answer: 'Thank you for your question! For detailed information, please contact us at <a href="mailto:contact@scientisttechnologies.uk">contact@scientisttechnologies.uk</a> or explore our <a href="services.html">Services</a> page.',
            followUps: ['partner']
        };
    }

    showClosingMessage() {
        const randomMessage = chatbotData.closingMessages[Math.floor(Math.random() * chatbotData.closingMessages.length)];
        this.addMessage({ type: 'bot', text: randomMessage });
    }

    addMessage(message) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageHTML = `
            <div class="chatbot-message ${message.type}">
                ${message.type === 'bot' ? `
                    <div class="chatbot-message-avatar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                            <line x1="9" y1="9" x2="9.01" y2="9"></line>
                            <line x1="15" y1="9" x2="15.01" y2="9"></line>
                        </svg>
                    </div>
                ` : ''}
                <div class="chatbot-message-content">${message.text}</div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbotMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
