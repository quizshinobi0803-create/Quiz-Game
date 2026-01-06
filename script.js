let totalSeconds = 15;
let tierceValue = 0;
let timerInterval;
let tierceInterval;
let returningPlayer = false;
let playerName = "";
let score = 0;
let currentIndex = 0;
let selectedAnswer = null;
let bestScores = [];
let soundEnabled = true;

// ✅ Mode aléatoire activable
let useRandomMode = true;
let remainingQuestions = [];
let currentQuestion = null;

// ✅ Musique tournante (chemins corrigés pour PWA)
const musicTracks = [
  "sounds/deep-abstract.mp3",
  "sounds/cascade-breathe.mp3",
  "sounds/embrace.mp3",
  "sounds/running-night.mp3",
  "sounds/tell-me-what.mp3"
];
let musicIndex = 0;

// 📋 Questions Naruto/Boruto (1 à 20)
const questions = [
  { question: "Quel est le démon scellé en Naruto Uzumaki ?", options: ["Kurama", "Shukaku", "Gyuki"], correct: 0 },
  { question: "Quel est le plat préféré de Naruto Uzumaki  ?", options: ["Tempura", "Ramen", "Sushi"], correct: 1 },
  { question: "Quelle est la couleur des cheveux de Sakura ?", options: ["Rose", "Bleu", "Noir"], correct: 0 },
  { question: "Qui est le rival principal de Naruto Uzumaki  ?", options: ["Neji hyuga", "Sasuke Uchiwa", "Shikamaru Nara"], correct: 1 },
  { question: "Quelle est la capacité du clan Chinoike ?", options: ["Manipulation du sang", "Manipulation des os", "Manipulation du sable"], correct: 0 },
  { question: "Quelle est la technique de Toneri pour déplacer la lune ?", options: ["Réincarnation lunaire", "Chibaku Tensei", "Tenseigan Chakra Mode"], correct: 0 },
  { question: "Quel est le nom du village de Naruto Uzumaki ?", options: ["Village de Suna", "Village de Konoha", "Village de Kiri"], correct: 1 },
  { question: "Qui est le sensei de l’équipe 7 ?", options: ["Asuma Sarutobi", "Kakashi Hatake", "Gai Maito"], correct: 1 },
  { question: "Qui est le nom ninja qui maitrise la technique Tsukuyomi ?", options: ["Madara Uchiwa", "Itachi Uchiwa", "Obito Uchiwa"], correct: 1 },
  { question: "Qui est la mère de Naruto ?", options: ["Kushina Uzumaki", "Mikoto", "Tsunade"], correct: 0 },
  { question: "Quel est le nom du clan de Sasuke ?", options: ["Hyuga", "Uchiha", "Nara"], correct: 1 },
  { question: "Qui est amoureux de Hinata ?", options: ["Naruto Uzumaki", "Kiba Inuzuka", "Shino Aburame"], correct: 0 },
  { question: "Quel est le nom du clan de Neji ?", options: ["Hyuga", "Uchiha", "Nara"], correct: 0 },
  { question: "Quelle est la capacité du clan Aburame ?", options: ["Insectes", "Feu", "Glace"], correct: 0 },
  { question: "Qui est le chef du clan Hyuga ?", options: ["Hiashi", "Hizashi", "Neji"], correct: 0 },
  { question: "Qui est le mentor de Boruto ?", options: ["Sasuke Uchiwa", "Naruto Uzumaki", "Konohamaru"], correct: 0 },
  { question: "Quel est le nom du premier Hokage ?", options: ["Hashirama", "Tobirama", "Hiruzen"], correct: 0 },
  { question: "Qui est le meilleur ami de Naruto ?", options: ["Sasuke Uchiwa", "Shikamaru", "Choji Akimichi"], correct: 1 },
  { question: "Quel est le nom du professeur de l’examen Chûnin ?", options: ["Ibiki", "Iruka", "Anko"], correct: 0 },
  { question: "Quelle est la technique héréditaire du clan Yuki ?", options: ["Hyoton", "Suiton", "Futton"], correct: 0 },
  { question: "Quelle est la capacité du Rinne Sharingan ?", options: ["Tsukuyomi infini", "Kamui", "Izanagi"], correct: 0 },
  { question: "Quelle technique permet à Madara de créer des clones invisibles ?", options: ["Limbo", "Izanagi", "Kage Bunshin"], correct: 0 },
  { question: "Quelle est la technique de Shisui Uchiha ?", options: ["Kotoamatsukami", "Amaterasu", "Izanagi"], correct: 0 },
  { question: "Quel est le nom du démon à une queue ?", options: ["Shukaku", "Matatabi", "Kurama"], correct: 0 },
  { question: "Qui est le fils de Naruto ?", options: ["Boruto Uzumaki", "Kawaki", "Mitsuki"], correct: 0 },
  { question: "Qui a tué le troisième Hokage ?", options: ["Orochimaru", "Itachi Uchiwa", "Pain"], correct: 0 },
  { question: "Quelle est la technique signature de Sasuke ?", options: ["Rasengan", "Chidori", "Amaterasu"], correct: 1 },
  { question: "Qui est le chef de l’Akatsuki ?", options: ["Nagato", "Obito Uchiwa", "Itachi Uchiwa"], correct: 0 },
  { question: "Quel est le nom du bijuu à huit queues ?", options: ["Gyuki", "Kurama", "Isobu"], correct: 0 },
  { question: "Quelle est la capacité de Mitsuki en mode sage ?",options: ["Serpent lumineux", "Électricité", "Vent"],correct: 0},
  { question: "Quel est le nom du démon à trois queues ?",options: ["Isobu", "Son Goku", "Chomei"],correct: 0},
  { question: "Quelle est la technique de Konan contre Obito ?",options: ["Mer de papier explosif", "Papier tranchant", "Clones de papier"],correct: 0},
  { question: "Quel est le nom du démon à cinq queues ?",options: ["Kokuo", "Saiken", "Gyuki"],correct: 0},
  { question: "Qui est le jinchuriki de Matatabi ?", options: ["Yugito", "Killer Bee", "Roshi"], correct: 0 },
  { question: "Qui est le frère de Killer Bee ?", options: ["A", "B", "C"], correct: 0 },
  { question: "Qui a créé le Rasengan ?", options: ["Minato", "Naruto Uzumaki", "Jiraiya"], correct: 0 },
  { question: "Qui est la fille de Sasuke ?", options: ["Sarada Uchiwa", "Sumire", "Himawari"], correct: 0 },
  { question: "Qui est le père de Mitsuki ?", options: ["Orochimaru", "Kabuto", "Jiraiya"], correct: 0 },
  { question: "Quelle est la technique interdite d’Orochimaru ?", options: ["Edo Tensei", "Rasenshuriken", "Kamui"], correct: 0 },
  { question: "Quel est le nom du village caché de la brume ?", options: ["Kiri", "Kumo", "Iwa"], correct: 0 },
  { question: "Qui est le jinchuriki de Son Goku ?", options: ["Roshi", "Han", "Utakata"], correct: 0 },
  { question: "Quelle est la technique de Gaara ?", options: ["Sable", "Feu", "Vent"], correct: 0 },
  { question: "Qui est le bras droit de Danzo ?", options: ["Sai", "Torune", "Fu"], correct: 0 },
  { question: "Quelle est la technique de Konan ?", options: ["Papier", "Eau", "Vent"], correct: 0 },
  { question: "Qui est le chef de l’Anbu ?", options: ["Kakashi", "Danzo", "Yamato"], correct: 1 },
  { question: "Quelle est la technique de Deidara ?", options: ["Explosion", "Feu", "Terre"], correct: 0 },
  { question: "Qui est le partenaire de Hidan ?", options: ["Kakuzu", "Kisame", "Zetsu"], correct: 0 },
  { question: "Quelle est la technique de Kakuzu ?", options: ["Cœurs multiples", "Sharingan", "Byakugan"], correct: 0 },
  { question: "Qui a tué Asuma ?", options: ["Hidan", "Kakuzu", "Pain"], correct: 0 },
  { question: "Qui est le chef du clan Nara ?", options: ["Shikaku", "Shikamaru", "Choza"], correct: 0 },
  {question: "Avec qui Kiba combine ses attaques pour créer le Garōga ?",options: ["Akamaru", "Shino", "Hinata"],correct: 0},
  { question: "Qui a tué Jiraiya ?", options: ["Pain", "Itachi", "Orochimaru"], correct: 0 },
  { question: "Qui est le fils de Kaguya ?", options: ["Hagoromo", "Hamura", "Toneri"], correct: 0 },
  { question: "Quelle est la technique ultime de Madara ?", options: ["Limbo", "Susanoo", "Izanagi"], correct: 0 },
  { question: "Qui a combattu Might Guy en mode huit portes ?", options: ["Madara Uchiwa", "Obito Uchiwa", "Naruto Uzumaki"], correct: 0 },
  { question: "Quelle est la faiblesse du Byakugan ?", options: ["Angle mort", "Chakra", "Vision"], correct: 0 },
  { question: "Qui est le clone de Jiraiya dans Boruto ?", options: ["Koji Kashin", "Mitsuki", "Kawaki"], correct: 0 },
  { question: "Quelle est la capacité de Momoshiki après absorption ?", options: ["Rinnegan", "Sharingan", "Byakugan"], correct: 0 },
  { question: "Qui est le chef de Kara ?", options: ["Jigen", "Code", "Delta"], correct: 0 },
  { question: "Quelle est la technique de Zabuza ?", options: ["Épée géante", "Eau", "Illusion"], correct: 0 },
  { question: "Qui est le chef du village caché du son ?", options: ["Orochimaru", "Kabuto", "Tayuya"], correct: 0 },
  { question: "Quelle est la technique de Tobi ?", options: ["Kamui", "Izanagi", "Susanoo"], correct: 0 },
  { question: "Qui a tué Rin ?", options: ["Kakashi", "Obito", "Minato"], correct: 0 },
  { question: "Quelle est la technique de Toneri ?", options: ["Réincarnation lunaire", "Rasengan", "Byakugan"], correct: 0 },
  { question: "Qui est le jinchuriki de Saiken ?", options: ["Utakata", "Han", "Roshi"], correct: 0 },
  { question: "Quelle est la technique de Han ?", options: ["Vapeur", "Feu", "Terre"], correct: 0 },
  { question: "Qui est le jinchuriki de Chomei ?", options: ["Fu", "Yugito", "Roshi"], correct: 0 },
  { question: "Quelle est la technique de Haku ?", options: ["Miroirs de glace", "Clones d’eau", "Rasengan"], correct: 0 },
  { question: "Quel est le nom du père de Konohamaru ?", options: ["Asuma Sarutobi", "Hiruzen Sarutobi", "Kousuke Sarutobi"], correct: 2 },
  { question: "Quel est le nom du scientifique qui a étudié les cellules de Hashirama ?", options: ["Orochimaru", "Kabuto", "Amado"], correct: 1 },
  { question: "Quel est le nom du fils d’Orochimaru ?", options: ["Mitsuki", "Log", "Shin"], correct: 0 },
  { question: "Quelle est la technique de Sarada qui combine Sharingan et force brute ?", options: ["Coup de poing éclair", "Sharingan + force", "Chidori"], correct: 1 },
  { question: "Quel est le nom du bras droit de Jigen ?", options: ["Code", "Delta", "Kawaki"], correct: 0 },
  {question: "Quel est le nom de la technique utilisée par Madara pour invoquer un météore géant ?",options: ["Chibaku Tensei", "Tengai Shinsei", "Limbo Hengoku"],correct: 1},
  {question: "Quelle est la capacité unique du Rinnegan de Momoshiki après avoir absorbé Kinshiki ?",options: ["Copier les techniques instantanément", "Utiliser des techniques sans mudra", "Créer des portails dimensionnels"],correct: 1},
  {question: "Quelle est la vraie identité de Koji Kashin dans Boruto ?",options: ["Un clone de Jiraiya", "Un espion de Kara", "Le fils de Jiraiya"],correct: 0},
  {question: "Quelle est la technique utilisée par Toneri pour manipuler la lune ?",options: ["Chibaku Tensei", "Tenseigan Chakra Mode", "Réincarnation lunaire"],correct: 2},
  {question: "Quel est le nom du plan final de Madara pour plonger le monde dans une illusion éternelle ?",options: ["Projet Tsukuyomi infini", "Plan de l’œil de la lune", "Genjutsu mondial"],correct: 1},
  {question: "Quel est le nom du père de Mitsuki ?",options: ["Kabuto", "Orochimaru", "Amado"],correct: 1},
  {question: "Quelle est la faiblesse du Byakugan ?",options: ["Angle mort", "Chakra instable", "Vision limitée"],correct: 0},
  {question: "Quelle est la technique interdite utilisée par Danzo ?",options: ["Izanagi", "Kamui", "Limbo"],correct: 0},
  {question: "Quel est le nom du démon à huit queues ?",options: ["Gyuki", "Kurama", "Son Goku"],correct: 0},
  {question: "Qui a tué Rin Nohara ?",options: ["Kakashi Hatake", "Obito Uchiwa", "Minato Namikaze"],correct: 0},
  {question: "Quelle est la capacité de Zetsu noir ?",options: ["Manipulation génétique", "Contrôle mental", "Vol de chakra"],correct: 0},
  {question: "Quel est le nom du frère jumeau de Hiashi Hyuga ?",options: ["Hizashi Hyuga", "Neji Hyuga", "Hanabi Hyuga"],correct: 0},
  {question: "Quelle est la technique signature de Deidara ?",options: ["Explosion d’argile", "Katon : Goukakyuu", "C4 Karura"],correct: 0},
  {question: "Quel est le nom du chef de Kara ?",options: ["Jigen", "Code", "Delta"],correct: 0},
  {question: "Quelle est la capacité de Delta ?",options: ["Rayon laser", "Téléportation", "Absorption de chakra"],correct: 0},
  {question: "Quel est le nom du bras droit de Isshiki ?",options: ["Code", "Kawaki", "Amado"],correct: 0},
  {question: "Quelle est la technique de Kinshiki ?",options: ["Hache de chakra", "Portail dimensionnel", "Absorption de techniques"],correct: 0},
  {question: "Quelle est la capacité du Tenseigan ?",options: ["Manipulation gravitationnelle", "Contrôle du temps", "Télépathie"],correct: 0},
  {question: "Quel est le nom du jinchuriki de Saiken (6 queues) ?",options: ["Utakata", "Roshi", "Han"],correct: 0},
  {question: "Quelle est la technique de Haku ?",options: ["Miroirs de glace", "Clones aqueux", "Rasengan de glace"],correct: 0},
  {question: "Qui a tué Jiraiya ?",options: ["Pain", "Itachi", "Konan"],correct: 0},
  {question: "Quelle est la technique de Kakuzu ?",options: ["Cœurs multiples", "Absorption de chakra", "Contrôle des ombres"],correct: 0},
  {question: "Quel est le nom du démon à sept queues ?",options: ["Chomei", "Isobu", "Matatabi"],correct: 0},
  {question: "Quelle est la technique de Might Guy en mode ultime ?",options: ["Hachimon Tonkou", "Rasengan rouge", "Susanoo Taijutsu"],correct: 0},
  {question: "Quelle est la capacité du Limbo de Madara ?",options: ["Clones invisibles", "Illusion totale", "Téléportation"],correct: 0},
  {question: "Quel est le nom du démon à deux queues ?",options: ["Matatabi", "Isobu", "Gyuki"],correct: 0},
  { question: "Quelle est la technique de Delta ?", options: ["Rayon laser", "Clones", "Téléportation"], correct: 0 },
  { question: "Qui est le bras droit de Isshiki ?", options: ["Code", "Kawaki", "Amado"], correct: 0 },
  { question: "Qui a vaincu Urashiki Otsutsuki?", options: ["Boruto Uzumaki", "Naruto Uzumaki", "Jiraiya"], correct: 0 },
  { question: "Quelle est la technique de Mitsuki en mode sage ?", options: ["Serpent", "Vent", "Électricité"], correct: 0 },
  { question: "Quelle est la technique de Sarada ?", options: ["Sharingan + force", "Kamui", "Rasengan"], correct: 0 },
  { question: "Qui a scellé Kurama dans Naruto ?", options: ["Minato Namikaze", "Kushina Uzumaki", "Hiruzen Sarutobi"], correct: 0 },
  { question: "Qui est le fondateur du ninjutsu ?", options: ["Hagoromo Otsutsuki", "Kaguya Otsutsuki", "Hamura Otsutsuki"], correct: 0 },
  { question: "Quelle est la technique de Kinshiki ?", options: ["Hache de chakra", "Rasengan", "Kamui"], correct: 0 },
  { question: "Qui est le chef du clan Otsutsuki ?", options: ["Kaguya Otsutsuki", "Isshiki Otsutsuki", "Momoshiki Otsutsuki"], correct: 0 },
  { question: "Qui a créé les cellules de Hashirama ?", options: ["Orochimaru", "Kabuto", "Amado"], correct: 1 },
  { question: "Qui est le jinchuriki de Isobu ?", options: ["Yagura", "Utakata", "Roshi"], correct: 0 },
  {question: "Quelle est la technique de Shisui Uchiha ?",options: ["Kotoamatsukami", "Izanagi", "Amaterasu"],correct: 0},
  {question: "Qui a scellé Kaguya ?",options: ["Naruto et Sasuke", "Hagoromo et Hamura", "Madara et Obito"],correct: 0},
  { question: "Quelle est la capacité du Byakugan ?", options: ["Vision à 360°", "Copie de techniques", "Manipulation du chakra"], correct: 0 },
  { question: "Quelle est la faiblesse du Byakugan ?", options: ["Angle mort", "Chakra instable", "Vision limitée"], correct: 0 },
  {question: "Quelle est la capacité du Rinne Sharingan ?",options: ["Tsukuyomi infini", "Kamui", "Izanami"],correct: 0},
  {question: "Quel est le nom du scientifique qui a créé Koji Kashin ?",options: ["Amado", "Orochimaru", "Kabuto"],correct: 0},
  {question: "Quelle est la technique de Sarada combinée au Sharingan ?",options: ["Chidori", "Coup de poing éclair", "Kamui"],correct: 1},
  {question: "Quelle est la technique de Han (5 queues) ?",options: ["Vapeur explosive", "Feu compressé", "Vent brûlant"],correct: 0},
  {question: "Quel est le nom du démon à quatre queues ?",options: ["Son Goku", "Roshi", "Matatabi"],correct: 0},
  {question: "Quelle est la technique de Roshi (4 queues) ?",options: ["Lave", "Feu", "Terre"],correct: 0},
  {question: "Quel est le nom du démon à une queue ?",options: ["Shukaku", "Kurama", "Isobu"],correct: 0},
  {question: "Quelle est la technique de Gaara ?", options: ["Sable", "Vent", "Terre"], correct: 0},
  {question: "Quel est le nom du démon à neuf queues ?", options: ["Kurama", "Gyuki", "Matatabi"], correct: 0},
  {question: "Quelle est la technique de Naruto en mode Kurama ?", options: ["Rasenshuriken", "Mode chakra de Kyubi", "Bijuu Bomb"], correct: 1 },
  {question: "Quelle est la technique de Sasuke avec le Rinnegan ?", options: ["Amenotejikara", "Kamui", "Izanagi"], correct: 0},
  { question: "Quelle est la technique de Sasuke avec le Rinnegan ?", options: ["Amenotejikara", "Kamui", "Izanagi"], correct: 0 },
  { question: "Quelle combinaison de chakra forme le Mokuton ?", options: ["Eau + Terre", "Feu + Vent", "Foudre + Terre"], correct: 0 },
  { question: "Qui maîtrise le Jinton (élément poussière) ?", options: ["Ōnoki", "Mu", "Kurotsuchi"], correct: 0 },
  { question: "Quelle est la capacité du clan Kaguya ?", options: ["Manipulation des os", "Manipulation du sang", "Manipulation du sable"], correct: 0 },
  { question: "Quelle technique permet de créer des illusions sans contact visuel ?", options: ["Kotoamatsukami", "Tsukuyomi", "Izanami"], correct: 0 },
  { question: "Quelle est la capacité du clan Hozuki ?", options: ["Hydrification", "Hyoton", "Suiton"], correct: 0 },
  { question: "Quelle combinaison de chakra forme le Yoton (lave) ?", options: ["Feu + Terre", "Eau + Vent", "Foudre + Terre"], correct: 0 },
  { question: "Quelle combinaison de chakra forme le Hyoton ?", options: ["Eau + Vent", "Eau + Foudre", "Vent + Terre"], correct: 0 },
  { question: "Quelle est la technique de Deidara ?", options: ["Bakuton", "Yoton", "Ranton"], correct: 0 },
  { question: "Quelle est la technique de Konan contre Obito ?", options: ["Mer de papier explosif", "Papier tranchant", "Clones de papier"], correct: 0 },
  { question: "Quelle combinaison de chakra forme le Ranton (tempête) ?", options: ["Eau + Foudre", "Vent + Foudre", "Eau + Vent"], correct: 0 },
  { question: "Quelle est la technique de Darui ?", options: ["Ranton", "Bakuton", "Yoton"], correct: 0 }, 
];

