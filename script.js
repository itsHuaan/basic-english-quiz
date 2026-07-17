// Dữ liệu 30 câu hỏi
import { questionsData } from './quiz.js';

// Thuật toán Fisher-Yates để đảo ngẫu nhiên mảng
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const quizContainer = document.getElementById('quiz-container');

// Biến cờ cho Test Mode
let isTestMode = false;

// Hàm hiển thị Custom Modal thay thế alert/prompt
function showCustomModal({ title, message, icon = '🔔', isPrompt = false, onConfirm = null }) {
    const modal = document.getElementById('generic-modal');
    const titleEl = document.getElementById('generic-modal-title');
    const messageEl = document.getElementById('generic-modal-message');
    const iconEl = document.getElementById('generic-modal-icon');
    const inputContainer = document.getElementById('generic-modal-input-container');
    const inputEl = document.getElementById('generic-modal-input');
    const cancelBtn = document.getElementById('generic-modal-cancel');
    const okBtn = document.getElementById('generic-modal-ok');

    titleEl.textContent = title;
    messageEl.textContent = message;
    iconEl.textContent = icon;

    if (isPrompt) {
        inputContainer.style.display = 'block';
        inputEl.value = '';
        cancelBtn.style.display = 'block';
    } else {
        inputContainer.style.display = 'none';
        cancelBtn.style.display = 'none';
    }

    modal.classList.add('show');

    // Remove old listeners
    const newOkBtn = okBtn.cloneNode(true);
    okBtn.parentNode.replaceChild(newOkBtn, okBtn);
    const newCancelBtn = cancelBtn.cloneNode(true);
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

    if (isPrompt) {
        setTimeout(() => inputEl.focus(), 100);
    }

    newOkBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        if (onConfirm) onConfirm(isPrompt ? inputEl.value.trim() : true);
    });

    newCancelBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        if (onConfirm && isPrompt) onConfirm(null);
    });

    inputEl.onkeydown = function (e) {
        if (e.key === 'Enter') {
            newOkBtn.click();
        }
    };
}

// Hàm tạo giao diện trắc nghiệm
function buildQuiz() {
    // Đảo ngẫu nhiên câu hỏi
    shuffleArray(questionsData);

    let quizHTML = '';
    questionsData.forEach((question, qIndex) => {
        let optionsHTML = '';
        question.o.forEach((opt, oIndex) => {
            optionsHTML += `
                    <li>
                        <label>
                            <input type="radio" name="q${qIndex}" value="${oIndex}">
                            <span class="custom-radio"></span>
                            <span class="option-text">${opt}</span>
                        </label>
                    </li>
                `;
        });

        quizHTML += `
    <div class="question-block" id="block-${qIndex}" style="animation-delay: ${qIndex * 0.05}s">
        <div class="question-title"><span class="q-number">Câu ${qIndex + 1}</span><span class="q-text">${question.q}</span></div>
        <ul class="options">
            ${optionsHTML}
        </ul>
        <div class="explanation" id="exp-${qIndex}">
            <div class="exp-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
            <div class="exp-content">
                <strong>Giải thích:</strong> ${question.exp}
            </div>
        </div>
    </div>
    `;
    });
    quizContainer.innerHTML = quizHTML;
}

