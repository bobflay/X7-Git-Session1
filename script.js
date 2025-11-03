// Google Login Handler
function handleGoogleLogin() {
    // Simulate Google OAuth login
    // In a real implementation, this would use Google's OAuth 2.0 API
    alert('Google Login functionality would be integrated here.\n\nIn a production environment, this would:\n1. Redirect to Google OAuth consent screen\n2. Request user permissions\n3. Retrieve user profile information\n4. Auto-fill the form with Google account data');

    // For demo purposes, show the edit form
    document.getElementById('edit-form').style.display = 'block';
    document.getElementById('edit-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Student information management
function updateDisplayFromEdit() {
    const name = document.getElementById('student-name-edit').value.trim();
    const university = document.getElementById('student-university-edit').value.trim();
    const linkedin = document.getElementById('student-linkedin-edit').value.trim();
    
    document.getElementById('student-name-display').textContent = name || '[Your Name Here]';
    document.getElementById('student-university-display').textContent = university || '[Your University Here]';
    // Update the link element's href and text
    const linkedinDisplay = document.getElementById('student-linkedin-display');
    const linkElement = linkedinDisplay.querySelector('a');
    
    if (linkElement && linkedin) {
        linkElement.href = linkedin;
        linkElement.textContent = 'View my LinkedIn Account';
    } else if (!linkElement && linkedin) {
        linkedinDisplay.innerHTML = `<a href="${linkedin}">View my LinkedIn Account</a>`;
    } else {
        linkedinDisplay.textContent = '[Your LinkedIn Profile]';
    }
}

function updateEditFromDisplay() {
    const nameDisplay = document.getElementById('student-name-display').textContent;
    const universityDisplay = document.getElementById('student-university-display').textContent;
    // Get the actual URL from the link if it exists
    const linkedinLinkElement = document.getElementById('student-linkedin-display').querySelector('a');
    const linkedinURL = linkedinLinkElement ? linkedinLinkElement.href : '';
    
    document.getElementById('student-name-edit').value = nameDisplay.includes('[') ? '' : nameDisplay;
    document.getElementById('student-university-edit').value = universityDisplay.includes('[') ? '' : universityDisplay;
    document.getElementById('student-linkedin-edit').value = linkedinURL;
}

function editStudentInfo() {
    updateEditFromDisplay();
    document.getElementById('edit-form').style.display = 'block';
    document.getElementById('edit-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function cancelEdit() {
    document.getElementById('edit-form').style.display = 'none';
}

function proceedToLearning() {
    const name = document.getElementById('student-name-display').textContent;
    const university = document.getElementById('student-university-display').textContent;
    
    if (name.includes('[') || university.includes('[')) {
        alert('Please fill in your name and university information first by clicking "Edit Information".');
        editStudentInfo();
        return;
    }
    
    // Show welcome message or proceed to next slide
    const welcomeDiv = document.getElementById('welcome-message');
    if (welcomeDiv) {
        welcomeDiv.style.display = 'block';
        welcomeDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Scroll to next slide after a brief delay
    setTimeout(() => {
        const slides = document.querySelectorAll('.slide');
        if (slides.length > 1) {
            slides[1].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 3000);
}

function saveStudentInfo() {
    const name = document.getElementById('student-name-edit').value.trim();
    const university = document.getElementById('student-university-edit').value.trim();
    const linkedin = document.getElementById('student-linkedin-edit').value.trim();
    
    if (!name) {
        alert('Please enter your name before saving.');
        document.getElementById('student-name-edit').focus();
        return;
    }
    
    if (!university) {
        alert('Please enter your university before saving.');
        document.getElementById('student-university-edit').focus();
        return;
    }
    
    // Update display
    updateDisplayFromEdit();
    
    // Save to localStorage for persistence
    const studentInfo = {
        name: name,
        university: university,
        linkedin: linkedin,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('gitCourseStudentInfo', JSON.stringify(studentInfo));
    
    // Hide edit form
    document.getElementById('edit-form').style.display = 'none';
    
    // Show welcome message
    const welcomeDiv = document.getElementById('welcome-message');
    const messageP = document.getElementById('personalized-message');
    
    let message = `Hello ${name}! Welcome to the Git Fundamentals course.`;
    if (university) {
        message += ` It's great to have a student from ${university} with us.`;
    }
    if (linkedin) {
        message += ` Feel free to connect with fellow learners on LinkedIn!`;
    }
    message += ` Your information has been saved. Ready to start learning Git?`;
    
    messageP.textContent = message;
    welcomeDiv.style.display = 'block';
    
    // Scroll to welcome message
    welcomeDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    console.log('Student info saved:', studentInfo);
}

// Load student info if it exists
function loadStudentInfo() {
    const saved = localStorage.getItem('gitCourseStudentInfo');
    if (saved) {
        try {
            const studentInfo = JSON.parse(saved);
            document.getElementById('student-name-display').textContent = studentInfo.name || '[Your Name Here]';
            document.getElementById('student-university-display').textContent = studentInfo.university || '[Your University Here]';
            
            // Handle LinkedIn link
            const linkedinDisplay = document.getElementById('student-linkedin-display');
            if (studentInfo.linkedin) {
                 linkedinDisplay.innerHTML = `<a href="${studentInfo.linkedin}">View my LinkedIn Account</a>`;
            } else {
                linkedinDisplay.textContent = '[Your LinkedIn Profile]';
            }
            
            if (studentInfo.name && studentInfo.university) {
                // Show welcome message automatically
                const welcomeDiv = document.getElementById('welcome-message');
                const messageP = document.getElementById('personalized-message');
                
                if (welcomeDiv && messageP) {
                    let message = `Welcome back, ${studentInfo.name}!`;
                    if (studentInfo.university) {
                        message += ` Ready to continue your Git learning journey?`;
                    }
                    
                    messageP.textContent = message;
                    welcomeDiv.style.display = 'block';
                }
            }
        } catch (e) {
            console.log('Error loading student info:', e);
        }
    }
}

// ⬅️ الدوال الجديدة للتبديل بين الوضع الليلي والنهاري (الكبسة)

// دالة التبديل بين الوضع الليلي والنهاري
function toggleTheme() {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-theme');
    const toggleIcon = document.getElementById('toggle-icon');
    const toggleText = document.getElementById('toggle-text');
    
    if (currentTheme === 'dark') {
        // التحويل إلى الوضع النهاري
        htmlElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if (toggleIcon) toggleIcon.textContent = '🌙';
        if (toggleText) toggleText.textContent = 'Night Mode';
    } else {
        // التحويل إلى الوضع الليلي
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (toggleIcon) toggleIcon.textContent = '☀️';
        if (toggleText) toggleText.textContent = 'Day Mode';
    }
}

// دالة تطبيق الوضع المحفوظ عند تحميل الصفحة
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const htmlElement = document.documentElement;
    const toggleIcon = document.getElementById('toggle-icon');
    const toggleText = document.getElementById('toggle-text');

    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        if (toggleIcon) toggleIcon.textContent = '☀️';
        if (toggleText) toggleText.textContent = 'Day Mode'
    } else {
        // الوضع الافتراضي هو النهاري
        htmlElement.removeAttribute('data-theme');
        if (toggleIcon) toggleIcon.textContent = '🌙';
        if (toggleText) toggleText.textContent = 'Night Mode';
    }
}


// Scrollable presentation with custom terminal
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing presentation');
    
    loadTheme();
    
    // Load any saved student information
    loadStudentInfo();
    
    // Make all slides visible
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.style.display = 'block';
    });
    
    // Hide navigation and counter since we're using scroll
    const navigation = document.querySelector('.navigation');
    const counter = document.querySelector('.slide-counter');
    if (navigation) navigation.style.display = 'none';
    if (counter) counter.style.display = 'none';

    // Terminal Initialization 
    const terminalContainers = document.querySelectorAll('.terminal');
    terminalContainers.forEach((terminal, index) => {
        initializeTabs(terminal, index);
        initializeClickableCommands(terminal);
    });
    
    // Initialize custom interactive terminal
    document.querySelectorAll('.custom-terminal').forEach(terminal => {
        initializeCustomTerminal(terminal);
    });
    
    // Initialize quizzes
    initializeQuizzes();
});

// Logic for custom interactive terminal
function initializeCustomTerminal(terminalElement) {
    const outputArea = terminalElement.querySelector('.terminal-output-area');
    const inputElement = terminalElement.querySelector('.terminal-input');
    const history = [];
    let historyIndex = -1;
    let currentCommand = '';

    const terminalId = terminalElement.dataset.terminalId; // If you have multiple custom terminals
    
    // Define a map of available commands and their outputs for this demo
    const availableCommands = {
        'git init': '✅ Initialized empty Git repository in /path/to/project/.git/',
        'git status': 'On branch master\nNo commits yet\n\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n\tindex.html\n\tstyles.css\n\tscript.js\n\nnothing added to commit but untracked files present (use "git add" to track)',
        'git add .': '✅ Added all files to staging area.',
        'git commit -m "Initial commit"': '✅ [master (root-commit) 56789ab] Initial commit\n 3 files changed, 500 insertions(+)\n create mode 100644 index.html',
        'git log --oneline': '56789ab Initial commit',
        'git branch login-feature': '✅ Created new branch: login-feature',
        'git checkout login-feature': 'Switched to new branch \'login-feature\'',
        'git status -v': 'fatal: unknown argument: -v\n\nRun \'git status --help\' for usage.',
        'help': 'Available commands: git init, git status, git add ., git commit -m "Initial commit", git branch login-feature, git checkout login-feature, git log --oneline',
        'clear': 'clear-output' // Special keyword to clear the screen
    };

    function processCommand(command) {
        const outputLine = document.createElement('div');
        outputLine.className = 'terminal-output-line';
        outputLine.innerHTML = `<span class="terminal-command-line">$ ${command}</span>`;
        outputArea.appendChild(outputLine);

        let result = '';
        command = command.trim().toLowerCase();
        
        if (command === 'clear') {
            outputArea.innerHTML = '';
            return;
        }

        if (availableCommands[command]) {
            result = availableCommands[command];
        } else if (command.startsWith('git')) {
            result = `<span class="terminal-error">❌ fatal: command not recognized: ${command}</span>\nTry 'help' for available commands.`;
        } else if (command === '') {
            result = '';
        } else {
             result = `<span class="terminal-error">❌ Command not found: ${command}</span>\nTry 'help' for available commands.`;
        }

        if (result && result !== 'clear-output') {
            const resultLine = document.createElement('pre');
            resultLine.className = 'terminal-result';
            resultLine.innerHTML = result;
            outputArea.appendChild(resultLine);
        }

        // Scroll to bottom
        outputArea.scrollTop = outputArea.scrollHeight;
    }

    inputElement.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = inputElement.value.trim();
            if (command) {
                // Add to history
                history.unshift(command);
                historyIndex = -1; // Reset history index
                processCommand(command);
            }
            inputElement.value = '';
            currentCommand = '';
            event.preventDefault(); // Prevent form submission if input is in a form
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (history.length > 0) {
                if (historyIndex === -1) {
                    currentCommand = inputElement.value; // Save current input
                }
                historyIndex = Math.min(historyIndex + 1, history.length - 1);
                inputElement.value = history[historyIndex];
            }
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                inputElement.value = history[historyIndex];
            } else if (historyIndex === 0) {
                historyIndex = -1;
                inputElement.value = currentCommand;
            }
        }
    });
    
    // Initial focus
    terminalElement.addEventListener('click', () => inputElement.focus());
}