// 🧩 Fonctions principales
function displayQuestion(index) {
  const current = questions[index];
  document.getElementById("question").innerText = current.question;

  const answerGroup = document.getElementById("answerGroup");
  answerGroup.innerHTML = "";
  current.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.className = "liquid-answer-btn";
    btn.innerText = option;
    btn.onclick = () => selectAnswer(btn, i);
    answerGroup.appendChild(btn);
  });
}

function loadScoresFromStorage() {
  const stored = localStorage.getItem("shinobiScores");
  bestScores = stored ? JSON.parse(stored) : [];
}
loadScoresFromStorage();

function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  const icon = document.querySelector(".icons-right button:first-child");
  icon.textContent = soundEnabled ? "🔊" : "🔇";

  const audio = document.getElementById("quizMusic");
  if (audio) {
    if (soundEnabled) audio.play();
    else audio.pause();
  }
}

function playSound(type) {
  if (!soundEnabled) return;
  const audio = new Audio(`assets/${type}.mp3`);
  audio.play();
}

function playNextMusic() {
  const audio = document.getElementById("quizMusic");
  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
  audio.src = musicTracks[musicIndex];
  audio.volume = 0.5;
  audio.play();

  musicIndex = (musicIndex + 1) % musicTracks.length;
}

function goToQuiz() {
  const input = document.getElementById("identifiant");
  const value = input.value;
  const errorBox = document.getElementById("errorMessage");

  input.classList.remove("invalid");

  const uppercaseCount = (value.match(/[A-Z]/g) || []).length;
  const hasEnoughUppercase = uppercaseCount >= 1;
  const hasLowercase = /[a-z]/.test(value);
  const hasDigit = /[0-9]/.test(value);
  const isLengthValid = value.length >= 6 && value.length <= 8;

  if (!hasEnoughUppercase || !hasLowercase || !hasDigit || !isLengthValid) {
    input.classList.add("invalid");
    errorBox.textContent = "⚠️ Identifiant invalide : 1 majuscules, 1 minuscule, chiffre, 6 à 8 caractères.";
    return;
  }

  const alreadyUsed = bestScores.some(entry => entry.name === value);
  if (alreadyUsed) {
    errorBox.innerHTML = `
      ⚠️ Identifiant déjà utilisé.<br>
      <button onclick="continueWithID('${value}')" class="liquid-btn">Continuer</button>
      <button onclick="showIDInput()" class="liquid-btn">Créer un autre ID</button>
    `;
    return;
  }

  startQuizWithID(value);
}

