//Récupère les infos de chaque projets via l'API pour en afficher l'image et le titre  
async function displayWorks() {
    let result = await fetch("http://localhost:5678/api/works"); 
    let data = await result.json();
    
    for (let i = 0; i < data.length; i++) {
        let figureworks = document.createElement("figure");
        let image = document.createElement("img");
        let title = document.createElement ("figcaption");

        image.src = data[i].imageUrl;
        title.textContent = data[i].title;
        figureworks.setAttribute('id',data[i].categoryId);
        
        figureworks.appendChild(image);
        figureworks.appendChild(title);

        document.querySelector(".gallery").appendChild(figureworks);
    }

//Fonction filtrage   
let buttonfilter = document.querySelector(".filtered");
const figuresFilter = document.querySelectorAll("figure");
 
buttonfilter.addEventListener("click", function (event) {
    let valeurButton = event.target.value;
    console.log(valeurButton);
 
    for (let j = 0; j < figuresFilter.length; j++) {
        let figures = figuresFilter[j];
 
        let figureId = figures.id;
 
        if (valeurButton === "Tous" || valeurButton === figureId) {
            figures.style.display = "inline-block";
        } else {
            figures.style.display = "none";
        }
    }
});
}
  
//Récupère les catégories via l'API et création des boutons
async function displayCategories() {
    let result = await fetch("http://localhost:5678/api/categories"); 
    let data = await result.json();

    for (let i = 0; i < data.length; i++) {
        let button = document.createElement("button");

        button.textContent = data[i].name;
        button.value = data [i].id;

        document.querySelector(".filtered").appendChild(button);
    }
}

function hideLink(links) {
    links.forEach(link => {
        link.classList.add("display-none");
    })
}

function showLink(links) {
    links.forEach(link => {
        link.classList.remove("display-none");
    })
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

async function displayModalGallery() {
    let result = await fetch("http://localhost:5678/api/works"); 
    let data = await result.json();
    
    for (let i = 0; i < data.length; i++) {
        let figureworks = document.createElement("figure");
        let image = document.createElement("img");
        let title = document.createElement ("figcaption");

        image.src = data[i].imageUrl;
        title.textContent = data[i].title;
        figureworks.setAttribute('id',data[i].categoryId);
        
        figureworks.appendChild(image);
        figureworks.appendChild(title);

        document.querySelector("#modal-gallery").appendChild(figureworks);
    }
}

function openModal(){
    const modalwindow = document.getElementsById("modal-window");

    showLink(modalwindow);
    displayModalGallery();


}



