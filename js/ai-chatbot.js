// js/ai-chatbot.js

// SORU-CEVAP VERİTABANI (sık sorulan sorular - genişletildi)
const qaPairs = {
    "merhaba": "Merhaba! Beraber Gezelim'e hoş geldiniz. Size nasıl yardımcı olabilirim?",
    "selam": "Selam! Gezilecek yerler, ulaşım veya iletişim hakkında soru sorabilirsiniz.",
    "nasılsın": "İyiyim, teşekkürler! Size yer, yol tarifi ya da gezi önerileriyle yardımcı olabilirim.",
    "nasıl giderim": "Ulaşım bilgileri için <a href='nasilgiderim.html' class='qa-link' style='color:#ffd66b;font-weight:bold;'>bu sayfayı</a> ziyaret edebilirsiniz.",
    "pamukkale": "Pamukkale travertenleri ve Hierapolis antik kenti çok popüler. Detaylı bilgi için <a href='pamukkale.html' class='qa-link' style='color:#ffd66b;font-weight:bold;'>Pamukkale sayfasına</a> bakın.",
    "pamukkale giriş ücreti": "Giriş ücretleri zamanla değişebilir. Güncel ücret bilgisi için Pamukkale sayfasını kontrol edin veya yerel gişe ile iletişime geçin.",
    "pamukkale çalışma saatleri": "Pamukkale ziyaret saatleri mevsime göre değişebilir; genelde sabah erken ve akşama doğru ziyaretçiler için uygundur.",
    "hierapolis": "Hierapolis antik kenti, Pamukkale'nin hemen yanında yer alır; antik kalıntılar ve nekropol ziyaret edilebilir.",
    "kaleiçi": "Kaleiçi, tarihi dokusu ve dar sokaklarıyla ünlüdür. Küçük dükkanlar, kafe ve restoranlar bulabilirsiniz.",
    "kaleiçi gece hayatı": "Kaleiçi gece de canlıdır; bazı barlar ve restoranlar akşam geç saatlere kadar açık olur.",
    "çamlık": "Çamlık Tabiat Parkı doğa yürüyüşleri ve piknik için idealdir. Çocuklu aileler için uygun yeşil alanlar vardır.",
    "çamlık yürüyüş": "Çamlık'ta işaretli yürüyüş yolları var; rahat yürüyüş ayakkabısı önerilir.",
    "denizli": "Denizli, Türkiye'nin Ege Bölgesi'nde yer alan bir ildir; Pamukkale gibi turistik yerlere ve tekstil sektörüne sahip bir merkezdir.",
    "denizli nerede": "Denizli, Türkiye'nin batısında, Ege Bölgesi'nde bulunur. Ulaşım bilgileri için 'Nasıl Giderim' sayfasına bakın.",
    "denizli adı nereden geliyor": "Denizli adının kökeni kesin olmamakla birlikte çeşitli tarihsel kaynaklar üzerinden yorumlanır; halk arasında farklı teoriler mevcuttur.",
    "nereden geliyor": "Genellikle yer adlarının kökeni tarihsel, coğrafi veya eski dillerdeki kaynaklara dayanır; hangi yerin adını merak ediyorsunuz?",
    "ulaşım": "Toplu taşıma, otobüs ve özel araç seçenekleri hakkında bilgi için <a href='nasilgiderim.html' class='qa-link' style='color:#ffd66b;font-weight:bold;'>Ulaşım</a> sayfasına bakın.",
    "otogar": "Denizli otogarı şehirlerarası otobüsler için ana noktadır. Otogar bilgileri ve sefer saatleri otobüs firmalarının web sitelerinde bulunur.",
    "havaalanı": "Denizli'de Çardak Havalimanı bulunmaktadır; iç hat uçuşlarıyla bağlantı mevcuttur. En güncel uçuş bilgileri havalimanı sayfasından kontrol edilebilir.",
    "tren garı": "Bölgede demiryolu bağlantıları sınırlı olabilir; yakın şehirlerdeki tren hatları hakkında bilgi almak için TCDD web sitesine bakın.",
    "taksi": "Taksi çağırmak için yerel numaraları kullanabilirsiniz; kısa mesafe ücretleri mesafeye göre değişir.",
    "taksi fiyat": "Taksi ücretleri sabit tarifeye göre belirlenir; trafik ve mesafeye bağlı değişiklik olabilir.",
    "konaklama": "Bölgede oteller, pansiyonlar ve butik konaklama seçenekleri bulunur. Konaklama tercihinize göre erken rezervasyon önerilir.",
    "oteller": "Pamukkale ve şehir merkezinde farklı fiyat aralıklarında oteller bulabilirsiniz; hangi bütçede olduğunu söylerseniz öneride bulunabilirim.",
    "restoranlar": "Yerel restoranlarda bölgesel lezzetler tadılabilir. Hangi tür yemek aradığınızı söylerseniz tavsiye verebilirim.",
    "alışveriş": "Denizli tekstil ürünleri ile bilinir; yerel pazarlar ve alışveriş merkezlerinde alışveriş yapabilirsiniz.",
    "çarşı": "Şehir merkezinde küçük dükkanlar ve çarşılar bulunur; hediyelik eşyalar için bakabilirsiniz.",
    "müzeler": "Yörede küçük müzeler ve arkeolojik sergiler olabilir; hangi tür müze merak ediyorsunuz?",
    "arkeoloji müzesi": "Arkeoloji müzeleri, bölgenin tarihi eserlerini sergiler; ziyaret saatlerini önceden kontrol etmenizi öneririm.",
    "bilet": "Bazı ören yerleri ve müzeler için giriş ücreti alınabilir; gitmeden önce ilgili sayfayı kontrol edin.",
    "rehber": "Rehber hizmetleri tur firmaları tarafından sağlanır; rehber talep ederseniz günübirlik turlar hakkında bilgi alabilirsiniz.",
    "turlar": "Günübirlik turlar ve rehberli ziyaretler popülerdir; tur şirketleriyle irtibata geçerek rezervasyon yapabilirsiniz.",
    "ne kadar zaman": "Önemli turistik noktalar için genelde Pamukkale yarım gün, şehir merkezini gezmek 1-2 saat sürebilir; bütçene göre öneri verebilirim.",
    "kaç gün": "Denizli ve çevresini rahatça gezmek için 1-3 gün idealdir; planınıza göre öneri isterseniz detaylandırırım.",
    "fotoğraf noktası": "Pamukkale travertenleri gün batımında özellikle güzel fotoğraflar verir; erken saatlerde daha sakin olur.",
    "manzara noktası": "Kaleiçi çevresinde ve yüksekteki noktalarda güzel manzaralar yakalanır.",
    "hava durumu": "Hava durumu mevsime göre değişir; seyahat tarihine yakın bir tarihte güncel hava durumunu kontrol etmenizi öneririm.",
    "en sıcak ay": "Bölgede en sıcak aylar genelde temmuz-ağustos aylarıdır.",
    "en soğuk ay": "En soğuk aylar genelde ocak-şubat aylarıdır.",
    "güvenlik": "Turistik bölgeler genelde güvenlidir, yine de kişisel eşyalarınıza dikkat etmenizi öneririm.",
    "acil durum": "Türkiye'de acil durum numarası 112'dir; sağlık veya acil yardım gerektiren durumlarda arayın.",
    "tuvalet": "Turistik noktalarda veya kafelerde genellikle tuvalet bulunur; açık alanlarda belediye tesislerini kullanabilirsiniz.",
    "engelliler için erişim": "Bazı ören yerleri ve tarihi alanlar erişim açısından sınırlı olabilir; özel ihtiyaç varsa gitmeden bilgi almanızı öneririm.",
    "otopark": "Popüler ziyaret noktalarında otopark alanları bulunur; yoğun dönemlerde erken gitmeniz yer bulmanızı kolaylaştırır.",
    "turist danışma": "Yerel belediyenin veya turizm ofisinin bilgi noktalarından güncel bilgiler alabilirsiniz.",
    "iletisim": "Bize ulaşmak isterseniz <a href='iletisim.html' class='qa-link' style='color:#ffd66b;font-weight:bold;'>İletişim</a> sayfasındaki formu kullanabilirsiniz.",
    "hakkında": "Site hakkında bilgi almak için <a href='hakkinda.html' class='qa-link' style='color:#ffd66b;font-weight:bold;'>Hakkımızda</a> sayfasını ziyaret edin.",
    "telefon": "Telefon veya e-posta bilgileri için lütfen <a href='iletisim.html' class='qa-link' style='color:#ffd66b;font-weight:bold;'>İletişim</a> sayfasına bakın.",
    "fotoğraf": "Her destinasyonun sayfasında fotoğraflar var; hangi yeri görmek istersiniz?",
    "tavsiyeler": "Yürüyüş ayakkabısı, güneş kremi ve su taşımanızı öneririm. Özellikle yaz aylarında sıcak olabiliyor.",
    "restoran": "Yerel lezzetleri denemek isterseniz, hangi ilçe/mahallede olduğunuzu söyleyin, öneriler vereyim.",
    "default": "Üzgünüm, bunu anlayamadım. 'merhaba', 'pamukkale' veya 'nasıl giderim' gibi kısa anahtar kelimeler deneyin."
};

