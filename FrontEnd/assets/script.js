//Récupère les infos de chaque projets via l'API pour en afficher l'image et le titre  
async function afficherWorks() {
    let résultat = await fetch("http://localhost:5678/api/works"); 
    let données = await résultat.json();
    
    for (let i = 0; i < données.length; i++) {
        const figureworks = document.createElement("figure");
        const image = document.createElement("img");
        const titre = document.createElement ("figcaption");

        image.src = données[i].imageUrl;
        titre.textContent = données[i].title;
        
        figureworks.appendChild(image);
        figureworks.appendChild(titre);

        document.querySelector(".gallery").appendChild(figureworks);
    }

//Fonction filtrage en cours    
    let boutonFiltre = document.querySelector (".filtered"); //cherche les boutons dans HTML
    const figureFiltre = document.querySelectorAll ("figure"); //cherche toutes les figures dans le HTML
    boutonFiltre.addEventListener("click", function(event) { //écoute des boutons
        let valeurBouton = event.target.value; 
        console.log (valeurBouton)
            for(let j = 0; j < données.length; j++) { //devrait cacher l'image sur Id diff de la valeur du bouton (ne fonctionne pas)
                if(valeurBouton != données[j].categoryId) {
                    figureFiltre.style.display = "none";  // classlist.add("displayNone") - className("displayNone")
                }else {
                    figureFiltre.style.display = "inline-block"; // classlist.remove("displayNone")
                }
            }
    })
}
  
//Récupère les catégories via l'API et création des boutons
async function afficherCategories() {
    let résultat = await fetch("http://localhost:5678/api/categories"); 
    let données = await résultat.json();

    for (let i = 0; i < données.length; i++) {
        const button = document.createElement("button");

        button.textContent = données[i].name;
        button.value = données [i].id;

        document.querySelector(".filtered").appendChild(button);
    }
}

afficherCategories()
afficherWorks()

