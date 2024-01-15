const logoutLink = document.getElementById("linkLogout");
const loginLink = document.getElementById("linkLogin");
const editButton = document.getElementById("editButton");
const closeModalButton = document.getElementById("closeModalButton");
const editModeLine = document.getElementById("editMode");
const header = document.querySelector("header");
const modalOverlay = document.getElementById("modal-overlay");
const userToken = localStorage.getItem("token");
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
const formData = new FormData();
const types = ["image/jpeg", "image/png"];
const errorMessage = document.getElementById("errorMessage");
const formAddProject = document.getElementById("formAddProject");
const iconUpload = document.getElementById("iconUpload");
const addImageText = document.getElementById("addImageText");
const fileUploadLabel = document.getElementById("fileUploadLabel");
const previewImage = document.getElementById("previewImage")
 
 
displayCategories()
displayWorks()
displayCategoriesAddProject()
 
if (localStorage.getItem("token")) {
    hideLink(loginLink);
    showLink(logoutLink);
    showLink(editButton);
    showLink(editModeLine);
    disabledSubmit(submitProject);
    
 
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
        showLink(formAddProject);
        showLink(submitProject);
    })
 
    returnGalleryModal.addEventListener("click", function(){
        showLink(titleGalleryModal);
        showLink(modalGallery);
        showLink(nextInput);
        hideLink(titleAddProject);
        hideLink(returnGalleryModal);
        hideLink(formAddProject);
        hideLink(submitProject); 
        hideLink(errorMessage);
        showLink(iconUpload); 
        showLink(fileUpload);
        showLink(addImageText);   
        showLink(fileUploadLabel);  
        hideLink(previewImage);  

        document.getElementById("formAddProject").reset();
    })
     
    fileUpload.addEventListener("change", function(event){
        if(!types.includes(event.target.files[0].type)){
            fileUpload.value="";
            showLink(errorMessage);
            disabledSubmit(submitProject);
            
        }else if(inputTitle.value != "" ){
            const imageUP = event.target.files[0];
            hideLink(errorMessage); 
            enableSubmit(submitProject); 
            hideLink(iconUpload); 
            hideLink(fileUpload);
            hideLink(addImageText);   
            hideLink(fileUploadLabel);  
            showLink(previewImage);  
            previewImage.src = URL.createObjectURL(imageUP);  
        }else {
            const imageUP = event.target.files[0];
            hideLink(errorMessage);
            disabledSubmit(submitProject);
            hideLink(iconUpload); 
            hideLink(fileUpload);
            hideLink(addImageText); 
            hideLink(fileUploadLabel);
            showLink(previewImage);
            previewImage.src = URL.createObjectURL(imageUP);
        }           
    })

    inputTitle.oninput=function(){
        if(inputTitle.value != "" && fileUpload.value != ""){
            console.log(fileUpload.value);
            enableSubmit(submitProject);
        }else {
            console.log(fileUpload.value);
            disabledSubmit(submitProject);
        }
    }

    submitProject.addEventListener("click",function(){

        if(inputTitle.value != "" && fileUpload.value != ""){
            formData.append("image",fileUpload.files[0]);
            formData.append("title",inputTitle.value);
            formData.append("category",menuCategory.value);
            
            sendNewProject(formData,userToken);
            
            showLink(titleGalleryModal);
            showLink(modalGallery);
            showLink(nextInput);
            hideLink(titleAddProject);
            hideLink(returnGalleryModal);
            hideLink(formAddProject);
            hideLink(submitProject);
            hideLink(errorMessage);
            
            document.getElementById("formAddProject").reset();
        }else {
        }
    })
 
} else {
    hideLink(logoutLink);
    hideLink(editButton);
    hideLink(editModeLine);
    showLink(loginLink);
}