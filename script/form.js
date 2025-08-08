//génére la date automatiquement
document.addEventListener("DOMContentLoaded", () => {
  const date = new Date();

  const jour = date.getDate();
  const mois = String(date.getMonth() + 1).padStart(2, "0"); // Janvier = 0 → donc +1
  const annee = date.getFullYear();

  const valeurDate = `${annee}-${mois}-${String(jour).padStart(2, "0")}`; // Format ISO pour input[type="date"]

  const champDate = document.getElementById("date");
  if (champDate) {
    champDate.value = valeurDate;
  }

  const champDateLimiteDevoir = document.getElementById(
    "form-date-limite-devoir"
  );
  if (champDateLimiteDevoir) {
    champDateLimiteDevoir.value = `${annee}-${mois}-${String(jour + 1).padStart(2,"0")}`;
  }
});

// Vérifie si un champ est vide
function verifierChamp(champ) {
  if (champ.value.trim() === "") {
    throw new Error(`Le champ ${champ.id} est vide`);
  }
}

// Affiche un message d'erreur (ou le retire si vide)
function afficherMessageErreur(message, emplacementErreur) {
  let spanMessageErreur = document.getElementById("messageErreur");
  let emplacement = document.querySelector(`.${emplacementErreur}`);

  if (!spanMessageErreur) {
    spanMessageErreur = document.createElement("p");
    spanMessageErreur.id = "messageErreur";
    spanMessageErreur.style.color = "red"; // optionnel
    emplacement.appendChild(spanMessageErreur);
  }
  
  emplacement.appendChild(spanMessageErreur);
  spanMessageErreur.textContent = message;
}

// Crée un paragraphe affichant une notion avec un bouton de suppression
function creerElementNotion(nom, def, index) {
  const paragraphe = document.createElement("p");
  paragraphe.textContent = `${nom} : ${def} `;

  const boutonSuppression = document.createElement("input");
  boutonSuppression.type = "button";
  boutonSuppression.value = "supprimer la notion";

  boutonSuppression.addEventListener("click", () => {
    paragraphe.remove();
    notion.splice(index, 1);
    console.log(notion);
  });

  paragraphe.appendChild(boutonSuppression);
  return paragraphe;
}

// Données internes
const notion = [];

const btnAjouterNotion = document.getElementById("ajouter-notion");
btnAjouterNotion.addEventListener("click", () => {
  try {
    const champNom = document.getElementById("nom");
    const champDef = document.getElementById("def");

    verifierChamp(champNom);
    verifierChamp(champDef);
    afficherMessageErreur(""); // Nettoie l'éventuelle erreur précédente

    const nom = champNom.value.trim();
    const def = champDef.value.trim();

    // Enregistre la notion
    notion.push({ nom, def });

    // Crée l'affichage de la notion
    const listeNotion = document.querySelector(".liste-notions");
    const nouvelleNotion = creerElementNotion(nom, def, notion.length - 1);
    listeNotion.appendChild(nouvelleNotion);

    // Vide les champs
    champNom.value = "";
    champDef.value = "";

    console.log(notion);
  } catch (erreur) {
    afficherMessageErreur(erreur.message);
  }
});
