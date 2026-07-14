// Dữ liệu 30 câu hỏi
const questionsData = [
    // Danh từ
    { q: "Trong câu 'The students are reading books in the library', từ nào sau đây là danh từ số ít?", o: ["students", "reading", "books", "library"], a: 3, exp: "library là danh từ số ít, các danh từ còn lại là số nhiều hoặc động từ." },
    { q: "Hình thức số nhiều của từ 'child' là gì?", o: ["childs", "children", "childrens", "childes"], a: 1, exp: "children là danh từ số nhiều bất quy tắc của child." },
    { q: "Danh từ nào sau đây là danh từ không đếm được (Uncountable noun)?", o: ["Water", "Bottle", "Apple", "Chair"], a: 0, exp: "Water (Nước) là chất lỏng nên không đếm được." },
    { q: "Chọn danh từ riêng (Proper noun) trong câu: 'Paris is a beautiful city.'", o: ["Paris", "Beautiful", "City", "Is"], a: 0, exp: "Paris là tên riêng của một thành phố cụ thể." },
    { q: "Hình thức số nhiều của từ 'city' là gì?", o: ["citys", "cities", "cityes", "cityies"], a: 1, exp: "Tận cùng bằng 'y' sau một phụ âm, đổi 'y' thành 'i' rồi thêm 'es'." },
    { q: "Danh từ nào là danh từ trừu tượng (Abstract noun) trong số các từ dưới đây?", o: ["Flower", "Happiness", "Table", "Dog"], a: 1, exp: "Happiness (Sự hạnh phúc) chỉ cảm xúc, trạng thái không thể cầm nắm được." },
    { q: "Chọn từ thích hợp: 'I need some ______ to finish my project.'", o: ["advices", "advice", "an advice", "adviceses"], a: 1, exp: "Advice là danh từ không đếm được, không thêm 's'." },
    { q: "Hình thức số nhiều của 'knife' là gì?", o: ["knifes", "knifves", "knives", "knifees"], a: 2, exp: "Danh từ tận cùng là 'fe', đổi thành 'v' rồi thêm 'es'." },
    { q: "'A ______ of birds is flying in the sky.' - Chọn danh từ tập hợp.", o: ["pack", "flock", "team", "swarm"], a: 1, exp: "A flock of birds nghĩa là một đàn chim." },
    { q: "Danh từ nào sau đây là danh từ ghép (Compound noun)?", o: ["Notebook", "Paper", "Pen", "Pencil"], a: 0, exp: "Notebook được kết hợp từ 'note' và 'book'." },
    { q: "Chọn sở hữu cách đúng: 'The ______ toys are on the floor.' (Đồ chơi của các cậu bé).", o: ["boy's", "boys's", "boys'", "boys"], a: 2, exp: "Với danh từ số nhiều kết thúc bằng 's', sở hữu cách chỉ cần thêm dấu phẩy ở cuối." },
    { q: "Từ 'Information' thuộc loại danh từ nào?", o: ["Danh từ đếm được số ít", "Danh từ đếm được số nhiều", "Danh từ không đếm được", "Danh từ riêng"], a: 2, exp: "Information (thông tin) là danh từ không đếm được trong tiếng Anh." },
    { q: "Hình thức số nhiều của 'person' là gì?", o: ["persons", "peoples", "people", "person's"], a: 2, exp: "People là danh từ số nhiều bất quy tắc của person." },
    { q: "Đâu là danh từ chỉ giống cái của từ 'actor'?", o: ["actorette", "actress", "female-actor", "actors"], a: 1, exp: "Actress mang nghĩa là nữ diễn viên." },
    { q: "Điền từ thích hợp: 'There are two ______ on the table.'", o: ["box", "boxs", "boxes", "boxies"], a: 2, exp: "Danh từ kết thúc bằng 'x' thì thêm 'es' khi ở số nhiều." },

    // Động từ
    { q: "She ______ English every day.", o: ["study", "studies", "studying", "studied"], a: 1, exp: "Thì hiện tại đơn với 'every day', chủ ngữ ngôi 3 số ít (She) nên động từ thêm 'es'." },
    { q: "They ______ to the cinema last night.", o: ["go", "goes", "went", "going"], a: 2, exp: "Thì quá khứ đơn với dấu hiệu 'last night', dạng quá khứ của go là went." },
    { q: "I am ______ my homework right now.", o: ["do", "does", "doing", "done"], a: 2, exp: "Thì hiện tại tiếp diễn với 'right now', cấu trúc be + V-ing." },
    { q: "My father enjoys ______ books in his free time.", o: ["read", "to read", "reading", "reads"], a: 2, exp: "Theo quy tắc, sau động từ 'enjoy' là một V-ing." },
    { q: "We ______ this movie three times already.", o: ["see", "saw", "have seen", "seeing"], a: 2, exp: "Thì hiện tại hoàn thành diễn tả trải nghiệm (đã xem 3 lần)." },
    { q: "I want ______ a doctor in the future.", o: ["become", "to become", "becoming", "became"], a: 1, exp: "Cấu trúc: want + to V (muốn làm gì đó)." },
    { q: "If it rains tomorrow, we ______ the picnic.", o: ["cancel", "will cancel", "cancelled", "cancelling"], a: 1, exp: "Câu điều kiện loại 1 diễn tả sự việc có thể xảy ra ở tương lai: If + HTĐ, Tương lai đơn." },
    { q: "Listen! Someone ______ at the door.", o: ["knocks", "is knocking", "knocked", "has knocked"], a: 1, exp: "Hành động đang xảy ra tại thời điểm nói (dấu hiệu 'Listen!')." },
    { q: "He ______ his keys yesterday.", o: ["lose", "loses", "lost", "losing"], a: 2, exp: "Quá khứ đơn (yesterday), quá khứ của 'lose' là 'lost'." },
    { q: "Everyone ______ happy at the party last night.", o: ["was", "were", "is", "are"], a: 0, exp: "Đại từ bất định 'Everyone' đi với động từ số ít, thì quá khứ dùng 'was'." },
    { q: "You should ______ your hands before eating.", o: ["wash", "to wash", "washing", "washed"], a: 0, exp: "Sau động từ khuyết thiếu 'should' là động từ nguyên mẫu không 'to'." },
    { q: "______ exercise is good for your health.", o: ["Do", "Doing", "Does", "Did"], a: 1, exp: "Động từ dạng V-ing (Danh động từ) đứng đầu câu làm chủ ngữ." },
    { q: "When I arrived, they ______ dinner.", o: ["eat", "are eating", "were eating", "have eaten"], a: 2, exp: "Hành động đang diễn ra trong quá khứ (were eating) thì có hành động khác xen vào (arrived)." },
    { q: "This house ______ in 1990.", o: ["built", "builds", "was built", "is building"], a: 2, exp: "Câu bị động ở thì quá khứ đơn (in 1990): was + PII." },
    { q: "Has she ever ______ to Japan?", o: ["be", "was", "being", "been"], a: 3, exp: "Thì hiện tại hoàn thành, phân từ II của 'be' là 'been'." }
];

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
                            ${opt}
                        </label>
                    </li>
                `;
        });

        quizHTML += `
    <div class="question-block" id="block-${qIndex}">
        <div class="question-title">Câu ${qIndex + 1}: ${question.q}</div>
        <ul class="options">
            ${optionsHTML}
        </ul>
        <div class="explanation" id="exp-${qIndex}">
            <strong>Giải thích:</strong> ${question.exp}
        </div>
    </div>
    `;
    });
    quizContainer.innerHTML = quizHTML;
}

// Hàm chấm điểm
function checkAnswers() {
    let score = 0;

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
                score++;
            } else {
                selectedOption.closest('li').classList.add('wrong-answer');
            }
        }

        // Hiện giải thích
        explanationBlock.style.display = 'block';
    });

    // Hiển thị kết quả
    const resultBanner = document.getElementById('result-banner');
    resultBanner.style.display = 'block';
    resultBanner.innerHTML = `Bạn đã trả lời đúng ${score} / ${questionsData.length} câu.`;

    resultBanner.className = ''; // reset
    if (score >= 25) {
        resultBanner.classList.add('score-good');
        resultBanner.innerHTML += ' <br />🎉 Xuất sắc! Kiến thức của bạn rất vững.';
    } else if (score >= 15) {
        resultBanner.classList.add('score-average');
        resultBanner.innerHTML += ' <br />👍 Khá tốt! Hãy ôn tập thêm các phần bị sai nhé.';
    } else {
        resultBanner.classList.add('score-poor');
        resultBanner.innerHTML += ' <br />💪 Đừng nản lòng! Hãy đọc kỹ lại phần giải thích.';
    }

    // Ẩn nút nộp bài tránh nhấn nhiều lần, hoặc để người dùng xem lại
    document.getElementById('submit-btn').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Khởi tạo trắc nghiệm khi tải trang
buildQuiz();