function continueWithID(value) {
  startQuizWithID(value);
}

function showIDInput() {
  const formWrapper = document.querySelector(".form-wrapper");
  formWrapper.innerHTML = `
    ${returningPlayer ? `
      <button class="styled-icon return-btn" onclick="checkReturningPlayer()" style="align-self: flex-start;">
        <span class="shine"></span> 🔙 Retour
      </button>
    ` : ""}
    <input type="text" id="identifiant" name="user" placeholder="Identifiant" maxlength="8" required>
    <div id="errorMessage" class="error-message"></div>
    <button type="button" class="liquid-btn" onclick="goToQuiz()">
      <span class="shine"></span> COMMENCER
    </button>
  `;
}

function checkReturningPlayer() {
  const formWrapper = document.querySelector(".form-wrapper");
  const stored = localStorage.getItem("shinobiScores");
  const scores = stored ? JSON.parse(stored) : [];
  const lastPlayer = scores.length > 0 ? scores[scores.length - 1].name : null;

  returningPlayer = !!lastPlayer;

  if (lastPlayer) {
    formWrapper.innerHTML = `
      <div class="welcome-text">Bienvenue de retour, ${lastPlayer} !</div>
      <button class="liquid-btn" onclick="continueWithID('${lastPlayer}')">
        <span class="shine"></span> Continuer
      </button>
      <button class="liquid-btn" onclick="showIDInput()">
        <span class="shine"></span> Créer un autre ID
      </button>
    `;
  } else {
    showIDInput();
  }
}

