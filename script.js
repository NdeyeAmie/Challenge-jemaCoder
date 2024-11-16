const prenomInput = document.getElementById("prenom");
const nomInput = document.getElementById("nom");
const emailInput = document.getElementById("email");
const telephoneInput = document.getElementById("telephone");
const tbody = document.getElementById("tbody");
const form = document.getElementById("form");
const submitButton = document.getElementById("submit");
const editButton = document.getElementById("edit");

// Liste des utilisateurs
let utilisateurs = JSON.parse(localStorage.getItem("utilisateur") || "[]"); // convertion des taches en string vers le type initial(tableau)

let indexEnCoursDeModification = null;

// Afficher les utilisateurs chargés depuis le localStorage
afficherEtudiants();

function ajouterEtudiant(prenom, nom, email, telephone) {
  if (indexEnCoursDeModification === null) {
    
    utilisateurs.push({ prenom, nom, email, telephone });
  } else {
    // Modifie l'utilisateur existant
    utilisateurs[indexEnCoursDeModification] = { prenom,nom,email,telephone,};
    indexEnCoursDeModification = null;
    editButton.style.display = "none"; // Cache le bouton "Modifier"
    submitButton.style.display = "block"; // Affiche le bouton "Ajouter"
  }

// recuperation des elements depuis localStorage sous forme de string
  localStorage.setItem("utilisateur", JSON.stringify(utilisateurs));

  afficherEtudiants();
  form.reset();
}

function afficherEtudiants() {
  tbody.innerHTML = "";
  utilisateurs.forEach((utilisateur, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${utilisateur.prenom}</td>
            <td>${utilisateur.nom}</td>
            <td>${utilisateur.email}</td>
            <td>${utilisateur.telephone}</td>
            <td class="text-center">
                <button onclick="modifierEtudiant(${index})" class="btn btn-warning btn-sm">Modifier</button>
                <button onclick="supprimerEtudiant(${index})" class="btn btn-danger btn-sm">Supprimer</button>
            </td>
        `;
    tbody.appendChild(row);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Empêche le rechargement de la page
  const prenom = prenomInput.value.trim();
  const nom = nomInput.value.trim();
  const email = emailInput.value.trim();
  const telephone = telephoneInput.value.trim();
  
  const prenomError = document.getElementById("prenomError");
  const nomError = document.getElementById("nomError");
  const emailError = document.getElementById("emailError");
  const telephoneError = document.getElementById("telephoneError");

  prenomError.style.display = "none";
  nomError.style.display = "none";
  emailError.style.display = "none";
  telephoneError.style.display = "none";
  telephoneError.textContent = "";

  let isValid = true;

  // Vérification du prénom (non vide)
  if (!prenom) {
    prenomError.textContent = "Le prénom est requis.";
    prenomError.style.display = "block";
    isValid = false;
    return;
  }

  if (!nom) {
    nomError.textContent = "Le nom est requis.";
    nomError.style.display = "block";
    isValid = false;
    return;
  }


  // Vérification de l'email (format basique)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailError.textContent = "L'email doit être valide.";
    emailError.style.display = "block";
    isValid = false;
    return;
  }

  const telephoneRegex = /^\d{9}$/;
  if (!telephoneRegex.test(telephone)) {
    telephoneError.textContent = "Le numéro de téléphone doit contenir exactement 9 chiffres.";
    telephoneError.style.display = "block", "";
    return;
  }

  if (prenom && nom && email && telephone) {
    ajouterEtudiant(prenom, nom, email, telephone);
  }
});

function modifierEtudiant(index) {
  const utilisateur = utilisateurs[index];
  prenomInput.value = utilisateur.prenom;
  nomInput.value = utilisateur.nom;
  emailInput.value = utilisateur.email;
  telephoneInput.value = utilisateur.telephone;

//enregistre les modifs dans l localstorage
  localStorage.setItem("utilisateur", JSON.stringify(utilisateurs));
  indexEnCoursDeModification = index;

  
  editButton.style.display = "block";
  submitButton.style.display = "none";
}

function supprimerEtudiant(index) {
  if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
    utilisateurs.splice(index, 1); // Supprime l'utilisateur à l'index

    // Met à jour le localStorage après suppression
    localStorage.setItem("utilisateur", JSON.stringify(utilisateurs));
    afficherEtudiants();
  }
}



