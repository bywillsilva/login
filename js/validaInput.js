const email = document.getElementById('email');
const popup = document.getElementById('popup');
const popup_text = document.getElementById('popup_text');

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

email.addEventListener('focusout', () => {
    if (!regex.test(email.value)) {
        popup.style.display = "block";
        popup.style.opacity = "1";
        popup_text.innerText = "Email inválido inserido";
    }
});

email.addEventListener('keyup', () => {
    if (regex.test(email.value)) {
        popup.style.opacity = "0";
        setTimeout(() => {
            popup.style.display = "none";
        }, 300);
    }
});

popup.addEventListener('click', () => {
    popup.style.display = "none";
});