// Logic for simple clickable commands terminal (Slide 6/7)
function initializeClickableCommands(terminalElement) {
    const commands = terminalElement.querySelectorAll('.terminal-command');
    const outputArea = terminalElement.querySelector('.terminal-body');

    commands.forEach(commandElement => {
        commandElement.addEventListener('click', () => {
            const command = commandElement.textContent.trim();
            const output = commandElement.dataset.output;

            // Display command
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line';
            commandLine.innerHTML = `<span class="terminal-prompt">$</span><span class="terminal-command-line">${command}</span>`;
            outputArea.appendChild(commandLine);

            // Display output
            const outputLine = document.createElement('div');
            outputLine.className = 'terminal-output';
            outputLine.textContent = output;
            outputArea.appendChild(outputLine);

            // Scroll to bottom
            outputArea.scrollTop = outputArea.scrollHeight;
        });
    });
}


// Terminal Tabs Logic
function initializeTabs(terminalElement, terminalIndex) {
    const tabs = terminalElement.querySelectorAll('.terminal-tab');
    
    // Set a default active tab if none is active (usually the first one)
    if (tabs.length > 0 && !terminalElement.querySelector('.terminal-tab.active')) {
         tabs[0].classList.add('active');
         const defaultTabName = tabs[0].dataset.tab;
         const defaultContent = terminalElement.querySelector(`.terminal-content[data-content="${defaultTabName}"]`);
         if (defaultContent) defaultContent.classList.add('active');
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;

            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Hide all tab contents
            terminalElement.querySelectorAll('.terminal-content').forEach(content => {
                content.classList.remove('active');
            });

            // Add active class to the clicked tab
            this.classList.add('active');
            
            // Show the corresponding content
            const contentToShow = terminalElement.querySelector(`.terminal-content[data-content="${tabName}"]`);
            if (contentToShow) {
                contentToShow.classList.add('active');
            }
        });
    });
}