// Hàm chấm điểm
// Hàm chấm điểm
async function checkAnswers() {
    const userNameInput = document.getElementById('username');
    const userName = userNameInput ? userNameInput.value.trim() : '';
    const submitBtn = document.getElementById('submit-btn');

    if (!userName && !isTestMode) {
        showCustomModal({ title: 'Thiếu thông tin', message: 'Vui lòng nhập tên của bạn trước khi nộp bài!', icon: '⚠️' });
        if (userNameInput) userNameInput.focus();
        return;
    }

    const finalUserName = userName || (isTestMode ? "Tester_" + Math.floor(Math.random() * 1000) : "");

    let correctCount = 0;
    let incorrectCount = 0;
    let skippedQuestions = [];

    if (!isTestMode) {
        // Lần 1: Kiểm tra các câu chưa làm
        questionsData.forEach((question, qIndex) => {
            const selectedOption = document.querySelector(`input[name="q${qIndex}"]:checked`);
            if (!selectedOption) {
                skippedQuestions.push(qIndex);
            } else {
                const selectedValue = parseInt(selectedOption.value);
                if (selectedValue === question.a) {
                    correctCount++;
                } else {
                    incorrectCount++;
                }
            }
        });

        if (skippedQuestions.length === 1) {
            const missingIndex = skippedQuestions[0];
            const block = document.getElementById(`block-${missingIndex}`);
            if (block) {
                block.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const originalShadow = block.style.boxShadow;
                block.style.boxShadow = "0 0 0 4px var(--wrong-border)";
                setTimeout(() => {
                    block.style.boxShadow = originalShadow;
                }, 2000);
            }
            return;
        } else if (skippedQuestions.length > 1) {
            const modal = document.getElementById('unanswered-modal');
            const list = document.getElementById('unanswered-list');
            if (modal && list) {
                list.innerHTML = skippedQuestions.map(idx => `<span class="unanswered-badge">Câu ${idx + 1}</span>`).join('');
                modal.classList.add('show');
            }
            return;
        }
    } else {
        // TRONG TEST MODE: Random điểm
        correctCount = Math.floor(Math.random() * (questionsData.length + 1));
        incorrectCount = questionsData.length - correctCount;
    }

    // Đã làm hết -> Bật trạng thái loading
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `
        <div class="spinner"></div>
        <span>Đang lưu kết quả...</span>
    `;
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    const now = new Date().toISOString();
    const payload = {
        name: finalUserName,
        correctAnswers: correctCount,
        incorrectAnswers: incorrectCount,
        submitDate: now,
        editDate: now
    };

    try {
        const response = await fetch('https://websocket-demo-7pab.onrender.com/api/scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Lỗi từ server');
        }

        // --- NẾU THÀNH CÔNG, HIỆN ĐÁP ÁN VÀ KẾT QUẢ ---
        if (!isTestMode) {
            questionsData.forEach((question, qIndex) => {
                const selectedOption = document.querySelector(`input[name="q${qIndex}"]:checked`);
                const optionsList = document.querySelectorAll(`input[name="q${qIndex}"]`);
                const explanationBlock = document.getElementById(`exp-${qIndex}`);

                optionsList.forEach(input => {
                    input.closest('li').className = '';
                    input.disabled = true; // Khóa chọn đáp án sau khi nộp
                });

                const correctInput = document.querySelector(`input[name="q${qIndex}"][value="${question.a}"]`);
                if (correctInput) {
                    correctInput.closest('li').classList.add('correct-answer');
                }

                if (selectedOption) {
                    const selectedValue = parseInt(selectedOption.value);
                    if (selectedValue !== question.a) {
                        selectedOption.closest('li').classList.add('wrong-answer');
                    }
                }

                if (explanationBlock) {
                    explanationBlock.style.display = 'flex';
                    setTimeout(() => {
                        explanationBlock.classList.add('show');
                    }, 10);
                }
            });
        }

        let score = correctCount;
        const resultBanner = document.getElementById('result-banner');
        if (resultBanner) {
            resultBanner.style.display = 'block';
            resultBanner.innerHTML = `
                <div class="score-display">${score} <span class="score-total">/ ${questionsData.length}</span></div>
                <div class="score-stats">
                    <div class="stat-item correct">
                        <span class="stat-value">${correctCount}</span>
                        <span class="stat-label">Đúng</span>
                    </div>
                    <div class="stat-item incorrect">
                        <span class="stat-value">${incorrectCount}</span>
                        <span class="stat-label">Sai</span>
                    </div>
                    <div class="stat-item skipped">
                        <span class="stat-value">0</span>
                        <span class="stat-label">Bỏ qua</span>
                    </div>
                </div>
            `;

            if (isTestMode) {
                resultBanner.innerHTML += `<div style="color:var(--accent); margin-top:1rem; font-weight:600;">(Chế độ Test Mode - Điểm ngẫu nhiên)</div>`;
            }

            resultBanner.className = '';
            if (score >= Math.floor(questionsData.length * 0.8)) {
                resultBanner.classList.add('score-good');
            } else if (score >= Math.floor(questionsData.length * 0.5)) {
                resultBanner.classList.add('score-average');
            } else {
                resultBanner.classList.add('score-poor');
            }
        }

        submitBtn.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
        console.error('Lỗi mạng khi gọi API backend:', error);
        showCustomModal({ title: 'Lỗi kết nối', message: 'Có lỗi xảy ra khi lưu kết quả lên server. Vui lòng thử lại!', icon: '❌' });
        // Khôi phục nút bấm nếu lỗi
        submitBtn.innerHTML = originalBtnHTML;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
}

buildQuiz();

const submitBtn = document.getElementById('submit-btn');
if (submitBtn) {
    submitBtn.addEventListener('click', checkAnswers);
}

const closeModalBtn = document.getElementById('close-modal-btn');
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        const modal = document.getElementById('unanswered-modal');
        if (modal) {
            modal.classList.remove('show');
        }
    });
}

// Lắng nghe phím tắt bí mật bật Test Mode: Ctrl + Shift + X
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'x') {
        e.preventDefault();

        if (isTestMode) {
            isTestMode = false;
            showCustomModal({ title: 'Test Mode', message: 'Đã TẮT chế độ Test Mode.', icon: '🔧' });
            return;
        }

        showCustomModal({
            title: 'Bảo mật',
            message: 'Nhập mã truy cập Test Mode:',
            icon: '🔒',
            isPrompt: true,
            onConfirm: (pass) => {
                if (pass === "19092001") {
                    isTestMode = true;
                    showCustomModal({ title: 'Thành công', message: 'Đã BẬT chế độ Test Mode! Bây giờ bạn có thể nộp bài ngay lập tức mà không cần làm, kết quả sẽ là ngẫu nhiên.', icon: '✅' });
                } else if (pass !== null) {
                    showCustomModal({ title: 'Truy cập bị từ chối', message: 'Mã truy cập sai!', icon: '❌' });
                }
            }
        });
    }
});