function startQuizWithID(value) {
  playerName = value;
  document.getElementById("homePage").style.display = "none";
  document.getElementById("quizPage").style.display = "block";
  document.querySelector(".title-left").textContent = `Quiz Shinobi - ${value}`;

  const existing = bestScores.find(entry => entry.name === playerName);
  document.getElementById("record").textContent = existing ? `${existing.score} 🏆` : "0 🏆";

  shuffleQuestions();

  if (useRandomMode) {
    remainingQuestions = [...questions];
    loadRandomQuestion();
  } else {
    loadQuestion();
  }
}

function startTimer() {
  const timerDisplay = document.getElementById("timer");

  timerInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      clearInterval(tierceInterval);
      timerDisplay.innerHTML = `<span class="time-core">00:00</span> <span class="time-core">00</span>`;
      showResultMessage("⏱️ Temps écoulé !");
      document.querySelector(".validate-btn").style.display = "none";
      document.querySelector(".next-btn").style.display = "none";
      document.querySelector(".replay-btn").style.display = "inline-block";
      disableAnswers();
      return;
    }

    totalSeconds--;
    updateTimerDisplay(timerDisplay);
  }, 1000);

  tierceInterval = setInterval(() => {
    tierceValue = (tierceValue + 1) % 100;
    updateTimerDisplay(timerDisplay);
  }, 333);
}