// LocalStorage anahtar
const LOCAL_QA_KEY = 'bg_local_qa';

// Eğer localStorage'ta QA yoksa `qaPairs` ile başlat
function seedLocalQAFromPairs() {
    try {
        const raw = localStorage.getItem(LOCAL_QA_KEY);
        if (raw) return; // zaten veri var
        const db = {};
            for (const [k, v] of Object.entries(qaPairs)) {
                if (k === 'default') continue;
                db[normalizeKey(k)] = { a: v, category: 'builtin', createdAt: new Date().toISOString() };
        }
        localStorage.setItem(LOCAL_QA_KEY, JSON.stringify(db));
    } catch (e) { /* ignored */ }
}

    // Normalize: küçük harfe çevir, Unicode normalize et, Türkçe karakterleri sadeleştir
    function normalizeKey(s) {
        if (!s) return '';
        let t = s.toString().toLowerCase().trim();
        // Türkçe karakterleri sadeleştir
        t = t.replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u');
        // Normalize unicode and remove diacritics
        try { t = t.normalize('NFD').replace(/\p{Diacritic}/gu, ''); } catch (e) {}
        return t.replace(/[^a-z0-9\s]+/g, ' ').replace(/\s+/g, ' ').trim();
    }

    function loadLocalQA() {
        try {
            const raw = localStorage.getItem(LOCAL_QA_KEY);
            if (!raw) return {};
            return JSON.parse(raw);
        } catch (e) { return {}; }
    }

    function saveLocalQA(db) {
        try { localStorage.setItem(LOCAL_QA_KEY, JSON.stringify(db)); } catch (e) {}
    }

    function localFindAnswer(normQuestion) {
        const db = loadLocalQA();
        if (!normQuestion) return null;
        // exact key
        if (db[normQuestion]) return db[normQuestion];
        // includes match: check if any stored key is substring of question or vice versa
        for (const [k, v] of Object.entries(db)) {
            if (!k) continue;
            if (normQuestion.includes(k) || k.includes(normQuestion)) return v;
        }
        return null;
    }

    function localSavePair(rawQuestion, answer, category = 'auto') {
        try {
            const db = loadLocalQA();
            const k = normalizeKey(rawQuestion);
            db[k] = { a: answer, category, createdAt: new Date().toISOString() };
            saveLocalQA(db);
        } catch (e) { }
    }
