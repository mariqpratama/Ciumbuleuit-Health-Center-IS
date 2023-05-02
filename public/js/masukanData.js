
function upload() {
    var files = document.getElementById('file_upload').files;
    if(files.length==0){
      alert("Silakan pilih file apa saja...");
      return;
    }
    var filename = files[0].name;
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension == '.XLS' || extension == '.XLSX') {
        excelFileToJSON(files[0]);
    }else{
        alert("Pilih file excel yang valid.");
    }
  }
   
  function excelFileToJSON(file){
      try {
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = async function(e) {

            var data = e.target.result;

            var workbook = XLSX.read(data, {
                type : 'binary'
            });

            workbook.SheetNames.forEach(async function(sheetName) {
            var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

            console.log(roa);
            for (var i=0; i<roa.length;i++){

                const response = await fetch('http://localhost:8080/insertExcel/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({data:roa[i], idPengguna:window.localStorage.getItem("id"),idLaporan:idLaporan })
            })
            }
            
            });         
          
            sleep(100).then(() => {
                document.getElementById("file_upload").clear()
            });
            alert("Data berhasil disimpan.");
            console.log(resultEle);
            }
        }catch(e){
            console.error(e);
        }
  }

function clearForm(){
    var labelKosong = document.getElementById("labelInput")
    labelKosong.innerHTML = ``
}

async function dropdownProgram() {
    if(window.localStorage.getItem("id") != null){

        var res = window.localStorage.getItem("id")
        const response = await fetch("http://localhost:8080/getProgram/"+res,{
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
            }
        });
    }
}
dropdownProgram();

var program = document.getElementById("ddProgram")
var laporan = document.getElementById("ddLaporan")

program.addEventListener("change",async function() {
    var id = program.value;         
    const response = await fetch("http://localhost:8080/getLaporan/" + id,{
        method: 'GET'
    });
    await response.json().then((response) => {
        var baru = JSON.stringify(response, null);
        var baru2 = JSON.parse(baru);

        laporan.options.length = 0
        laporan.innerHTML += `<option value="" selected disabled hidden>Pilih Disini</option>`
                
        for(var i=0; i<baru2.length; i++){
            var option = document.createElement("option");
                    
            option.text = baru2[i].namaLaporan
            option.value = baru2[i].idLaporan
                    
            laporan.add(option)
        }
    });
})

async function getMasukanForm() {
    var id = laporan.value; 
    idLaporan = id;

    var label = document.getElementById("labelInput")
    label.innerHTML = ""
    const response = await fetch("http://localhost:8080/getForm/" + id,{
        method: 'GET'
    });
    await response.json().then((response) => {
        var baru = JSON.stringify(response, null);
        var baru2 = JSON.parse(baru);
            

        for(var i=0; i<baru2.length; i++){
            label.innerHTML += ``+baru2[i].formHTML+``
        }
        label.innerHTML += `<div class="row justify-content-end" id="btnSaveRecord">
            <div class="col-auto">
                <button type="button" class="btn btn-danger text-white" type="submit" data-bs-toggle="modal" data-bs-target="#modalData">Simpan</button>
            </div>
        </div>`          
    });
}

var idLaporan;
laporan.addEventListener("change",async function() {
    document.getElementById("btnTambah").style.visibility = `visible`
    var id = laporan.value; 
    idLaporan = id;

    var label = document.getElementById("labelInput")
    label.innerHTML = ""
    const response = await fetch("http://localhost:8080/getForm/" + id,{
         method: 'GET'
    });
    await response.json().then((response) => {
        var baru = JSON.stringify(response, null);
        var baru2 = JSON.parse(baru);

        for(var i=0; i<baru2.length; i++){
            label.innerHTML += ``+baru2[i].formHTML+``
        }
        label.innerHTML += `<div class="row justify-content-end" id="btnSaveRecord">
            <div class="col-auto">
                <button type="button" class="btn btn-danger text-white" type="submit" data-bs-toggle="modal" data-bs-target="#modalData">Simpan</button>
            </div>
        </div>`   
    });
})

async function insertData(){
    let form = document.forms['labelInput'].getElementsByClassName('test');
    let valueArr = {};

    var i=0;
    for (var x of form){
        valueArr[x.name]=x.value
    }

    const response = await fetch('http://localhost:8080/insertData/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data:valueArr, idPengguna:window.localStorage.getItem("id"),idLaporan:idLaporan })
    })
    sleep(100).then(() => {
        document.getElementById("labelInput").reset()
    });
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function radioHandler(name) {
    var radio = document.getElementById('radio'+name+'')
    var select = document.getElementsByName('label'+name+'')

    for (var i=0; i<select.length; i++) {
        if(select[i].checked) {
            radio.value = select[i].value
        }
    }
}
radioHandler();
    
function cekToken() {
    var cek = window.localStorage.getItem("id")
    if(cek == null) {
        window.location.href = "/masuk"
    }
}
cekToken();

