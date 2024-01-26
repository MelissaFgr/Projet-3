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
const errorMessage = document.getElementById("errorMessage");
const formAddProject = document.getElementById("formAddProject");
const iconUpload = document.getElementById("iconUpload");
const addImageText = document.getElementById("addImageText");
const fileUploadLabel = document.getElementById("fileUploadLabel");
const previewImage = document.getElementById("previewImage");
const filtered = document.getElementById("filtered");

const types = ["image/jpeg", "image/png"];
const formData = new FormData();
 
displayCategories()
displayWorks()
displayCategoriesAddProject()

//Vérification de la présence du token
if (localStorage.getItem("token")) {
    let arrayShow = [logoutLink,editButton,editModeLine];
    let arrayHide = [loginLink, filtered];
    header.style.marginTop = '97px';

    hideLink(arrayHide);
    showLink(arrayShow);
    disabledSubmit(submitProject);
    displayModalGallery()
 
    logoutLink.addEventListener("click", function(){
        logout();
    })
 
    editButton.addEventListener("click", function(){
        openModal();
    })
    
    //Réinitialise le formulaire de la modale
    closeModalButton.addEventListener("click", function(){
        let arrayShow = [iconUpload,fileUpload,addImageText,fileUploadLabel];
        let arrayHide = [previewImage];

        closeModal();
        showLink(arrayShow);  
        hideLink(arrayHide);

        document.getElementById("formAddProject").reset();
    })
    
    //Ferme la modale quand on clique en dehors du cadre de la modale
    modalOverlay.addEventListener("click", function(){
        let arrayShow = [iconUpload,fileUpload,addImageText,fileUploadLabel];
        let arrayHide = [previewImage];

        closeModal();
        showLink(arrayShow);  
        hideLink(arrayHide);

        document.getElementById("formAddProject").reset();
    })
 
    //Donne accès à l'ajout de projet
    nextInput.addEventListener("click",function(){
        let arrayShow = [titleAddProject,returnGalleryModal,formAddProject,submitProject,fileUpload,addImageText,iconUpload,fileUploadLabel];
        let arrayHide = [titleGalleryModal,modalGallery,nextInput,previewImage];

        hideLink(arrayHide);
        showLink(arrayShow);
    })
    
    //Quitte l'ajout de projet et retourne dans la modale galerie 
    returnGalleryModal.addEventListener("click", function(){
        let arrayShow = [titleGalleryModal,modalGallery,nextInput,iconUpload,fileUpload,addImageText];
        let arrayHide = [titleAddProject,returnGalleryModal,formAddProject,submitProject,errorMessage,previewImage];
        
        showLink(arrayShow);
        hideLink(arrayHide); 

        document.getElementById("formAddProject").reset();
    })
     
    fileUpload.addEventListener("change", function(event){
        //Vérifie si le type et la taille du fichier upload est incorrect
        if(!types.includes(event.target.files[0].type)||event.target.files[0].size > 4*1024*1024){
            let arrayShow = [errorMessage];
            fileUpload.value="";

            showLink(arrayShow);
            disabledSubmit(submitProject);
            
        }else if(inputTitle.value != "" ){
            const imageUP = event.target.files[0];
            let arrayHide = [errorMessage,iconUpload,fileUpload,addImageText,fileUploadLabel];
            let arrayShow = [previewImage];

            hideLink(arrayHide); 
            showLink(arrayShow); 
            enableSubmit(submitProject);  
             
            previewImage.src = URL.createObjectURL(imageUP);  
        }else {
            const imageUP = event.target.files[0];
            let arrayHide = [errorMessage,iconUpload,fileUpload,addImageText,fileUploadLabel]
            let arrayShow = [previewImage];

            hideLink(arrayHide); 
            showLink(arrayShow); 
            disabledSubmit(submitProject);  
             
            previewImage.src = URL.createObjectURL(imageUP);           
        }           
    })

    //Déclenche la fonction à chaque nouvel input dans le champs de texte, vérifie en temps réel le champs texte
    inputTitle.oninput=function(){
        if(inputTitle.value != "" && fileUpload.value != ""){
            enableSubmit(submitProject);
        }else {
            disabledSubmit(submitProject);
        }
    }

    submitProject.addEventListener("click",function(){
        //Vérifie que le champs titre et upload de l'image ne sont pas vides avant de soumettre un projet
        //Le menuCategory est un select et ne peut jamais être vide, aucune vérification à faire
        if(inputTitle.value != "" && fileUpload.value != ""){
            let arrayHide = [titleAddProject,returnGalleryModal,formAddProject,submitProject,errorMessage];
            let arrayShow = [titleGalleryModal,modalGallery,nextInput];

            formData.append("image",fileUpload.files[0]);
            formData.append("title",inputTitle.value);
            formData.append("category",menuCategory.value);
            
            sendNewProject(formData,userToken);
            formData.delete("image");
            formData.delete("title");
            formData.delete("category");

            fileUpload.value="";
                
            showLink(arrayShow);
            hideLink(arrayHide);
            
            document.getElementById("formAddProject").reset();
        }else {
        }
    })
 
} else {
    let arrayHide = [logoutLink,editButton,editModeLine];
    let arrayShow = [loginLink]

    hideLink(arrayHide);
    showLink(arrayShow);
}