// CHATBOX AÇ/KAPA
document.addEventListener("DOMContentLoaded", function() {
    // İlk yüklemede yerel QA'yı seed et (eğer boşsa)
    seedLocalQAFromPairs();
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
    const raw = (userInput.value || '').trim();
    const normQ = normalizeKey(raw);

    if (!raw) return;

    // Güvenlik: basit HTML kaçış
    const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Kullanıcı mesajını göster
    chatbox.innerHTML += `
        <div class="message user-message">
            ${escapeHtml(raw)}
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

        // Önce localStorage içinden arama (normalize edilmiş anahtarlarla)
        const localMatch = localFindAnswer(normQ);
        let answer = null;
        let renderAsHtml = false;

        if (localMatch) {
            // localMatch genelde {a:..., category:...}
            if (typeof localMatch === 'string') {
                answer = localMatch;
            } else {
                answer = localMatch.a || qaPairs.default;
                if (localMatch.category === 'builtin') renderAsHtml = true;
            }
        } else {
            // built-in qaPairs ile eşleştirme (normalize edilerek)
            answer = qaPairs.default;
            for (const [keyword, response] of Object.entries(qaPairs)) {
                const nk = normalizeKey(keyword);
                if (nk && normQ.includes(nk)) {
                    answer = response;
                    renderAsHtml = true; // built-in kaynaklardan gelen cevaplar HTML içerebilir
                    break;
                }
            }
            // öğren: localStorage'a kaydet (otomatik öğrenme)
            try { localSavePair(raw, answer, 'auto'); } catch (e) {}
        }

        // Bot cevabını ekle (sadece güvenli built-in cevaplar HTML olarak renderlenir)
        chatbox.innerHTML += `
            <div class="message bot-message">
                ${renderAsHtml ? answer : escapeHtml(answer)}
            </div>
        `;
        chatbox.scrollTop = chatbox.scrollHeight;

        // Eğer HTML renderlendiyse, mesaj içindeki <a> etiketlerine güvenli gezinme bağla
        if (renderAsHtml) {
            try {
                const botMsgs = chatbox.querySelectorAll('.message.bot-message');
                const lastMsg = botMsgs[botMsgs.length - 1];
                if (lastMsg) {
                    const anchors = lastMsg.querySelectorAll('a.qa-link, a');
                    anchors.forEach(a => {
                        if (a.dataset.bgBound) return;
                        a.dataset.bgBound = '1';
                        // target ve rel güvenliği
                        a.setAttribute('target', '_self');
                        a.setAttribute('rel', 'noopener');
                        a.addEventListener('click', function (ev) {
                            try {
                                // Eğer href yerel sayfaysa normal gezinmeyi kullan
                                const href = this.getAttribute('href');
                                if (!href) return;
                                ev.preventDefault();
                                // Basit güvenlik: yalnızca aynı dizindeki html dosyalarına izin ver
                                if (/^[^:\/\\?#]+\.html$/.test(href) || href.startsWith('./') || href.startsWith('/') ) {
                                    window.location.href = href;
                                } else {
                                    // dış linkse yeni sekmede aç
                                    window.open(href, '_blank', 'noopener');
                                }
                            } catch (e) { /* ignore */ }
                        });
                    });
                }
            } catch (e) { /* ignore */ }
        }
    }, 900);
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
