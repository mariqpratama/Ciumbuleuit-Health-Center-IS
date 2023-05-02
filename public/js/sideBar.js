function clearToken(){
    window.localStorage.clear()
    window.location.href="/masuk"
}
function sideNav(){
    if(sessionStorage.getItem("idPeran")==1){
        var menu = document.getElementById("sideNav")
        menu.innerHTML += `<a class="list-group-item list-group-item-action p-3" href="/kelolaPengguna"><h5>Kelola Pengguna</h5></a>
        <a class="list-group-item list-group-item-action p-3" onclick="clearToken()"><h5>Keluar</h5></a>`
    }if(sessionStorage.getItem("idPeran")>=17 && sessionStorage.getItem("idPeran")<=31){
        var menu = document.getElementById("sideNav")
        menu.innerHTML += `<a class="list-group-item list-group-item-action p-3" href="/masukanData"><h5>Masukan Data</h5></a>
        <a class="list-group-item list-group-item-action p-3" onclick="clearToken()"><h5>Keluar</h5></a>`
    }if(sessionStorage.getItem("idPeran")>=2 && sessionStorage.getItem("idPeran")<=16){
        var menu = document.getElementById("sideNav")
        menu.innerHTML += `<a class="list-group-item list-group-item-action p-3" href="/editData"><h5>Edit Data</h5></a>
        <a class="list-group-item list-group-item-action p-3" onclick="clearToken()"><h5>Keluar</h5></a>`
    }
}
sideNav();