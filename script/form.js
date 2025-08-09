//génére la date automatiquement
  const date = new Date();

  const jour = date.getDate();
  const mois = String(date.getMonth() + 1).padStart(2, "0"); // Janvier = 0 → donc +1
  const annee = date.getFullYear();

  const valeurDate = `${annee}-${mois}-${String(jour).padStart(2, "0")}`; // Format ISO pour input[type="date"]

  const champDate = document.getElementById("date");
  if (champDate) {
    champDate.value = valeurDate;
  }

  dateLimiteDevoirs()

  function dateLimiteDevoirs(){
  const champDateLimiteDevoir = document.getElementById(
    "form-date-limite-devoir"
  );
  if (champDateLimiteDevoir) {
    champDateLimiteDevoir.value = `${annee}-${mois}-${String(jour + 1).padStart(2,"0")}`;
  }}

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
    afficherMessageErreur("", "notion"); // Nettoie l'éventuelle erreur précédente

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
    afficherMessageErreur(erreur.message, "notion");
  }
});

// Crée un paragraphe affichant un devoirs avec un bouton de suppression
function creerElementDevoirs(dateLimite, devoirsContent, index) {
  let [annee,mois, jour] = dateLimite.split("-")
  let dateLimiteAffiche = `${jour}-${mois}`
  
  const paragraphe = document.createElement("p");
  paragraphe.textContent = `${devoirsContent} a faire pour le ${dateLimiteAffiche} `;

  const boutonSuppression = document.createElement("input");
  boutonSuppression.type = "button";
  boutonSuppression.value = "supprimer le devoirs";

  boutonSuppression.addEventListener("click", () => {
    paragraphe.remove();
    tableauDevoirs.splice(index, 1);
    console.log(tableauDevoirs);
  });

  paragraphe.appendChild(boutonSuppression);
  return paragraphe;
}

// Données internes
const tableauDevoirs = [];

const btnAjouterDevoirs = document.getElementById("btn-ajouter-devoirs");
btnAjouterDevoirs.addEventListener("click", () => {
  try {
    const champDevoirs = document.getElementById("devoirs");
    const champDateLimite = document.getElementById("form-date-limite-devoir");
    const champDatePerso = document.getElementById("form-rappel-personalise-devoirs")
    const btnRappelerDevoirs = document.getElementById("form-rappel-auto-devoirs")

    verifierChamp(champDevoirs);
    afficherMessageErreur("", "devoirs"); // Nettoie l'éventuelle erreur précédente

    const devoirsContent = champDevoirs.value.trim();
    const dateLimite = champDateLimite.value.trim();
    const datePerso = champDatePerso.value.trim();
    const RappelAutomatique = btnRappelerDevoirs.checked

    // Enregistre le devoirs
    tableauDevoirs.push({ devoirsContent,dateLimite,datePerso,RappelAutomatique});

    //Crée l'affichage du devoir
    const listeDevoirs = document.querySelector(".liste-devoirs");
    const nouveauDevoirs = creerElementDevoirs(dateLimite, devoirsContent, tableauDevoirs.length - 1);
    listeDevoirs.appendChild(nouveauDevoirs);
    
    // Vide les champs
    champDevoirs.value = "";
    dateLimiteDevoirs()
    champDatePerso.value = "";
    btnRappelerDevoirs.checked = true

    console.log(tableauDevoirs);
  } catch (erreur) { 
    afficherMessageErreur(erreur.message, "devoirs");
  }
});