function updateTimerDisplay(timerDisplay) {
  const seconds = String(totalSeconds).padStart(2, '0');
  const tierce = String(tierceValue).padStart(2, '0');

  timerDisplay.innerHTML = `
    <span class="time-core">00:${seconds}</span> s
    &nbsp;&nbsp;
    <span class="time-core">${tierce}</span>
  `;
}

function loadQuestion() {
  const q = questions[currentIndex];
  const questionBox = document.getElementById("question");

  questionBox.classList.remove("fade-in");
  questionBox.classList.add("fade-out");

  setTimeout(() => {
    questionBox.innerHTML = `<span class="shine"></span>${q.question}`;
    questionBox.classList.remove("fade-out");
    questionBox.classList.add("fade-in");
  }, 300);

  const answerGroup = document.getElementById("answerGroup");
  answerGroup.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "liquid-answer-btn";
    btn.type = "button";
    btn.innerHTML = `<span class="shine"></span> ${opt}`;
    btn.onclick = () => selectAnswer(btn, i);
    answerGroup.appendChild(btn);
  });

  document.querySelector(".validate-btn").style.display = "inline-block";
  document.querySelector(".next-btn").style.display = "none";
  document.querySelector(".replay-btn").style.display = "none";
  selectedAnswer = null;

  totalSeconds = 15;
  tierceValue = 0;
   clearInterval(timerInterval);
  clearInterval(tierceInterval);
  startTimer();
  playNextMusic(); // ✅ joue une musique différente à chaque question
}

