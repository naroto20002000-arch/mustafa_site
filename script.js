document.getElementById('yesBtn').addEventListener('click', () => showResult('yes'));
document.getElementById('noBtn').addEventListener('click', () => showResult('no'));

function showResult(choice) {
    const result = document.getElementById('result');
    const buttons = document.querySelector('.buttons');
    buttons.style.display = 'none';
    if (choice === 'yes') {
        result.innerHTML = '<div><div class="emoji">🌸</div><div class="small">You gave Mustafa a flower.</div></div>';
        confetti();
    } else {
        result.innerHTML = '<div><div class="emoji">💩</div><div class="small">Oh no — you gave Mustafa that.</div></div>';
    }
}

function confetti() {
    const colors = ['🎉', '✨', '🥳', '🎊'];
    const stage = document.createElement('div');
    stage.className = 'confetti';
    document.body.appendChild(stage);
    for (let i = 0; i < 18; i++) {
        const el = document.createElement('span');
        el.textContent = colors[Math.floor(Math.random() * colors.length)];
        el.style.position = 'absolute';
        el.style.left = Math.random() * 100 + '%';
        el.style.top = '-10%';
        el.style.fontSize = (12 + Math.random() * 36) + 'px';
        stage.appendChild(el);
        el.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: 'translateY(' + (200 + Math.random() * 300) + 'px) rotate(' + (Math.random() * 360) + 'deg)', opacity: 0 }
        ], { duration: 1400 + Math.random() * 1000, easing: 'ease-out' });
        setTimeout(() => el.remove(), 2300);
    }
    setTimeout(() => stage.remove(), 2500);
}
