const BOT_TOKEN = "7590377729:AAEiiPRJGEOUMcz-BCQnoSOKMPkUj96RZZY";  // Zameni sa svojim bot tokenom
const CHAT_ID = "922442499";      // Zameni sa svojim chat ID-om

const BOT_TOKEN = "tvoj_bot_token";  // Zameni sa svojim bot tokenom
const CHAT_ID = "tvoj_chat_id";      // Zameni sa svojim chat ID-om

function submitOrder() {
    let selectedFood = [];
    let checkboxes = document.querySelectorAll('input[name="food"]:checked');
    checkboxes.forEach((checkbox) => {
        selectedFood.push(checkbox.value);
    });

    let note = document.getElementById("note").value;
    let phoneNumber = document.getElementById("phoneNumber").value.trim();

    if (!phoneNumber) {
        alert("Molimo unesite broj telefona!");
        return;
    }

    let orderDetails = `🍽 *Nova narudžbina!*\n\n📌 *Hrana:* ${selectedFood.join(", ")}\n📝 *Napomena:* ${note}\n📞 *Telefon:* ${phoneNumber}`;

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                let locationMessage = `📍 *Lokacija korisnika:*\n[Otvori u Google mapama](https://www.google.com/maps?q=${latitude},${longitude})`;

                sendToTelegram(orderDetails + "\n\n" + locationMessage);
            },
            (error) => {
                console.error("Greška sa lokacijom:", error);
                sendToTelegram(orderDetails + "\n\n⚠ Korisnik nije dozvolio pristup lokaciji.");
            }
        );
    } else {
        sendToTelegram(orderDetails + "\n\n❌ Pregledač ne podržava geolokaciju.");
    }
}

// Funkcija za slanje poruke na Telegram
function sendToTelegram(message) {
    let telegramURL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    fetch(telegramURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "Markdown"
        })
    })
    .then(response => response.json())
    .then(data => console.log("Uspešno poslato:", data))
    .catch(error => console.error("Greška:", error));
}