function loadRandomQuestion() {
  if (remainingQuestions.length === 0) {
    showResultMessage("🎉 Toutes les questions ont été posées !");
    document.querySelector(".validate-btn").style.display = "none";
    document.querySelector(".next-btn").style.display = "none";
    document.querySelector(".replay-btn").style.display = "inline-block";
    return;
  }

  const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
  const q = remainingQuestions.splice(randomIndex, 1)[0];
  currentQuestion = q;

  const questionBox = document.getElementById("question");
  questionBox.classList.add("fade-out");

  setTimeout(() => {
    questionBox.innerHTML = `<span class="shine"></span>${q.question}`;
    questionBox.classList.remove("fade-out");
    questionBox.classList.add("fade-in");
  }, 300);

  const answerGroup = document.getElementById("answerGroup");
  answerGroup.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "liquid-answer-btn";
    btn.type = "button";
    btn.innerHTML = `<span class="shine"></span> ${opt}`;
    btn.onclick = () => selectAnswer(btn, i);
    answerGroup.appendChild(btn);
  });

  document.querySelector(".validate-btn").style.display = "inline-block";
  document.querySelector(".next-btn").style.display = "none";
  document.querySelector(".replay-btn").style.display = "none";
  selectedAnswer = null;

  totalSeconds = 15;
  tierceValue = 0;
  clearInterval(timerInterval);
  clearInterval(tierceInterval);
  startTimer();
  playNextMusic();
}