// Quiz Logic
const quizQuestions = [
    {
        question: "1. What is the primary purpose of 'git commit'?",
        options: ["To create a new branch", "To save changes to the local repository history", "To upload changes to GitHub", "To check the status of the files"],
        answerIndex: 1,
        explanation: "The `git commit` command saves your staged changes permanently to the repository's history on your local machine."
    },
    {
        question: "2. Which command is used to move changes from the staging area to the repository history?",
        options: ["git checkout", "git push", "git commit", "git merge"],
        answerIndex: 2,
        explanation: "`git commit` records the changes you've staged (`git add`) into the repository. It creates a snapshot of the changes."
    },
    {
        question: "3. What does 'git push' command do?",
        options: ["Downloads changes from a remote repository", "Uploads changes from the local repository to a remote repository (like GitHub)", "Switches to a different branch", "Undoes the last commit"],
        answerIndex: 1,
        explanation: "The `git push` command is used to upload your local commits to a remote repository, sharing them with the rest of the team."
    }
];

let currentQuestionIndex = 0;
let score = 0;
let quizAttempts = 0;

function initializeQuizzes() {
    const quizContainers = document.querySelectorAll('.quiz-container');
    quizContainers.forEach(container => {
        container.innerHTML = `
            <h3 class="quiz-title">Test Your Knowledge</h3>
            <div id="quiz-question-${container.id}" class="quiz-question"></div>
            <div id="quiz-options-${container.id}" class="quiz-options"></div>
            <button id="quiz-submit-${container.id}" class="nav-btn" style="margin-top: 20px;">Submit Answer</button>
            <div id="quiz-feedback-${container.id}" class="quiz-feedback" style="margin-top: 15px;"></div>
            <button id="quiz-next-${container.id}" class="nav-btn" style="display: none; margin-top: 10px;">Next Question →</button>
            <div id="quiz-results-${container.id}" class="quiz-results" style="margin-top: 25px;"></div>
        `;
        
        loadQuestion(container.id, 0);

        document.getElementById(`quiz-submit-${container.id}`).addEventListener('click', () => checkAnswer(container.id));
        document.getElementById(`quiz-next-${container.id}`).addEventListener('click', () => nextQuestion(container.id));
    });
}

