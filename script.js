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
    { q: "Has she ever ______ to Japan?", o: ["be", "was", "being", "been"], a: 3, exp: "Thì hiện tại hoàn thành, phân từ II của 'be' là 'been'." },
    
    // Câu hỏi bẫy từ more_quiz.md
    { q: "I have a lot of ______ to do tonight.", o: ["homeworks", "homework", "a homework", "the homeworks"], a: 1, exp: "Người Việt thường đếm 'một bài tập, hai bài tập' nên rất dễ chọn 'homeworks'. Tuy nhiên, trong tiếng Anh, 'homework' (bài tập về nhà), 'information' (thông tin), 'advice' (lời khuyên) là những danh từ không đếm được, do đó không bao giờ có chữ 's' ở cuối." },
    { q: "The news about the storm ______ very bad.", o: ["is", "are", "be", "am"], a: 0, exp: "Từ 'news' (tin tức) có chữ 's' ở cuối khiến nhiều người tưởng đây là danh từ số nhiều và chọn 'are'. Thực chất, 'news' là danh từ không đếm được và luôn đi với động từ số ít." },
    { q: "The police ______ running after the thief.", o: ["is", "are", "was", "has"], a: 1, exp: "Từ 'police' (cảnh sát) không có 's' ở cuối nên người học thường nghĩ nó là số ít và chọn 'is'. Nhưng 'the police' là một danh từ tập hợp luôn mang nghĩa số nhiều (lực lượng cảnh sát), do đó phải dùng 'are'." },
    { q: "There are three ______ in the fish tank.", o: ["fish", "fishes", "fishs", "a fish"], a: 0, exp: "Quy tắc thông thường là thêm 's/es' khi có từ hai vật trở lên. Tuy nhiên, 'fish' (con cá) và 'sheep' (con cừu) là những danh từ đặc biệt: hình thức số ít và số nhiều của chúng giống y hệt nhau. (Lưu ý: 'fishes' chỉ dùng khi nói về các loài cá khác nhau)." },
    { q: "She bought two ______ yesterday.", o: ["loaf of bread", "loafs of bread", "loaves of bread", "loaves of breads"], a: 2, exp: "'Bread' (bánh mì) là danh từ không đếm được, không thể thêm 's'. Để đếm bánh mì, ta dùng cụm 'a loaf of' (một ổ). Số nhiều của 'loaf' (kết thúc bằng -f) phải đổi thành 'loaves'." },
    { q: "Everyone in the class ______ English very well.", o: ["speak", "speaks", "speaking", "are speaking"], a: 1, exp: "'Everyone' hoặc 'Everybody' dịch ra tiếng Việt là 'mọi người' (nghe có vẻ là số nhiều). Tuy nhiên, trong ngữ pháp tiếng Anh, các đại từ bất định này luôn được coi là chủ ngữ số ít. Do đó, động từ phải thêm 's/es'." },
    { q: "I ______ the answer right now.", o: ["know", "am knowing", "knows", "knowing"], a: 0, exp: "Thấy dấu hiệu 'right now' (ngay bây giờ), người học sẽ lập tức chọn thì hiện tại tiếp diễn 'am knowing'. Tuy nhiên, 'know' (biết), 'understand' (hiểu), 'love' (yêu) là các động từ chỉ trạng thái (stative verbs), không bao giờ được dùng ở dạng V-ing." },
    { q: "The box of chocolates ______ on the table.", o: ["is", "are", "be", "have"], a: 0, exp: "Người học nhìn thấy từ 'chocolates' đứng ngay trước chỗ trống nên sẽ vội chọn 'are'. Nhưng chủ ngữ chính của câu này là 'The box' (Chiếc hộp - số ít), 'of chocolates' chỉ là cụm từ bổ nghĩa cho chiếc hộp đó mà thôi." },
    { q: "I am looking forward to ______ you soon.", o: ["see", "seeing", "saw", "seen"], a: 1, exp: "Người học được dạy quy tắc 'sau TO là một động từ nguyên thể (to V)'. Tuy nhiên, trong cấu trúc 'look forward to' (mong đợi điều gì), chữ 'to' ở đây là một giới từ, và theo nguyên tắc, sau giới từ phải là V-ing." },
    { q: "Do you mind ______ the window?", o: ["open", "to open", "opening", "opened"], a: 2, exp: "Nhiều người quen miệng dùng 'to V' (giống như want to, need to). Nhưng sau động từ 'mind' (phiền, ngại) bắt buộc phải sử dụng động từ ở dạng V-ing. Cấu trúc: Would/Do you mind + V-ing?" }
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