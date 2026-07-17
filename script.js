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
function checkAnswers() {
    let correctCount = 0;
    let incorrectCount = 0;
    let skippedCount = 0;

    questionsData.forEach((question, qIndex) => {
        const selectedOption = document.querySelector(`input[name="q${qIndex}"]:checked`);
        const optionsList = document.querySelectorAll(`input[name="q${qIndex}"]`);
        const explanationBlock = document.getElementById(`exp-${qIndex}`);

        // Xóa class cũ nếu nhấn nộp lại
        optionsList.forEach(input => {
            input.closest('li').className = '';
        });

        // Tô màu đáp án đúng
        const correctInput = document.querySelector(`input[name="q${qIndex}"][value="${question.a}"]`);
        if (correctInput) {
            correctInput.closest('li').classList.add('correct-answer');
        }

        if (selectedOption) {
            const selectedValue = parseInt(selectedOption.value);
            if (selectedValue === question.a) {
                correctCount++;
            } else {
                incorrectCount++;
                selectedOption.closest('li').classList.add('wrong-answer');
            }
        } else {
            skippedCount++;
        }

        // Hiện giải thích
        explanationBlock.style.display = 'flex';
        // Add a small delay for smooth transition
        setTimeout(() => {
            explanationBlock.classList.add('show');
        }, 10);
    });

    let score = correctCount;

    // Hiển thị kết quả
    const resultBanner = document.getElementById('result-banner');
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
                <span class="stat-value">${skippedCount}</span>
                <span class="stat-label">Bỏ qua</span>
            </div>
        </div>
    `;

    resultBanner.className = ''; // reset
    if (score >= Math.floor(questionsData.length * 0.8)) {
        resultBanner.classList.add('score-good');
    } else if (score >= Math.floor(questionsData.length * 0.5)) {
        resultBanner.classList.add('score-average');
    } else {
        resultBanner.classList.add('score-poor');
    }

    // Ẩn nút nộp bài tránh nhấn nhiều lần, hoặc để người dùng xem lại
    document.getElementById('submit-btn').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Khởi tạo trắc nghiệm khi tải trang
buildQuiz();

// Gắn sự kiện cho nút nộp bài
document.getElementById('submit-btn').addEventListener('click', checkAnswers);