function selectAnswer(button, index) {
  selectedAnswer = index;
  document.querySelectorAll(".liquid-answer-btn").forEach(btn => btn.classList.remove("selected"));
  button.classList.add("selected");
}

function showResultMessage(message) {
  let resultBox = document.getElementById("resultMessage");
  if (!resultBox) {
    resultBox = document.createElement("div");
    resultBox.id = "resultMessage";
    document.querySelector(".container").appendChild(resultBox);
  }
  resultBox.textContent = message;
  resultBox.classList.add("visible");
}

function disableAnswers() {
  document.querySelectorAll(".liquid-answer-btn").forEach(btn => btn.disabled = true);
}

function validateAnswer() {
  const q = useRandomMode ? currentQuestion : questions[currentIndex];
  const buttons = document.querySelectorAll(".liquid-answer-btn");

  if (selectedAnswer === null) {
    showResultMessage("⚠️ Choisis une réponse avant de valider !");
    return;
  }

  const isCorrect = selectedAnswer === q.correct;

  buttons[selectedAnswer].classList.add(isCorrect ? "correct" : "incorrect");
  buttons[q.correct].classList.add("correct");

  if (isCorrect) {
    score += 100;
    document.getElementById("scoreDisplay").textContent = `${score} 🏆`;

    const existing = bestScores.find(entry => entry.name === playerName);
    if (!existing || score > existing.score) {
      document.getElementById("record").textContent = `${score} 🏆`;
    }

    saveBestScore();
    updateBadge(score);
    playSound("correct");
    showResultMessage("✅ Bonne réponse !");
    document.querySelector(".validate-btn").style.display = "none";
    document.querySelector(".next-btn").style.display = "inline-block";
  } else {
    score = 0;
    document.getElementById("scoreDisplay").textContent = `${score} 🏆`;
    document.getElementById("record").textContent = `${bestScores.find(e => e.name === playerName)?.score || 0} 🏆`;

    showResultMessage("❌ Mauvaise réponse !");
    document.querySelector(".validate-btn").style.display = "none";
    document.querySelector(".next-btn").style.display = "none";
    document.querySelector(".replay-btn").style.display = "inline-block";
  }

  disableAnswers();
  clearInterval(timerInterval);
  clearInterval(tierceInterval);
}

