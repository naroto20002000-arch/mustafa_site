const EMAIL_RECIPIENT = 'naroto20002000@gmail.com';
const menuItems = [
    {
        id: 'masgouf',

        name: 'المسكوف',
        description: 'سمك مشوي بنكهة عراقية تقليدية، ويعد من أشهر أطباق الغداء في العراق.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Masgouf.jpg'
    },
    {
        id: 'dolma',
        name: 'الدولمة',
        description: 'خضار محشية بالأرز واللحم والبهارات، تقدم ساخنة ولذيذة.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Iraqi_Dolma.jpg'
    },
    {
        id: 'kebab',
        name: 'الكباب العراقي',
        description: 'كباب لحم مشوي مع خبز طازج وصلصة طماطم خاصة.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Iraqi_Kebab.jpg'
    },
    {
        id: 'tashreeb',
        name: 'تشريب',
        description: 'تشريب عراقي تقليدي من خبز التنور المغموس بمرقة لحم الغنم الغنية والتوابل.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Red_Iraqi_Tashrib.jpg'
    }
];

const menuList = document.getElementById('menuList');
const sendButton = document.getElementById('submitBtn');
const feedback = document.getElementById('feedback');
const senderName = document.getElementById('senderName');
const selectedSummary = document.getElementById('selectedSummary');
let selectedId = null;

function renderMenu() {
    menuItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = `
            <label for="${item.id}">
                <img src="${item.image}" alt="${item.name}" />
                <div class="card-content">
                    <h2>${item.name}</h2>
                    <p>${item.description}</p>
                </div>
            </label>
            <input type="radio" id="${item.id}" name="menu" value="${item.id}" />
        `;
        menuList.appendChild(card);

        const radio = card.querySelector('input');
        radio.addEventListener('change', () => selectItem(item.id, card));
        card.addEventListener('click', event => {
            if (event.target.tagName.toLowerCase() !== 'a') {
                radio.checked = true;
                selectItem(item.id, card);
            }
        });
    });
}

function selectItem(id, card) {
    selectedId = id;
    const item = menuItems.find(menu => menu.id === id);
    selectedSummary.textContent = `الاختيار الحالي: ${item.name}`;
    feedback.textContent = '';
    document.querySelectorAll('.menu-card').forEach(cardElement => {
        cardElement.classList.toggle('selected', cardElement === card);
    });
}

function submitChoice() {
    if (!selectedId) {
        feedback.textContent = 'من فضلك اختر وجبة من القائمة أولاً.';
        return;
    }
    const name = senderName.value.trim() || 'زائر مجهول';
    const item = menuItems.find(menu => menu.id === selectedId);
    const subject = encodeURIComponent('اختيار وجبة الغداء العراقية');
    const body = encodeURIComponent(`الاسم: ${name}\nالاختيار: ${item.name}\nالطبق: ${item.description}`);
    const mailto = `mailto:${EMAIL_RECIPIENT}?subject=${subject}&body=${body}`;
    feedback.innerHTML = `تم تجهيز اختيارك: <strong>${item.name}</strong>. سيتم فتح بريدك الإلكتروني لإرسال الطلب.`;
    window.location.href = mailto;
}

renderMenu();
sendButton.addEventListener('click', submitChoice);