function loadQuestion(containerId, index) {
    currentQuestionIndex = index;
    const questionData = quizQuestions[index];
    const questionDiv = document.getElementById(`quiz-question-${containerId}`);
    const optionsDiv = document.getElementById(`quiz-options-${containerId}`);
    const submitBtn = document.getElementById(`quiz-submit-${containerId}`);
    const nextBtn = document.getElementById(`quiz-next-${containerId}`);
    const feedbackDiv = document.getElementById(`quiz-feedback-${containerId}`);

    questionDiv.textContent = questionData.question;
    optionsDiv.innerHTML = '';
    feedbackDiv.textContent = '';
    submitBtn.style.display = 'block';
    nextBtn.style.display = 'none';

    questionData.options.forEach((option, i) => {
        const label = document.createElement('label');
        label.className = 'quiz-option-label';
        label.innerHTML = `
            <input type="radio" name="quiz-option" value="${i}" id="option-${containerId}-${i}">
            <span>${option}</span>
        `;
        optionsDiv.appendChild(label);
    });
}

function checkAnswer(containerId) {
    const selectedOption = document.querySelector(`input[name="quiz-option"]:checked`);
    const feedbackDiv = document.getElementById(`quiz-feedback-${containerId}`);
    const submitBtn = document.getElementById(`quiz-submit-${containerId}`);
    const nextBtn = document.getElementById(`quiz-next-${containerId}`);
    const questionData = quizQuestions[currentQuestionIndex];
    const optionsDiv = document.getElementById(`quiz-options-${containerId}`);

    if (!selectedOption) {
        feedbackDiv.textContent = "Please select an answer.";
        feedbackDiv.style.color = '#dc2626';
        return;
    }

    const selectedIndex = parseInt(selectedOption.value);
    
    // Disable all options after submission
    optionsDiv.querySelectorAll('input[type="radio"]').forEach(radio => radio.disabled = true);

    if (selectedIndex === questionData.answerIndex) {
        score++;
        feedbackDiv.innerHTML = `✅ **Correct!** ${questionData.explanation}`;
        feedbackDiv.style.color = '#10b981';
        optionsDiv.querySelector(`#option-${containerId}-${selectedIndex}`).parentNode.style.border = '2px solid #10b981';
    } else {
        feedbackDiv.innerHTML = `❌ **Incorrect.** The correct answer was: **${questionData.options[questionData.answerIndex]}**. ${questionData.explanation}`;
        feedbackDiv.style.color = '#dc2626';
        // Highlight incorrect choice red and correct choice green
        optionsDiv.querySelector(`#option-${containerId}-${selectedIndex}`).parentNode.style.border = '2px solid #dc2626';
        optionsDiv.querySelector(`#option-${containerId}-${questionData.answerIndex}`).parentNode.style.border = '2px solid #10b981';
    }

    submitBtn.style.display = 'none';
    nextBtn.style.display = 'block';
}

