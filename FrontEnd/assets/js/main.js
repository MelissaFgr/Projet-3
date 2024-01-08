
const logoutLink = document.getElementById("linkLogout");
console.log(logoutLink);
const loginLink = document.getElementById("linkLogin");
const editButton = document.getElementsById("editButton");


displayCategories()
displayWorks()

if (localStorage.getItem("token")) {
    hideLink(loginLink);
    showLink(logoutLink, editButton);

    logoutLink.addEventListener("click", function(){
        logout();
    })

    editButton.addEventListener("click", function(){
        openModal();
    })

} else {
    hideLink(logoutLink);
    showLink(loginLink);
}




