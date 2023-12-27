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
        
        figureworks.appendChild(image);
        figureworks.appendChild(title);

        document.querySelector(".gallery").appendChild(figureworks);
    }

//Fonction filtrage   
let buttonfilter = document.querySelector(".filtered");
const figuresFilter = document.querySelectorAll("figure");
 
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
        button.value = data [i].id;

        document.querySelector(".filtered").appendChild(button);
    }
}

displayCategories()
displayWorks()

function emailCheck(email) {
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
}
//Envoie les données à l'API
let mailLogin = document.querySelector("#mailLogin")
let passwordLogin = document.querySelector("#passwordLogin")
let buttonSubmit = document.querySelector("#submitLogin")

buttonSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    var testMail = emailCheck(mailLogin.value)
    if(testMail === true) {
        const connection = {
            email: mailLogin.value,
            password: passwordLogin.value,
        };
        const dataConnection = JSON.stringify(connection);
    
        fetch("http://localhost:5678/api/login",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: dataConnection             
        })
        .then(function (response) {
            if(response.ok) {
                return response.json();
            } else {
                let errorConnection = document.createElement("p");
                errorConnection.textContent = "Adresse mail ou mot de passe incorrect";
                document.querySelector("#formLogin").appendChild(errorConnection);
            }
        })
        //récup token en cours
        .then(function (dataResponse) {
            var token = dataResponse.token
            localStorage.setItem("token", token);
        });

    } else {
        let errorMessage = document.createElement("p");
        errorMessage.textContent = "Format de l'e-mail incorrect";
        document.querySelector("#formLogin").appendChild(errorMessage);
    }
});

