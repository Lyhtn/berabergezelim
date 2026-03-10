# Beraber Gezelim - Statik Site (GitHub Pages)

Bu repo statik HTML/CSS/JS ile hazırlanmış bir gezi rehberi sitesidir. Site GitHub Pages üzerine doğrudan yayınlanmaya uygundur.

Hızlı kullanım
- Depoyu GitHub'a push edin.
- Repository > Settings > Pages bölümünden `gh-pages` veya `main` branch (veya `docs/` klasörü) seçerek sayfayı yayınlayın.

Local test
- Python ile basit sunucu:
```powershell
cd d:\berabergezelim-main
python -m http.server 8000
```
veya Node ile:
```powershell
cd d:\berabergezelim-main
npx http-server . -p 8000
```

Chatbot ve local QA
- Sohbet kutusu tamamen client-side çalışır. Tarayıcı `localStorage` anahtarı `bg_local_qa` içinde soru-cevap çiftleri tutulur.
- Eğer siteyi GitHub Pages üzerinde deploy ediyorsanız arka uç (server) gerekmez.
- Yerel admin arayüzü: `local-admin.html` — buradan kayıtları görüntüleyebilir, silebilir, export/import yapabilirsiniz.

Gizlilik ve uyarı
- LocalStorage'daki veriler kullanıcı tarayıcısında saklanır; sunucuya gönderilmez.

