const GLIDE_URL = "https://datafora.glide.page/dl/17171d";
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzSu9zeVzya_QANdJwzfBDg1q3z-wghzbmR5vVeLuDTahTw9UaRLPWBY_LO85-WEUjIiw/exec";

function getIndoDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('id-ID', options);
}

async function initRedirect() {
    try {
        const response = await fetch(APPS_SCRIPT_URL);
        const data = await response.json();

        // Gabungkan teks informasi
        const fullText = `Selamat Datang di Datafora BPS Kota Singkawang • Hari ${getIndoDate()} • Jumlah Pengunjung: ${data.total} kali • `;

        const container = document.getElementById('marquee-content');

        // Isi teks ganda agar looping mulus (infinite)
        container.innerHTML = `
            <div class="marquee-text">${fullText}</div>
            <div class="marquee-text">${fullText}</div>
        `;

        // Tampilkan teks
        container.style.visibility = 'visible';

        // Jeda redirect agar user bisa melihat data
        setTimeout(() => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.8s ease';
            setTimeout(() => { window.location.href = GLIDE_URL; }, 800);
        }, 6500);

    } catch (error) {
        console.error("Fetch error:", error);
        const container = document.getElementById('marquee-content');
        const infoText = `Selamat Datang di Datafora BPS Kota Singkawang • Hari ${getIndoDate()} • Total Kunjungan: ${data.total} kali •`;

        // Masukkan ke dalam class marquee-item
        container.innerHTML = `
        <div class="marquee-item">${infoText}</div>
        <div class="marquee-item">${infoText}</div>
        <div class="marquee-item">${infoText}</div>
        <div class="marquee-item">${infoText}</div>
    `;

        container.style.visibility = 'visible';

        setTimeout(() => { window.location.href = GLIDE_URL; }, 3000);
    }
}

// Jalankan fungsi saat window dimuat
window.onload = initRedirect;