window.localStorage.clear()

async function login() {
    const response = await fetch("http://localhost:8080/loginauthuser/"+
    document.getElementById("username").value+"/"+document.getElementById("kataSandi").value,{
        method: 'GET'
    });
    await response.json().then((response) => {
        var baru = JSON.stringify(response, null);
        var baru2 = JSON.parse(baru);
            if(response.length>=1){
                window.localStorage.setItem("id",baru2[0].idPengguna)
                sessionStorage.setItem("idPeran",baru2[0].idPeran)
                console.log("test"+window.localStorage.getItem("id"))

                window.location.href = "/visualisasiData"
            }else {
                alert("Login Unsuccessful :( invalid username/password");
                window.location.href = "/masuk";
            }
    });
}
