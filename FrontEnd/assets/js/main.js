const logoutLink = document.getElementById("linkLogout");
const loginLink = document.getElementById("linkLogin");
const editButton = document.getElementById("editButton");
const closeModalButton = document.getElementById("closeModalButton");
const editModeLine = document.getElementById("editMode");
const header = document.querySelector("header");
const modalOverlay = document.getElementById("modal-overlay");
const tokenUser = localStorage.getItem("token");
const nextInput = document.getElementById("nextInput");
const submitProject = document.getElementById("submitProject");
const titleGalleryModal = document.getElementById("titleGalleryModal");
const titleAddProject = document.getElementById("titleAddProject");
const containerAddProject = document.getElementById("containerAddProject");
const returnGalleryModal = document.getElementById("returnGalleryModal");
const modalGallery = document.getElementById("modalGallery");
const fileUpload = document.getElementById("fileUpload");
const inputTitle = document.getElementById("inputTitle");
const menuCategory = document.getElementById("menuCategory");
const formulaireData = new FormData();
 
 
displayCategories()
displayWorks()
displayCategoriesAddProject()
 
if (localStorage.getItem("token")) {
    hideLink(loginLink);
    showLink(logoutLink);
    showLink(editButton);
    showLink(editModeLine);
 
    header.style.marginTop = '97px';
 
    displayModalGallery()
 
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
 
    nextInput.addEventListener("click",function(){
        hideLink(titleGalleryModal);
        hideLink(modalGallery);
        hideLink(nextInput);
        showLink(titleAddProject);
        showLink(returnGalleryModal);
        showLink(containerAddProject);
        showLink(submitProject);
    })
 
    returnGalleryModal.addEventListener("click", function(){
        showLink(titleGalleryModal);
        showLink(modalGallery);
        showLink(nextInput);
        hideLink(titleAddProject);
        hideLink(returnGalleryModal);
        hideLink(containerAddProject);
        hideLink(submitProject); 
    })
 
    submitProject.addEventListener("click",function(){
 
        formulaireData.append("image",fileUpload.files[0]);
        formulaireData.append("title",inputTitle.textContent);
        formulaireData.append("category",menuCategory.value);
 
        sendNewProject(formulaireData,tokenUser);
    })
 
} else {
    hideLink(logoutLink);
    hideLink(editButton);
    hideLink(editModeLine);
    showLink(loginLink);
}
 