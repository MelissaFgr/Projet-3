const logoutLink = document.getElementById("linkLogout");
const loginLink = document.getElementById("linkLogin");
const editButton = document.getElementById("editButton");
const closeModalButton = document.getElementById("closeModalButton");
const editModeLine = document.getElementById("editMode");
const header = document.querySelector("header");
const modalOverlay = document.getElementById("modal-overlay");
const tokenUser = localStorage.getItem("token");



displayCategories()
displayWorks()

//Authentification de l’utilisateur + modale
if (localStorage.getItem("token")) {
    hideLink(loginLink);
    showLink(logoutLink);
    showLink(editButton);
    showLink(editModeLine);

    header.style.marginTop = '97px';

    displayModalGallery();

    logoutLink.addEventListener("click", function(){
        logout();
    })

    editButton.addEventListener("click", function(){
        openModal();
    })

    closeModalButton.addEventListener("click", function(){
        closeModal();
    })

    modalOverlay.addEventListener("click", function(){
        closeModal();
    })

    /* début fonction suppression, ne fonctionne pas / récupération des boutons impossible sauf si 1 par 1 /
    si 1 par 1, addEventListenet ne fonctionne pas

    var deleteButton = document.getElementsByClassName("deleteButton");
    deleteButton.forEach(function(element) {
        element.addEventListener("click", function(event){
            var parentID = event.target.parentNode.id;
            deleteProject(parentID, tokenUser);
            console.log(deleteProject);
        })
    });

    --

    async function recupbutton(){
        console.log("Dans la fonction recup")
        
        return deleteButton
    }
       var delButton = recupbutton();
        var arrayFromNodeList = Array.from(delButton);
        console.log(arrayFromNodeList);

    let deleteButton = document.getElementsByClassName("deleteButton0");
    deleteButton.forEach(function(element){
        console.log("Après le foreach");
        console.log(deleteButton);
        deleteButton.addEventListener("click", function(){
            console.log("Après le addeventlistener");
           var parentID = event.target.parentNode.id;
            deleteProject(parentID,tokenUser);
        })
    });*/

} else {
    hideLink(logoutLink);
    hideLink(editButton);
    hideLink(editModeLine);
    showLink(loginLink);
}






