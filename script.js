let STEP = 1;
const WEBHOOK = "https://discord.com/api/webhooks/1447005556635209899/tb29lQPMnF47DCR1w2BqQzXujui3qYhEVsY45GhJ9726gvlNfhTQ5cWSuwMXNZGHjgCy";
const ROLE_ID = "1446471808743243987";
const ADMIN_CODE = "Glastontop1234";
const WHITELIST_IP = "91.174.237.40";

// ====================
// SYSTÈME D'ÉTAPES
// ====================
function nextStep() {
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";
}

function prevStep() {
  document.getElementById("step2").style.display = "none";
  document.getElementById("step1").style.display = "block";
}

// ====================
// RÉCUP IP
// ====================
async function getIP() {
  try {
    const r = await fetch("https://api.ipify.org?format=json");
    const j = await r.json();
    return j.ip;
  } catch {
    return "UNKNOWN";
  }
}

// ====================
// COOLDOWN 24H
// ====================
function canSend(ip) {
  if (ip === WHITELIST_IP) return true;

  const last = localStorage.getItem("lastSend");
  if (!last) return true;

  const diff = Date.now() - Number(last);
  return diff > 86400000; // 24h
}

function saveCooldown(ip) {
  if (ip !== WHITELIST_IP) {
    localStorage.setItem("lastSend", Date.now());
  }
}

// ====================
// ENVOI FORMULAIRE
// ====================
async function sendForm() {
  const ip = await getIP();
  const status = document.getElementById("status");

  if (!canSend(ip)) {
    status.textContent = "⛔ Vous avez déjà envoyé une candidature. Réessayez dans 24h.";
    return;
  }

  // Récupération données
  const data = {
    irl: document.getElementById("irl").value,
    discord: document.getElementById("discord").value,
    prenom: document.getElementById("prenom").value,
    age: document.getElementById("age").value,
    dispos: document.getElementById("dispos").value,
    categorie: document.getElementById("categorie").value,
    motivations: document.getElementById("motivations").value,
    why: document.getElementById("why").value,
    qualites: document.getElementById("qualites").value,
    definition: document.getElementById("definition").value,
    experience: document.getElementById("experience").value,
    extra: document.getElementById("extra").value,
    ip
  };

  // Sauvegarde pour admin
  let list = JSON.parse(localStorage.getItem("candidatures") || "[]");
  list.push(data);
  localStorage.setItem("candidatures", JSON.stringify(list));

  // EMBED
  const embed = {
    content: `<@&${ROLE_ID}> Nouvelle candidature reçue !`,
    embeds: [
      {
        title: "📋 Nouvelle Candidature Staff - Glast",
        color: 16711680,
        fields: [
          { name:"👤 Présentation IRL", value: data.irl || "Aucune", inline:false },
          { name:"💬 Discord", value: data.discord, inline:true },
          { name:"🧑 Prénom", value: data.prenom, inline:true },
          { name:"🎂 Âge", value: data.age + " ans", inline:true },

          { name:"⏰ Disponibilités", value:data.dispos, inline:false },

          { name:"📌 Categorie", value:data.categorie, inline:true },
          { name:"🔥 Motivations", value:data.motivations, inline:false },
          { name:"🔍 Pourquoi lui ?", value:data.why, inline:false },
          { name:"⭐ Qualités", value:data.qualites, inline:false },
          { name:"📘 Définition du rôle", value:data.definition, inline:false },
          { name:"🏆 Expérience", value:data.experience, inline:false },
          { name:"➕ Extra", value:data.extra || "Aucun", inline:false },

          { name:"🌐 IP", value:"`" + data.ip + "`", inline:true }
        ],
        footer:{ text:"Système Glast — Candidature envoyée" }
      }
    ]
  };

  await fetch(WEBHOOK, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify(embed)
  });

  saveCooldown(ip);
  status.style.color = "#4fff4f";
  status.textContent = "✔️ Votre candidature a été envoyée avec succès !";
}

// ====================
// PANEL ADMIN
// ====================
function openAdmin() {
  const code = prompt("Entrez le code admin :");

  if (code !== ADMIN_CODE) {
    alert("Code incorrect.");
    return;
  }

  const panel = document.getElementById("adminPanel");
  const list = JSON.parse(localStorage.getItem("candidatures") || "[]");

  panel.innerHTML = "<h2>📂 Candidatures enregistrées</h2>";

  if (list.length === 0) {
    panel.innerHTML += "<p>Aucune candidature encore.</p>";
  }

  list.forEach(c => {
    panel.innerHTML += `
      <div class="admin-entry">
        <strong>${c.discord}</strong><br>
        <strong>IP :</strong> ${c.ip}<br>
        <strong>Categorie :</strong> ${c.categorie}<br>
        <strong>Motivations :</strong> ${c.motivations}<br>
      </div>
    `;
  });

  panel.style.display = "block";
}
