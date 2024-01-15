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
        figureworks.classList.add("figureImage", data[i].id);
 
        figureworks.appendChild(image);
        figureworks.appendChild(title);
 
        document.querySelector(".gallery").appendChild(figureworks);
    }
 
//Fonction filtrage   
let buttonfilter = document.querySelector(".filtered");
const figuresFilter = document.querySelectorAll(".figureImage");
 
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
        button.value = data[i].id;
 
        document.querySelector(".filtered").appendChild(button);
    }
}
 
function hideLink(link) {
            link.classList.add("display-none");
}
 
function showLink(link) {
            link.classList.remove("display-none");
 
}
 
function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}
 
//Suppression d'un projet
function deleteProject(parentID, tokenUser){
    fetch(`http://localhost:5678/api/works/${parentID}`, { 
        method: 'DELETE', 
        headers:{
            'Authorization': `Bearer ${tokenUser}`
        }
    })
        .then(response => {
            if (response.ok) {
                let delFigureModale = document.getElementById(`${parentID}`);
                let delFigureGallery = document.getElementsByClassName(`${parentID}`);
                delFigureModale.parentNode.removeChild(delFigureModale);
                delFigureGallery[0].parentNode.removeChild(delFigureGallery[0]);
                console.log(`Projet ${parentID} supprimé`);
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}
 
function processWorks(){
    const delButtons = document.getElementsByClassName("deleteButton")
 
    for(var i=0;i<delButtons.length;i++){
        delButtons[i].addEventListener("click", function(){
           var parentID = this.parentNode.id;
            deleteProject(parentID,userToken);
        });
    }
}
 
//Afficher tous les projets dans la modale
async function displayModalGallery() {
    let result = await fetch("http://localhost:5678/api/works"); 
    let data = await result.json();
 
    for (let i = 0; i < data.length; i++) {
        let figureworks = document.createElement("figure");
        let image = document.createElement("img");
        let delButton = document.createElement("a");
        let delImage = document.createElement("i");
 
        image.src = data[i].imageUrl;
        delButton.classList.add("deleteButton");
        delImage.classList.add("fa-solid", "fa-trash-can", "fa-2xs");
        figureworks.setAttribute('id',data[i].id);
        delButton.appendChild(delImage);
        figureworks.appendChild(image);
        figureworks.appendChild(delButton);
 
        document.querySelector("#modalGallery").appendChild(figureworks);
    }
    processWorks();
}
 
//Afficher et fermer la modale
function openModal(){
    const modalOverlay = document.getElementById("modal-overlay");
    const modalWindow = document.getElementById("modal-window");
 
    showLink(modalOverlay);
    showLink(modalWindow);
}
 
function closeModal(){
    const modalOverlay = document.getElementById("modal-overlay");
    const modalWindow = document.getElementById("modal-window");
 
    hideLink(modalOverlay);
    hideLink(modalWindow);
}
 
 
async function displayCategoriesAddProject() {
    let result = await fetch("http://localhost:5678/api/categories"); 
    let data = await result.json();
 
    for (let i = 0; i < data.length; i++) {
        let option = document.createElement("option");
 
        option.textContent = data[i].name;
        option.value = data[i].id;
 
        document.querySelector("#menuCategory").appendChild(option);
    }
}
 
function sendNewProject(formData,userToken){
 
    fetch("http://localhost:5678/api/works", { 
        method: 'POST',
        headers:{
            'Authorization': `Bearer ${userToken}`
        },
        body: formData
    })
    .then(response => response.json())
    .then(data =>{
        // Ajout du nouveau projet dans la modalGallery
        let figureworksModal = document.createElement("figure");
        let imageModal = document.createElement("img");
        let delButton = document.createElement("a");
        let delImage = document.createElement("i");
        imageModal.src = data.imageUrl;
        delButton.classList.add("deleteButton");
        delImage.classList.add("fa-solid", "fa-trash-can", "fa-2xs");
        figureworksModal.setAttribute('id',data.id);
        delButton.appendChild(delImage);
        figureworksModal.appendChild(imageModal);
        figureworksModal.appendChild(delButton);
 
        document.querySelector("#modalGallery").appendChild(figureworksModal);
 
        // Ajout du nouveau projet dans la galerie classique
        let figureworks = document.createElement("figure");
        let image = document.createElement("img");
        let title = document.createElement ("figcaption");
 
        image.src = data.imageUrl;
        title.textContent = data.title;
        figureworks.setAttribute('id',data.categoryId);
        figureworks.classList.add("figureImage",data.id);
 
        figureworks.appendChild(image);
        figureworks.appendChild(title);
 
        document.querySelector(".gallery").appendChild(figureworks);
    })
    .then(event => {
        processWorks();
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
}

function disabledSubmit(inputSubmit) {
    inputSubmit.classList.add("disabled");
}

function enableSubmit(enableSubmit) {
    enableSubmit.classList.remove("disabled");
}