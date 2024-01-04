function emailCheck(email) {
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
}
//Envoie les données à l'API
document.addEventListener('DOMContentLoaded', () => {
    let mailLogin = document.querySelector("#mailLogin");
    let passwordLogin = document.querySelector("#passwordLogin");
    let buttonSubmit = document.querySelector("#submitLogin");
    let formLogin = document.querySelector("#formLogin");
    
    let errorMessage = document.createElement("p");
    formLogin.appendChild(errorMessage);
    errorMessage.setAttribute("id", "error-message");
    let errorMessageBlock = document.getElementById("error-message");
 
    buttonSubmit.addEventListener('click', async (e) => {
        e.preventDefault();
        errorMessageBlock.textContent = "";
        if (emailCheck(mailLogin.value)) {
            const connection = {
                email: mailLogin.value,
                password: passwordLogin.value
            };
 
            try {
                const response = await fetch("http://localhost:5678/api/users/login", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(connection)
                });
 
                if (response.ok) {
                    const dataResponse = await response.json();
                    localStorage.setItem("token", dataResponse.token);
                    window.location.href = "index.html";
                } else {
                    errorMessageBlock.textContent = "Adresse mail ou mot de passe incorrect";
                }
            } catch (error) {
                console.error("Une erreur s'est produite lors de la requête :", error);
            }
        } else {
            errorMessageBlock.textContent = "Format de l'e-mail incorrect";
        }
    });
});