function nextQuestion() {
  if (useRandomMode) {
    loadRandomQuestion();
  } else {
    currentIndex++;
    if (currentIndex >= questions.length) {
      showResultMessage("🎉 Quiz terminé !");
      document.querySelector(".validate-btn").style.display = "none";
      document.querySelector(".next-btn").style.display = "none";
      document.querySelector(".replay-btn").style.display = "inline-block";
      return;
    }
    loadQuestion();
  }
}

function restartQuiz() {
  saveBestScore();
  score = 0;
  currentIndex = 0;
  selectedAnswer = null;

  document.getElementById("scoreDisplay").textContent = `${score} 🏆`;
  document.getElementById("record").textContent = `${bestScores.find(e => e.name === playerName)?.score || 0} 🏆`;

  const resultBox = document.getElementById("resultMessage");
  if (resultBox) resultBox.remove();

  document.querySelector(".validate-btn").style.display = "inline-block";
  document.querySelector(".next-btn").style.display = "none";
  document.querySelector(".replay-btn").style.display = "none";

  shuffleQuestions();

  if (useRandomMode) {
    remainingQuestions = [...questions];
    loadRandomQuestion();
  } else {
    loadQuestion();
  }
}

function updateBadge(score) {
  let badge = "";
  if (score >= 1500) badge = "🥇 Hokage";
  else if (score >= 1000) badge = "🥈 Ninja d'élite";
  else if (score >= 500) badge = "🥉 Chuunin confirmé";
  else badge = "👶 Genin débutant";

  document.getElementById("badgeDisplay").textContent = badge;
}

function saveBestScore() {
  if (!playerName) return;
  const existing = bestScores.find(entry => entry.name === playerName);
  if (!existing) {
    bestScores.push({ name: playerName, score });
  } else if (score > existing.score) {
    existing.score = score;
  }
  localStorage.setItem("shinobiScores", JSON.stringify(bestScores));
}

function exportScores() {
  const csv = bestScores.map((entry, i) =>
    `${i + 1},${entry.name},${entry.score}`
  ).join("\n");

  const blob = new Blob(["Rang,Identifiant,Score\n" + csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "meilleurs_scores.csv";
  link.click();
}

function goToScorePage() {
  saveBestScore();
  document.getElementById("quizPage").style.display = "none";
  document.getElementById("scorePage").style.display = "flex";

  const body = document.getElementById("scoreBody");
  body.innerHTML = "";

  bestScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 30)
    .forEach((entry, index) => {
      let badge = "";
      if (index === 0) badge = "🥇 Hokage";
      else if (index === 1) badge = "🥈 Ninja d'élite";
      else if (index === 2) badge = "🥉 Chuunin confirmé";

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry.name}</td>
        <td>${entry.score} 🏆</td>
        <td>${badge}</td>
      `;
      body.appendChild(row);
    });
}

function returnToQuiz() {
  document.getElementById("scorePage").style.display = "none";
  document.getElementById("quizPage").style.display = "block";
}

function openAboutModal() {
  document.getElementById("aboutModal").style.display = "flex";
}

function closeAboutModal() {
  document.getElementById("aboutModal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  checkReturningPlayer();
});