function nextQuestion(containerId) {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion(containerId, currentQuestionIndex);
    } else {
        showResults(containerId);
    }
}

function showResults(containerId) {
    quizAttempts++;
    const resultsDiv = document.getElementById(`quiz-results-${containerId}`);
    const questionDiv = document.getElementById(`quiz-question-${containerId}`);
    const optionsDiv = document.getElementById(`quiz-options-${containerId}`);
    const nextBtn = document.getElementById(`quiz-next-${containerId}`);
    const feedbackDiv = document.getElementById(`quiz-feedback-${containerId}`);

    questionDiv.style.display = 'none';
    optionsDiv.style.display = 'none';
    nextBtn.style.display = 'none';
    feedbackDiv.style.display = 'none';

    resultsDiv.innerHTML = `
        <h3 style="color: #2563eb;">Quiz Complete!</h3>
        <p style="font-size: 1.5em; font-weight: bold;">Your final score: ${score} out of ${quizQuestions.length}</p>
        <button onclick="resetQuiz('${containerId}')" class="nav-btn">Try Again</button>
    `;
    
    // Reset score for next attempt
    score = 0;
}

function resetQuiz(containerId) {
    const resultsDiv = document.getElementById(`quiz-results-${containerId}`);
    const questionDiv = document.getElementById(`quiz-question-${containerId}`);
    const optionsDiv = document.getElementById(`quiz-options-${containerId}`);
    const feedbackDiv = document.getElementById(`quiz-feedback-${containerId}`);
    const submitBtn = document.getElementById(`quiz-submit-${containerId}`);

    questionDiv.style.display = 'block';
    optionsDiv.style.display = 'block';
    feedbackDiv.style.display = 'block';
    submitBtn.style.display = 'block';
    resultsDiv.innerHTML = '';
    
    loadQuestion(containerId, 0);
}

// Function to copy the quiz code (if needed)
function copyQuizCode() {
    const codeText = quizQuestions.map(q => JSON.stringify(q, null, 4)).join(',\n')
    
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = `const quizQuestions = [\n${codeText}\n];\n\n${initializeQuizzes.toString()}\n\n${loadQuestion.toString()}\n\n${checkAnswer.toString()}\n\n${nextQuestion.toString()}\n\n${showResults.toString()}\n\n${resetQuiz.toString()}`;
    document.body.appendChild(textarea);
    textarea.select();

    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
         alert('✅ Quiz code copied to clipboard!\n\nPaste it into your presentation and customize:\n- Questions and answers\n- Update totalQuestions variable\n- Change colors and styling');
    } catch (err) {
        // Fallback for modern browsers
        navigator.clipboard.writeText(codeText).then(() => {
            alert('✅ Quiz code copied to clipboard!\n\nPaste it into your presentation and customize:\n- Questions and answers\n- Update totalQuestions variable\n- Change colors and styling');
        }).catch(() => {
            alert('❌ Failed to copy. Please try selecting the code manually.');
        });
    }

    document.body.removeChild(textarea);
}

function switchQuizTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.quiz-tab-content').forEach(tab => {
        tab.style.display = 'none';
    });

    // Remove active class from all tabs
    const parentTerminal = document.querySelector('.terminal');
    if (parentTerminal) {
        parentTerminal.querySelectorAll('.terminal-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Add active class to clicked tab
        const clickedTab = parentTerminal.querySelector(`[data-tab="${tabName}"]`);
        if (clickedTab) {
            clickedTab.classList.add('active');
        }
    }

    // Show selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }
}