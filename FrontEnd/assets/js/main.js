const logoutLink = document.getElementById("linkLogout");
console.log(logoutLink);
const loginLink = document.getElementById("linkLogin");
const editButton = document.getElementById("editButton");



displayCategories()
displayWorks()

if (localStorage.getItem("token")) {
    hideLink(loginLink);
    showLink(logoutLink);
    showLink(editButton);

    logoutLink.addEventListener("click", function(){
        logout();
    })

    editButton.addEventListener("click", function(){
        openModal();
    })

} else {
    hideLink(logoutLink);
    hideLink(editButton);
    showLink(loginLink);
}






