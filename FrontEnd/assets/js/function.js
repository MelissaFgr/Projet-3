//Récupère les infos de chaque projets via l'API pour en afficher l'image et le titre  
async function displayWorks() {
    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        // Action pour chacun des projets remonté par l'API : Création d'un container, d'une image et d'un titre
        data.forEach(project =>{
            let figureworks = document.createElement("figure");
            let image = document.createElement("img");
            let title = document.createElement ("figcaption");
     
            image.src = project.imageUrl;
            title.textContent = project.title;
            // Ajout de l'ID de la catégorie, ainsi que l'ID du projet
            figureworks.setAttribute('id',project.categoryId);
            figureworks.classList.add("figureImage", project.id);
     
            figureworks.appendChild(image);
            figureworks.appendChild(title);
     
            document.querySelector(".gallery").appendChild(figureworks);
        })
    
    //Fonction filtrage   
    const buttonfilter = document.querySelector(".filtered");
    const figuresFilter = document.querySelectorAll(".figureImage");
    console.log(figuresFilter)
     
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
    })
    .catch(error => {
        console.log("dans le catch")
        console.error('Erreur !', error);
    })
    }
     
    //Récupère les catégories via l'API et création des boutons
    async function displayCategories() {
        await fetch("http://localhost:5678/api/categories") 
        .then(response => response.json())
        .then(data => {
            data.forEach(category => {
                let button = document.createElement("button");
         
                button.textContent = category.name;
                button.value = category.id;
         
                document.querySelector(".filtered").appendChild(button);
            })
        })
        .catch(error =>{
            console.error('Erreur !', error);
        })
    }

    //Afficher ou cacher le contenu selon les choix de navigation
    function hideLink(links) {
        links.forEach(link=>{
            link.classList.add("display-none");
        })
    }
    
    function showLink(links) {
        links.forEach(link=>{
            link.classList.remove("display-none");
        })
    }
    
    //Déconnecte l'utilisateur
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
                }
            })
            .catch(error => {
                console.error('Erreur !', error);
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
        fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(data => {
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
        })
        .catch(error => {
            console.error('Erreur !', error);
        })
    }
    
    //Afficher et fermer la modale
    function openModal(){
        const modalOverlay = document.getElementById("modal-overlay");
        const modalWindow = document.getElementById("modal-window");
        let arrayShow = [modalOverlay,modalWindow];
    
        showLink(arrayShow);
    }
     
    function closeModal(){
        const modalOverlay = document.getElementById("modal-overlay");
        const modalWindow = document.getElementById("modal-window");
        let arrayHide = [modalOverlay,modalWindow];
     
        hideLink(arrayHide);
    }  
    
    //Menu déroulant dans la modale
    async function displayCategoriesAddProject() {
        await fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let option = document.createElement("option");
         
                option.textContent = data[i].name;
                option.value = data[i].id;
         
                document.querySelector("#menuCategory").appendChild(option);
            }
        })
        .catch(error => {
            console.error('Erreur !', error);
        })
    }
    
    //Ajout et création d'un nouveau projet dans la galerie et la modale
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
            console.error('Erreur !', error);
        });
    }
    
    //Désactiver et activer le bouton valider de la modale
    function disabledSubmit(inputSubmit) {
        inputSubmit.classList.add("disabled");
    }
    
    function enableSubmit(inputSubmit) {
        inputSubmit.classList.remove("disabled");
    }