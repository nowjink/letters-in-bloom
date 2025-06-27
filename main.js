let letters = [];

const wateringCan = document.querySelector('.watering-can');
const infoIcon = document.getElementById('infoIcon');
const flowerContainer = document.querySelector('.flower-container');

const letterModal = document.getElementById('letterModal');
const letterInput = document.getElementById('letterInput');
const senderInput = document.getElementById('senderInput');
const receiverInput = document.getElementById('receiverInput');
const submitButton = document.getElementById('submitLetter');

const viewModal = document.getElementById('viewModal');
const viewContent = document.getElementById('viewContent');
const receiverLabel = document.getElementById('receiverLabel');
const senderLabel = document.getElementById('senderLabel');
const closeButtons = document.querySelectorAll('.home-button');

function changeBackground(imageName) {
  document.body.style.backgroundImage = `url('./images/${imageName}')`;
}

function hideMainUI() {
  wateringCan.style.display = 'none';
  infoIcon.style.display = 'none';
  flowerContainer.style.display = 'none';
}

function showMainUI() {
  wateringCan.style.display = 'block';
  infoIcon.style.display = 'block';
  flowerContainer.style.display = 'block';
}

wateringCan.addEventListener('click', () => {
  letterModal.classList.remove('hidden');
  changeBackground('bg_modal.jpg');
  hideMainUI();
  letterInput.value = '';
  senderInput.value = '';
  receiverInput.value = '';
});

submitButton.addEventListener('click', () => {
  const content = letterInput.value.trim();
  const sender = senderInput.value.trim();
  const receiver = receiverInput.value.trim();
  if (!content) return alert('편지를 작성해주세요!');

  const entry = { id: Date.now(), content, sender, receiver };
  letters.push(entry);
  localStorage.setItem('letters', JSON.stringify(letters));

  letterModal.classList.add('hidden');
  changeBackground('bg.jpg');
  showMainUI();
  createFlower(entry);
});

function createFlower(entry) {
  const flower = document.createElement('img');
  flower.src = './images/lily.png';
  flower.className = 'flower';

  let left = Math.random() * (window.innerWidth - 320);
  if (left < 650) left = 650;
  const top = Math.random() * (window.innerHeight - 300);

  flower.style.left = `${left}px`;
  flower.style.top = `${top}px`;

  flower.addEventListener('click', () => {
    viewModal.classList.remove('hidden');
    viewContent.textContent = entry.content;
    senderLabel.textContent = entry.sender;
    receiverLabel.textContent = entry.receiver;
    changeBackground('bg_modal.jpg');
    hideMainUI();
  });

  const name = document.createElement('div');
  name.className = 'sender-name';
  name.textContent = entry.sender || '익명';
  name.style.left = `${left + 20}px`;
  name.style.top = `${top + 130}px`;

  flowerContainer.appendChild(flower);
  flowerContainer.appendChild(name);
}

closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    letterModal.classList.add('hidden');
    viewModal.classList.add('hidden');
    changeBackground('bg.jpg');
    showMainUI();
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('letters');
  if (saved) {
    letters = JSON.parse(saved);
    letters.forEach(createFlower);
  }
  changeBackground('bg.jpg');
});
