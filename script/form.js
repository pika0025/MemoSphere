console.log(window.localStorage.getItem("fiche"));
console.log(JSON.parse(window.localStorage.getItem("fiche")));

const btn = document.getElementById("t");
btn.addEventListener("click", () => {
  window.localStorage.clear();
});

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

dateLimiteDevoirs();

//met la date du champ dateLimiteDevoirs a J+1
function dateLimiteDevoirs() {
  const champDateLimiteDevoir = document.getElementById(
    "form-date-limite-devoir"
  );
  if (champDateLimiteDevoir) {
    champDateLimiteDevoir.value = `${annee}-${mois}-${String(jour + 1).padStart(
      2,
      "0"
    )}`;
  }
}

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
function afficherElementNotion() {
  const listeNotion = document.querySelector(".liste-notions");
  listeNotion.innerHTML = "";

  notion.forEach((n, index) => {
    const paragraphe = document.createElement("p");
    paragraphe.textContent = `${n.nom} : ${n.def} `;

    const btnSuppression = document.createElement("button");
    btnSuppression.textContent = "supprimer la notion";
    btnSuppression.addEventListener("click", () => {
      notion.splice(index, 1);
      console.log(notion);
      afficherElementNotion();
    });

    listeNotion.appendChild(paragraphe);
    paragraphe.appendChild(btnSuppression);
  });
}

// Données internes
const notion = [];

// Ajout d'un EventListener au btn aujouter notion lui permettant de remplir sa fonction
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
    afficherElementNotion();

    // Vide les champs
    champNom.value = "";
    champDef.value = "";

    console.log(notion);
  } catch (erreur) {
    afficherMessageErreur(erreur.message, "notion");
  }
});

// Crée un paragraphe affichant un devoirs avec un bouton de suppression
function creerElementDevoirs() {
  const listeDevoirs = document.querySelector(".liste-devoirs");
  listeDevoirs.innerHTML = "";

  tableauDevoirs.forEach((n, index) => {
    let [annee, mois, jour] = n.dateLimite.split("-");
    let dateLimiteAffiche = `${jour}-${mois}`;

    const paragraphe = document.createElement("p");
    paragraphe.textContent = `${n.devoirsContent} a faire pour le ${dateLimiteAffiche} `;

    const boutonSuppression = document.createElement("button");
    boutonSuppression.textContent = "supprimer le devoirs";

    boutonSuppression.addEventListener("click", () => {
      tableauDevoirs.splice(index, 1);
      console.log(tableauDevoirs);
      creerElementDevoirs();
    });

    listeDevoirs.appendChild(paragraphe);
    paragraphe.appendChild(boutonSuppression);
  });
}

// Données internes
const tableauDevoirs = [];

// Ajout d'un EventListener au btn aujouter devoir lui permettant de remplir sa fonction
const btnAjouterDevoirs = document.getElementById("btn-ajouter-devoirs");
btnAjouterDevoirs.addEventListener("click", () => {
  try {
    const champDevoirs = document.getElementById("devoirs");
    const champDateLimite = document.getElementById("form-date-limite-devoir");
    const champDatePerso = document.getElementById(
      "form-rappel-personalise-devoirs"
    );
    const btnRappelerDevoirs = document.getElementById(
      "form-rappel-auto-devoirs"
    );

    verifierChamp(champDevoirs);
    afficherMessageErreur("", "devoirs"); // Nettoie l'éventuelle erreur précédente

    const devoirsContent = champDevoirs.value.trim();
    const dateLimite = champDateLimite.value.trim();
    const datePerso = champDatePerso.value.trim();
    const RappelAutomatique = btnRappelerDevoirs.checked;

    // Enregistre le devoirs
    tableauDevoirs.push({
      devoirsContent,
      dateLimite,
      datePerso,
      RappelAutomatique,
    });

    //Crée l'affichage du devoir
    creerElementDevoirs();

    // Vide les champs
    champDevoirs.value = "";
    dateLimiteDevoirs();
    champDatePerso.value = "";
    btnRappelerDevoirs.checked = true;

    console.log(tableauDevoirs);
  } catch (erreur) {
    afficherMessageErreur(erreur.message, "devoirs");
  }
});

function creerElementFiche() {
  const listeFiche = document.querySelector(".liste-fiche");
  listeFiche.innerHTML = "";
  tableauFiche.sort(function (a, b) {
        return Date.parse(b.date) - Date.parse(a.date);
    });

  // Si le tableau est vide, on affiche un message et on arrête la fonction
  if (tableauFiche.length === 0) {
    const message = document.createElement("p");
    message.textContent = "Aucune fiche disponible.";
    listeFiche.appendChild(message);
    return;
  }

  // Sinon, on parcourt les fiches
  tableauFiche.forEach((n, index) => {
    // Formatage de la date (AAAA-MM-JJ → JJ-MM-AAAA)
    let [annee, mois, jour] = n.date.split("-");
    let dateAffiche = `${jour}-${mois}-${annee}`;

    // Création des éléments
    const divFiche = document.createElement("div");
    const titre = document.createElement("h3");
    titre.textContent = n.titre;

    const paragraphe = document.createElement("p");
    paragraphe.textContent = `${n.matiere}, ${n.chapitre}, ${dateAffiche}`;

    const boutonSuppression = document.createElement("button");
    boutonSuppression.textContent = "Supprimer la fiche";

    // Action du bouton de suppression
    boutonSuppression.addEventListener("click", () => {
      tableauFiche.splice(index, 1);
      window.localStorage.setItem("fiche", JSON.stringify(tableauFiche));
      console.log(tableauFiche);
      creerElementFiche();
    });

    // Ajout dans le DOM
    listeFiche.appendChild(divFiche);
    divFiche.appendChild(titre);
    divFiche.appendChild(paragraphe);
    paragraphe.appendChild(boutonSuppression);
  });
}
const tableauFiche = JSON.parse(window.localStorage.getItem("fiche")) || [];

creerElementFiche();

//Enregistrement du formulaire
const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const getVal = (id) => document.getElementById(id)?.value.trim() || "";
  const getCheck = (id) => document.getElementById(id)?.checked || false;

  tableauFiche.push({
    titre: getVal("form-titre"),
    matiere: getVal("form-matiere"),
    chapitre: getVal("form-chapitre"),
    date: document.getElementById("date")?.value || "",
    notion, // suppose que cette variable existe déjà dans ton code
    contenu: getVal("form-contenu"),
    ressource: getVal("form-ressource"),
    tableauDevoirs, // suppose que cette variable existe déjà aussi
    nvComprehension: getVal("form-nv-comprehension"),
    important: getCheck("form-important"),
    a_revoir: getCheck("form-a-revoir"),
  });

  window.localStorage.setItem("fiche", JSON.stringify(tableauFiche));
  creerElementFiche();
  console.log(JSON.stringify(tableauFiche));
  console.log(tableauFiche);
});
