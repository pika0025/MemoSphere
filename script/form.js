document.addEventListener("DOMContentLoaded", () => {
  const date = new Date();

  const jour = String(date.getDate()).padStart(2, "0");
  const mois = String(date.getMonth() + 1).padStart(2, "0"); // Janvier = 0 → donc +1
  const annee = date.getFullYear();

  const valeurDate = `${annee}-${mois}-${jour}`; // Format ISO pour input[type="date"]

  const champDate = document.getElementById("date");
  if (champDate) {
    champDate.value = valeurDate;
  }
});