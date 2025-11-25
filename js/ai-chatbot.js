// js/ai-chatbot.js

// SORU-CEVAP VERİTABANI
const qaPairs = {
    "merhaba": "Merhaba! Beraber Gezelim'e hoş geldiniz. Size nasıl yardımcı olabilirim?",
    "nasılsın": "Merhaba hoşgeldin daha gelişme aşamasındayım. Ondan dolayı bazı şeyleri anlayamıyorum ve hemen cevap veremiyorum çok yakında hepsi olucak ziyaret ettiğin için teşekkürler",
    "nasıl giderim": "Ulaşım bilgileri için <a href='nasilgiderim.html' style='color:#4CAF50;font-weight:bold;'>bu sayfayı</a> ziyaret edebilirsiniz.",
    "pamukkale": "Pamukkale'de travertenler ve Hierapolis antik kenti görülmeye değer. Giriş ücreti 200 TL'dir.",
    "default": "Üzgünüm, bu soruyu anlayamadım. 'merhaba' veya 'nasıl giderim' gibi anahtar kelimeler deneyin."
    "bilet fiyatı": "Güncel bilet fiyatları sezona göre değişmektedir. Ortalama giriş ücreti 200-300 TL arasındadır.",
"çalışma saatleri": "Pamukkale ve çevresindeki turistik bölgeler genellikle 08:00 - 19:00 arasında açıktır. Mevsime göre değişiklik olabilir.",
"nerede": "Pamukkale, Denizli il sınırları içerisinde yer almaktadır. İl merkezine yaklaşık 20 kilometre mesafededir.",
"turlar": "Bölgeye düzenlenen günlük ve özel turlar mevcuttur. Detaylı tur bilgileri için 'turlar.html' sayfasını ziyaret edebilirsiniz.",
"yakın oteller": "Pamukkale çevresinde birçok otel ve pansiyon bulunmaktadır. Tavsiye edilen oteller listesi için 'oteller.html' sayfasına göz atabilirsiniz.",
"yemek nerede yenir": "Pamukkale çevresinde yöresel yemekler sunan birçok restoran bulunur. Özellikle Denizli kebabı ve tandır tavsiye edilir.",
"hava durumu": "Pamukkale genellikle sıcak bir bölgedir. Yazın 30°C üzeri sıcaklıklar görülebilir. Gezi öncesi hava durumunu kontrol etmeniz iyi olur.",
"kaç saat sürer": "Pamukkale travertenlerini gezmek ortalama 2-3 saat sürmektedir.",
"fotoğraf çekilir mi": "Evet, fotoğraf çekebilirsiniz. Ancak bazı alanlarda drone kullanımı yasaktır.",
"engelli erişimi": "Pamukkale'nin bazı bölgelerinde engelli erişimi mevcuttur. Ancak travertenlerin tamamı için erişim sınırlı olabilir.",
"tavsiye": "Güneşin batış saatlerinde Pamukkale travertenlerini ziyaret etmeniz unutulmaz bir manzara sunar!",
"uygun saat": "Kalabalık olmayan saatler için sabah erken veya akşam üstü ziyaret etmeniz önerilir.",
"hediyelik eşya": "Pamukkale çevresinde birçok hediyelik eşya dükkânı bulunmaktadır. Traverten magnetleri oldukça popülerdir.",
"tarihçe": "Pamukkale, binlerce yıllık traverten oluşumları ve Hierapolis antik kenti ile UNESCO Dünya Mirası Listesi'nde yer almaktadır.",
"denizli": "Denizli, tekstil ürünleriyle ünlü bir şehirdir. Özellikle havlu ve bornoz ürünleri ile bilinir.",
"ulaşım": "Pamukkale’ye şehir merkezinden kalkan minibüsler ile 20-25 dakikada ulaşabilirsiniz.",
"şifalı su": "Pamukkale’nin termal suları şifalı olarak bilinir. Antik Havuz’da yüzme imkânı bulunmaktadır.",
"antik havuz": "Kleopatra Havuzu olarak da bilinen Antik Havuz’da ekstra ücret ödeyerek yüzebilirsiniz.",
"ücretsiz mi": "Pamukkale girişleri ücretlidir. Ancak çocuklar ve öğrenciler için indirim bulunabilir."
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



