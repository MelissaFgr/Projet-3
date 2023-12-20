async function afficherWorks() {
    let résultat = await fetch("http://localhost:5678/api/works"); 
    let données = await résultat.json();
    
    for (let i = 0; i < données.length; i++) {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const titre = document.createElement ("figcaption");

        image.src = données[i].imageUrl;
        titre.textContent = données[i].title;
        
        figure.appendChild(image);
        figure.appendChild(titre);

        document.querySelector(".gallery").appendChild(figure);
    }

    let boutonFiltre = document.getElement ("boutonFiltre");
    boutonFiltre.addEventListener("click", function(event) {
        let valeurBouton = event.target.value;
            for(let j = 0; j < données.length; j++) {
                if(valeurBouton != données[j].categoryId) {
                    figure.classlist.add("displayNone");
                }else {
                    figure.classlist.remove("displayNone");
                }
            }
    })
}
  

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

