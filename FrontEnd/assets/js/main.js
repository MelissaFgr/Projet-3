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

    document.addEventListener("DOMContentLoaded", function(){
        const delButtons = document.getElementsByClassName("deleteButton")
        console.log(delButtons);
        console.log(delButtons.length);
    
        for(var i=0;i<delButtons.length;i++){
            console.log(delButtons[i]);
            delButtons[i].addEventListener("click", function(){
                console.log("Après le addeventlistener");
               var parentID = this.parentNode.id;
                deleteProject(parentID,tokenUser);
            });
        }
    });
    

} else {
    hideLink(logoutLink);
    hideLink(editButton);
    hideLink(editModeLine);
    showLink(loginLink);
}






