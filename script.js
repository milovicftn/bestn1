const BOT_TOKEN = "7590377729:AAEiiPRJGEOUMcz-BCQnoSOKMPkUj96RZZY";  // Zameni sa svojim bot tokenom
const CHAT_ID = "1508351183";      // Zameni sa svojim chat ID-om
let orderNumber = 10001;  // Početni broj narudžbine

function ponovo(){location.reload();}

function submitOrder(event) {
    event.preventDefault(); // Sprečava reload stranice pri slanju forme

    let selectedFood = [];
    let checkboxes = document.querySelectorAll('input[name="food"]:checked');
    checkboxes.forEach((checkbox) => {
        selectedFood.push(checkbox.value);
    });
   // if checkbox.value==0(ponovo)
    //	  else return;

    let note = document.getElementById("note").value;
    let phoneNumber = document.getElementById("phoneNumber").value.trim();
    let address = document.getElementById("address").value.trim(); // Uzimamo adresu

    if (!phoneNumber) {
        alert("Molimo unesite broj telefona!");
        return;
    }

    // Dodaj broj porudžbine i adresu u detalje
    let orderDetails =`📦*Porudžbina #${orderNumber}*\n\n📌*Hrana:* ${selectedFood.join(", ")}\n📝*Napomena:* ${note}\n📞*Telefon:* ${phoneNumber}`;

    // Ako postoji adresa, dodaj je u poruku
    if (address) {
        orderDetails += `\n🏠 *Adresa:* ${address}`;
    }

    // Pozivamo funkciju za slanje na Telegram
    sendToTelegram(orderDetails);

    // Povećaj brojač porudžbine
    orderNumber++;

    // Pokreni zvuk prilikom slanja porudžbine
    playSound();
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

// Funkcija za pokretanje zvuka
function playSound() {
    let sound = document.getElementById("sendSound");
    sound.volume = 0.05;
    sound.play();

}
