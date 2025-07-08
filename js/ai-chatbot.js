// js/ai-chatbot.js

// SORU-CEVAP VERİTABANI
const qaPairs = {
    "merhaba": "Merhaba! Beraber Gezelim'e hoş geldiniz. Size nasıl yardımcı olabilirim?",
    "nasılsın": "Merhaba nisa hoşgeldin daha gelişme aşamasındayım",
    "nasıl giderim": "Ulaşım bilgileri için <a href='nasilgiderim.html' style='color:#4CAF50;font-weight:bold;'>bu sayfayı</a> ziyaret edebilirsiniz.",
    "pamukkale": "Pamukkale'de travertenler ve Hierapolis antik kenti görülmeye değer. Giriş ücreti 200 TL'dir.",
    "default": "Üzgünüm, bu soruyu anlayamadım. 'merhaba' veya 'nasıl giderim' gibi anahtar kelimeler deneyin."
};

// CHATBOX AÇ/KAPA
document.addEventListener("DOMContentLoaded", function() {
    const chatTrigger = document.getElementById("chatbot-trigger");
    const chatPopup = document.getElementById("chatbot-popup");
    const closeChat = document.getElementById("close-chatbot");

    if (chatTrigger && chatPopup && closeChat) {
        chatTrigger.addEventListener("click", function() {
            chatPopup.style.display = "flex";
        });
        
        closeChat.addEventListener("click", function() {
            chatPopup.style.display = "none";
        });
    }
});

// MESAJ GÖNDERME FONKSİYONU
function sendMessage() {
    const userInput = document.getElementById("userInput");
    const chatbox = document.getElementById("chatbox");
    const question = userInput.value.trim().toLowerCase();
    
    if (!question) return;
    
    // Kullanıcı mesajını göster
    chatbox.innerHTML += `
        <div class="message user-message">
            ${userInput.value}
        </div>
    `;
    userInput.value = "";
    
    // Yazıyor efekti
    chatbox.innerHTML += `
        <div class="typing-indicator" id="typingIndicator">
            <span></span><span></span><span></span>
        </div>
    `;
    chatbox.scrollTop = chatbox.scrollHeight;
    
    setTimeout(() => {
        document.getElementById("typingIndicator")?.remove();
        
        let answer = qaPairs.default;
        for (const [keyword, response] of Object.entries(qaPairs)) {
            if (question.includes(keyword)) {
                answer = response;
                break;
            }
        }
        
        chatbox.innerHTML += `
            <div class="message bot-message">
                ${answer}
            </div>
        `;
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 1000);
}

// ENTER TUŞU İLE GÖNDER
document.addEventListener("DOMContentLoaded", function() {
    const userInput = document.getElementById("userInput");
    if (userInput) {
        userInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter") sendMessage();
        });
    }
});
