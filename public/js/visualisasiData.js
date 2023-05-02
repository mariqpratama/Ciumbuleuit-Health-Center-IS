async function dropdownProgram() {
    if(window.localStorage.getItem("id") != null){
        var res = window.localStorage.getItem("id")
        const response = await fetch("http://localhost:8080/getProgramVisualisasi/"+res,{
            method: 'GET'
        });
        await response.json().then((response) => {
            
            var baru = JSON.stringify(response, null);
            var baru2 = JSON.parse(baru);
            var program = document.getElementById("ddProgram")
            
            for(var i=0; i<baru2.length; i++){
                var option = document.createElement("option");
                
                option.text = baru2[i].namaProgram
                option.value = baru2[i].idProgram
                
                program.add(option)
                console.log(baru2[i].namaProgram)
            }
        });
    }
}
dropdownProgram();

var program = document.getElementById("ddProgram")
var visual = document.getElementById("visual")
program.addEventListener("change",async function() {

    var id = program.value; 
    const response = await fetch("http://localhost:8080/getVisual/" + id,{
        method: 'GET'
    });
    await response.json().then((response) => {
        var baru = JSON.stringify(response, null);
        var baru2 = JSON.parse(baru);

        visual.innerHTML=baru2[0].linkVisualisasi
    });
})

function cekToken() {
    var cek = window.localStorage.getItem("id")
    if(cek == null) {
        window.location.href = "/masuk"
    }
}
cekToken();