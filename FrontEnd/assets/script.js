//Récupère les infos de chaque projets via l'API pour en afficher l'image et le titre  
async function afficherWorks() {
    let resultat = await fetch("http://localhost:5678/api/works"); 
    let donnees = await resultat.json();
    
    for (let i = 0; i < donnees.length; i++) {
        const figureworks = document.createElement("figure");
        const image = document.createElement("img");
        const titre = document.createElement ("figcaption");

        image.src = donnees[i].imageUrl;
        titre.textContent = donnees[i].title;
        figureworks.setAttribute('id',donnees[i].categoryId);
        
        figureworks.appendChild(image);
        figureworks.appendChild(titre);

        document.querySelector(".gallery").appendChild(figureworks);
    }

//Fonction filtrage en cours    
let boutonFiltre = document.querySelector(".filtered");
const figuresFiltre = document.querySelectorAll("figure");
 
boutonFiltre.addEventListener("click", function (event) {
    let valeurBouton = event.target.value;
    console.log(valeurBouton);
 
    for (let j = 0; j < figuresFiltre.length; j++) {
        let figures = figuresFiltre[j];
 
        let figureId = figures.id;
 
        if ( valeurBouton === "Tous" || valeurBouton === figureId) {
            figures.style.display = "inline-block";
        } else {
            figures.style.display = "none";
        }
    }
});
}
  
//Récupère les catégories via l'API et création des boutons
async function afficherCategories() {
    let resultat = await fetch("http://localhost:5678/api/categories"); 
    let donnees = await resultat.json();

    for (let i = 0; i < donnees.length; i++) {
        const button = document.createElement("button");

        button.textContent = donnees[i].name;
        button.value = donnees [i].id;

        document.querySelector(".filtered").appendChild(button);
    }
}

afficherCategories()
afficherWorks()

