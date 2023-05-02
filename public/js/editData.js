var jumlahLabelBaru = 0
var stringLabel = ''

function clearForm(){
    var labelKosong = document.getElementById("labelInput")
    labelKosong.innerHTML = ``
    urutanLabel = 0
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

    async function getEditForm() {
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
                urutanLabel = baru2[i].urutan
                
                var k = baru2[i].urutan

                try{
                label.innerHTML += ``+baru2[i].formHTML+``
                var btnEdit = document.getElementsByClassName("col-11")[i]

                if(baru2[i].tipeData == "radio"){
                    btnEdit.innerHTML += `<div class="row align-self-center">
                    <input type="hidden" id="hidden`+k+`" value="`+baru2[i].tipeData+`">
                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalEdit`+k+`" onclick="resetLoop2()">Edit</button>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalHapus`+k+`">Hapus</button>
            </div>
            <div class="modal fade" id="modalHapus`+k+`" tabindex="-1" aria-labelledby="hapusLabel`+k+`" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p>Apakah anda yakin ingin menghapus kolom data?</p>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Tidak</button>
          <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" onclick="deleteLabel(`+k+`)">Ya</button>
        </div>
      </div>
    </div>
  </div>
            <div class="modal fade" id="modalEdit`+k+`" tabindex="-1" aria-labelledby="editLabel`+k+`" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="editLabel">Edit Kolom</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="container">
                <input id="editKolom`+k+`" type="text" class="form-control" value="`+document.getElementById('kolom'+k+'').innerText+`">
            </div>
            <div class="container" id="namaLabelInput`+k+`">

            </div>
            <div class="container" >
                <div class="container">
                    <p>Tipe Masukan Data :</p>
                </div>
                <div class="container">
                    <div class="btn-group">
                        <select class="btn btn-secondary dropdown-toggle" id="btnLabelData`+k+`" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" onchange="ddTipeData2(`+k+`)">
                            <option value="" selected disabled hidden>Pilih Disini</option>
                            <option value="text">Teks</option>
                            <option value="number">Angka</option>
                            <option value="date">Tanggal</option>
                            <option value="radio" selected>Pilihan</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Batal</button>
          <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" onclick="labelUpdate(`+k+`)">Simpan</button>
        </div>
      </div>
    </div>
  </div>`
            var loopOpsi = document.getElementsByClassName(``+document.getElementById('kolom'+k+'').innerText+``)
            var labelOpsi = document.getElementById(`namaLabelInput`+k+``)
            
            for(var x=0; x<loopOpsi.length; x++){
                labelOpsi.innerHTML += `
				                                <input class="test`+k+`" value="`+loopOpsi[x].value+`" type="text" name="label`+document.getElementById('kolom'+k+'').innerText+`" id="option`+k+x+`">
				                         `
            }
            
                }
                else {
                btnEdit.innerHTML = `<div class="row align-self-center">
                    <input type="hidden" id="hidden`+k+`" value="`+baru2[i].tipeData+`">
                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalEdit`+k+`" onclick="resetLoop2()">Edit</button>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalHapus`+k+`">Hapus</button>
            </div>
            <div class="modal fade" id="modalHapus`+k+`" tabindex="-1" aria-labelledby="hapusLabel`+k+`" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p>Apakah anda yakin ingin menghapus kolom data?</p>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Tidak</button>
          <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" onclick="deleteLabel(`+k+`)">Ya</button>
        </div>
      </div>
    </div>
  </div>
            <div class="modal fade" id="modalEdit`+k+`" tabindex="-1" aria-labelledby="editLabel`+k+`" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="editLabel">Edit Kolom</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="container">
                <input id="editKolom`+k+`" type="text" class="form-control" value="`+document.getElementById('kolom'+k+'').innerText+`">
            </div>
            <div class="container" id="namaLabelInput`+k+`">

            </div>
            <div class="container" >
                <div class="container">
                    <p>Tipe Masukan Data :</p>
                </div>
                <div class="ms-auto container">
                    <div class="btn-group">
                        <select class="btn btn-secondary dropdown-toggle" id="btnLabelData`+k+`"  type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" onchange="ddTipeData2(`+k+`)">
                            <option value="text" `+(baru2[i].tipeData==`text`?"selected":"")+`>Teks</option>
                            <option value="number" `+(baru2[i].tipeData==`number`?"selected":"")+`>Angka</option>
                            <option value="date" `+(baru2[i].tipeData==`date`?"selected":"")+`>Tanggal</option>
                            <option value="radio">Pilihan</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Batal</button>
          <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" onclick="labelUpdate(`+k+`)">Simpan</button>
        </div>
      </div>
    </div>
  </div>`}
  if(baru2[i].tipeData=="radio"){
  var formLength = document.getElementsByClassName("form-check").length
  for(var j=0; j<formLength; j++){
    document.getElementsByClassName("form-check")[j].style.display = `none`
  }
  }else{
  document.getElementsByClassName("test")[i].style.display = `none`
  }
  
}catch(e){
    console.log(e)

}  
            }
   
        });
    }

    var idLaporan;
    var urutanLabel = 0
    laporan.addEventListener("change",async function() {
        document.getElementById("tambahkanLabel").style.visibility = `visible`
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
                urutanLabel = baru2[i].urutan
                
                var k = baru2[i].urutan
                try{
                label.innerHTML += ``+baru2[i].formHTML+``
                var btnEdit = document.getElementsByClassName("col-11")[i]
                if(baru2[i].tipeData == "radio"){
                    btnEdit.innerHTML += `<div class="row align-self-center">
                    <input type="hidden" id="hidden`+k+`" value="`+baru2[i].tipeData+`">
                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalEdit`+k+`" onclick="resetLoop2()">Edit</button>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalHapus`+k+`">Hapus</button>
            </div>
            <div class="modal fade" id="modalHapus`+k+`" tabindex="-1" aria-labelledby="hapusLabel`+k+`" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p>Apakah anda yakin ingin menghapus kolom data?</p>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Tidak</button>
          <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" onclick="deleteLabel(`+k+`)">Ya</button>
        </div>
      </div>
    </div>
  </div>
            <div class="modal fade" id="modalEdit`+k+`" tabindex="-1" aria-labelledby="editLabel`+k+`" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="editLabel">Edit Kolom</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="container">
                <input id="editKolom`+k+`" type="text" class="form-control" value="`+document.getElementById('kolom'+k+'').innerText+`">
            </div>
            <div class="container" id="namaLabelInput`+k+`">

            </div>
            <div class="container" >
                <div class="container">
                    <p>Tipe Masukan Data :</p>
                </div>
                <div class="container">
                    <div class="btn-group">
                        <select class="btn btn-secondary dropdown-toggle" id="btnLabelData`+k+`" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" onchange="ddTipeData2(`+k+`)">
                            <option value="" selected disabled hidden>Pilih Disini</option>
                            <option value="text">Teks</option>
                            <option value="number">Angka</option>
                            <option value="date">Tanggal</option>
                            <option value="radio" selected>Pilihan</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Batal</button>
          <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" onclick="labelUpdate(`+k+`)">Simpan</button>
        </div>
      </div>
    </div>
  </div>`
            var loopOpsi = document.getElementsByClassName(``+document.getElementById('kolom'+k+'').innerText+``)
            var labelOpsi = document.getElementById(`namaLabelInput`+k+``)
            
            for(var x=0; x<loopOpsi.length; x++){
                labelOpsi.innerHTML += `
				                                <input class="test`+k+`" value="`+loopOpsi[x].value+`" type="text" name="label`+document.getElementById('kolom'+k+'').innerText+`" id="option`+k+x+`">
				                         `
            }
            
                }
                else {
                btnEdit.innerHTML += `<div class="row align-self-center">
                    <input type="hidden" id="hidden`+k+`" value="`+baru2[i].tipeData+`">
                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalEdit`+k+`" onclick="resetLoop2()">Edit</button>
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalHapus`+k+`">Hapus</button>
            </div>
            <div class="modal fade" id="modalHapus`+k+`" tabindex="-1" aria-labelledby="hapusLabel`+k+`" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p>Apakah anda yakin ingin menghapus kolom data?</p>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Tidak</button>
          <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" onclick="deleteLabel(`+k+`)">Ya</button>
        </div>
      </div>
    </div>
  </div>
            <div class="modal fade" id="modalEdit`+k+`" tabindex="-1" aria-labelledby="editLabel`+k+`" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="editLabel">Edit Kolom</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="container">
                <input id="editKolom`+k+`" type="text" class="form-control" value="`+document.getElementById('kolom'+k+'').innerText+`">
            </div>
            <div class="container" id="namaLabelInput`+k+`">

            </div>
            <div class="container" >
                <div class="container">
                    <p>Tipe Masukan Data :</p>
                </div>
                <div class="ms-auto container">
                    <div class="btn-group">
                        <select class="btn btn-secondary dropdown-toggle" id="btnLabelData`+k+`"  type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" onchange="ddTipeData2(`+k+`)">
                            <option value="text" `+(baru2[i].tipeData==`text`?"selected":"")+`>Teks</option>
                            <option value="number" `+(baru2[i].tipeData==`number`?"selected":"")+`>Angka</option>
                            <option value="date" `+(baru2[i].tipeData==`date`?"selected":"")+`>Tanggal</option>
                            <option value="radio">Pilihan</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Batal</button>
          <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" onclick="labelUpdate(`+k+`)">Simpan</button>
        </div>
      </div>
    </div>
  </div>`}
  document.getElementsByClassName("test")[i].style.display = `none`
  var formLength = document.getElementsByClassName("form-check").length
  for(var j=0; j<formLength; j++){
    document.getElementsByClassName("form-check")[j].style.display = `none`
  }
}catch(e){
    console.log(e)

}  
            }
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
    }

    var loop = 0
    var loop2 = 0

    var btnLabelData = document.getElementById("btnLabelData")
    
    btnLabelData.addEventListener("change",async function() {
        var newLabelInput = document.getElementById("newLabel")
        newLabelInput.disabled = false
        var namaLabelInput = document.getElementById("namaLabelInput")
        var ddLabelInput = document.getElementById("btnLabelData")
        if(ddLabelInput.value == "text"){
            
                                namaLabelInput.innerHTML = ''
        }else if(ddLabelInput.value == "number"){
            
                                namaLabelInput.innerHTML = ''
        }else if(ddLabelInput.value == "date"){
            
                                namaLabelInput.innerHTML = ''
        }else if(ddLabelInput.value == "radio"){
            
            namaLabelInput.innerHTML += `<div class="" id="divInput">
                                        <div>Tambahkan Opsi Pilihan</div>
                                        <input type="text" class="test" id="option`+loop+`"> 
                                    </div>
                                    <button id="btnRadioInput" onclick="btnTambahRadio()">+</button>`
            
        }
    })

    function ddTipeData(index){
        var newLabelInput = document.getElementById(`editKolom`+index+``)
        newLabelInput.disabled = false
        var ddLabelInput = document.getElementById(`btnLabelData`+index+``)
        if(ddLabelInput.value == "text"){
            
                                namaLabelInput.innerHTML = ''
        }else if(ddLabelInput.value == "number"){
            
                                namaLabelInput.innerHTML = ''
        }else if(ddLabelInput.value == "date"){
            
                                namaLabelInput.innerHTML = ''
        }else if(ddLabelInput.value == "radio"){
            
            namaLabelInput.innerHTML += `<div class="" id="divInput">
                                        <div>Tambahkan Opsi Pilihan</div>
                                        <input type="text" class="test" id="option`+loop+`"> 
                                    </div>
                                    <button id="btnRadioInput" onclick="btnTambahRadio()">+</button>`
            
        }
    }

    var option  = document.getElementById("option1")
    option.addEventListener("change",async function() {
        console.log(option.value)
    })

    function resetLoop(){
        loop = 0
    }

    function resetLoop2(){
        loop2 = 0
    }

    var btnRadio = document.getElementById("btnRadioInput")
    function btnTambahRadio() {
        var divInput = document.getElementById("divInput")
        loop = loop + 1
        divInput.innerHTML += `<input type="text" class="test" id="option`+loop+`"> `
        
    }

    function btnTambahRadio2(k) {
        var divInput = document.getElementById(`divInput`+k+``)
        loop2 = loop2 + 1
        divInput.innerHTML += `<input type="text" class="test`+k+`" id="option`+k+loop2+`"> `
        
    }

    var tempArr = []

    async function labelBaru() {

        var label = document.getElementById("labelInput")

        var input = document.getElementById("newLabel").value

        var ddLabelInput = document.getElementById("btnLabelData")

        var namaLabelInput = document.getElementById("namaLabelInput")

        var angka = urutanLabel+1
        
        if(ddLabelInput.value == "text"){
            stringLabel = `<div class="container bg-white mb-3 rounded">
                                    <div class="row">
                                        <div class="col col-10">
                                            <label id="kolom`+angka+`" class="form-label">`+input+`</label>
                                        </div> 
                                        <div class="col col-11"> 
                                            <input type="text" class="test" name="`+input+`">
                                        </div>    
                                    </div>
                                </div>`
                   namaLabelInput.innerHTML = ''
        }else if(ddLabelInput.value == "number"){
            stringLabel = `<div class="container bg-white mb-3 rounded">
                                    <div class="row">
                                        <div class="col col-10">
                                            <label id="kolom`+angka+`" class="form-label">`+input+`</label>
                                        </div>
                                        <div class="col col-11"> 
                                            <input type="number" class="test" name="`+input+`">
                                        </div>   
                                    </div>
                                </div>`
                    namaLabelInput.innerHTML = ''
        }else if(ddLabelInput.value == "date"){
            stringLabel = `<div class="container bg-white mb-3 rounded">
                                    <div class="row">
                                        <div class="col col-10">
                                            <label id="kolom`+angka+`" class="form-label">`+input+`</label>
                                        </div> 
                                        <div class="col col-11"> 
                                            <input type="date" class="test" name="`+input+`">
                                        </div>   
                                    </div>
                                </div>`
                    namaLabelInput.innerHTML = ''
        }else if(ddLabelInput.value == "radio"){
            var stringOpsi = ``
            stringOpsi += `<div class="container bg-white mb-3 rounded">
                                    <div class="row">
                                        <div class="col col-10">
                                            <input type="hidden" id="name`+angka+`" value="`+input+`">
                                            <label id="kolom`+angka+`" class="form-label">`+input+`</label>
                                        </div>
                                        <div class="col col-11">`
            
            var divOpsi = document.getElementById("opsiRadio")
            var tes = document.getElementById("heyhsayehf")
            
            
            for(var i=0; i<=loop; i++){
                
                var opsi = document.getElementById(`option`+i+``).value
                stringOpsi += `<div class="form-check">
				                                <input class="`+input+`" value="`+opsi+`" onChange="radioHandler('`+input+`')" type="radio" name="label`+input+`" id="flexRadioDefault1">
				                                <label class="form-check-label" for="flexRadioDefault1">
                                                    `+opsi+`
				                                </label>
			                                </div>`  
            }
            stringOpsi += `<input type="hidden" class="test" id="radio`+input+`" name="`+input+`"> </div> </div> </div>`

            stringLabel = stringOpsi

            
        }


            const response = await fetch('http://localhost:8080/insertElemenForm/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idLaporan:idLaporan,  dataFormHTML:stringLabel, urutan:angka, tipeData: ddLabelInput.value})
            }).then(async () => {await getEditForm()})
       
        
    }

    function ddTipeData2(k){
        var newLabelInput = document.getElementById(`editKolom`+k+``)
        var namaLabelInput = document.getElementById(`namaLabelInput`+k+``)
        var ddLabelInput = document.getElementById(`btnLabelData`+k+``)
        if(ddLabelInput.value == "text"){
            
                                namaLabelInput.innerHTML = ''
        }else if(ddLabelInput.value == "number"){
            
                                namaLabelInput.innerHTML = ''
        }else if(ddLabelInput.value == "date"){
            
                                namaLabelInput.innerHTML = ''
        }else if(ddLabelInput.value == "radio"){
            
            namaLabelInput.innerHTML += `<div class="" id="divInput`+k+`">
                                        <input type="hidden" id="name`+k+`" value="`+document.getElementById(`editKolom`+k+``).value+`">
                                        <div>Tambahkan Opsi Pilihan</div>
                                        <input type="text" class="test`+k+`" id="option`+k+loop2+`"> 
                                    </div>
                                    <button type="button" id="btnRadioInput`+k+`" onclick="btnTambahRadio2('`+k+`')">+</button>`
            
        }
    }

async function labelUpdate(index) {

var label = document.getElementById(`editKolom`+index+``)

var input = document.getElementById(`kolom`+index+``).innerText

var ddLabelInput = document.getElementById(`btnLabelData`+index+``)

var stringKolom = ''


var namaLabelInput = document.getElementById("namaLabelInput2")
var hidden = document.getElementById(`hidden`+index+``).value
if(ddLabelInput.value == "text"){
    if(hidden == "radio"){
        var keyRadio = document.getElementById(`name`+index+``).value
        stringKolom = `<div class="container bg-white mb-3 rounded">
                            <div class="row">
                                <div class="col col-10">
                                    <label id="kolom`+index+`" class="form-label">`+label.value+`</label>
                                </div>
                                <div class="col col-11"> 
                                    <input type="text" class="test" name="`+keyRadio+`">
                                </div>
                            </div>
                        </div>`

                        namaLabelInput.innerHTML = ''
    }else{
        stringKolom = `<div class="container bg-white mb-3 rounded">
                            <div class="row">
                                <div class="col col-10">
                                    <label id="kolom`+index+`" class="form-label">`+label.value+`</label>
                                </div>
                                <div class="col col-11"> 
                                    <input type="text" class="test" name="`+input+`">
                                </div>
                            </div>
                        </div>`

                        namaLabelInput.innerHTML = ''
    }
    
}else if(ddLabelInput.value == "number"){
    if(hidden == "radio"){
        var keyRadio = document.getElementById(`name`+index+``).value
        stringKolom = `<div class="container bg-white mb-3 rounded">
                            <div class="row">
                                <div class="col col-10">
                                    <label id="kolom`+index+`" class="form-label">`+label.value+`</label>
                                </div> 
                                <div class="col col-11"> 
                                    <input type="number" class="test" name="`+keyRadio+`">
                                </div>   
                            </div>
                        </div>`
                        namaLabelInput.innerHTML = ''
    }else{
        stringKolom = `<div class="container bg-white mb-3 rounded">
                            <div class="row">
                                <div class="col col-10">
                                    <label id="kolom`+index+`" class="form-label">`+label.value+`</label>
                                </div> 
                                <div class="col col-11"> 
                                    <input type="number" class="test" name="`+input+`">
                                </div>   
                            </div>
                        </div>`
                        namaLabelInput.innerHTML = ''
    }
}else if(ddLabelInput.value == "date"){
    if(hidden == "radio"){
        var keyRadio = document.getElementById(`name`+index+``).value
        stringKolom = `<div class="container bg-white mb-3 rounded">
                            <div class="row">
                                <div class="col col-10">
                                    <label id="kolom`+index+`" class="form-label">`+label.value+`</label>
                                </div>  
                                <div class="col col-11"> 
                                    <input type="date" class="test" name="`+keyRadio+`">
                                </div>   
                            </div>
                        </div>`
                        namaLabelInput.innerHTML = ''
    }else{
        stringKolom = `<div class="container bg-white mb-3 rounded">
                            <div class="row">
                                <div class="col col-10">
                                    <label id="kolom`+index+`" class="form-label">`+label.value+`</label>
                                </div>  
                                <div class="col col-11"> 
                                    <input type="date" class="test" name="`+input+`">
                                </div>   
                            </div>
                        </div>`
                        namaLabelInput.innerHTML = ''
    }
}else if(ddLabelInput.value == "radio"){
    var stringOpsi = ``
    if(hidden == "text" || hidden == "number" || hidden == "date"){
        var keyHidden = document.getElementsByClassName("test")[index-1].name
        stringOpsi += `<div class="container bg-white mb-3 rounded">
                            <div class="row">
                                <div class="col col-10">
                                    <input type="hidden" id='name`+index+`' value="`+keyHidden+`">
                                    <label id="kolom`+index+`" class="form-label">`+label.value+`</label>
                                </div>
                                <div class="col col-11">
                                `
    var loopOpsi = document.getElementsByClassName(`test`+index+``)
    for(var i=0; i<loopOpsi.length; i++){
          
        var opsi = document.getElementById(`option`+index+i+``).value
        stringOpsi += `<div class="form-check">
                                        <input class="`+label.value+`" value="`+opsi+`" onChange="radioHandler('`+label.value+`')" type="radio" name="label`+label.value+`" id="flexRadioDefault1">
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            `+opsi+`
                                        </label>
                                    </div>`
        }
    
    stringOpsi += `<input type="hidden" class="test" id="radio`+label.value+`" name="`+keyHidden+`"> </div>
                            </div>
                        </div>`
    stringKolom = stringOpsi

    }else{
        stringOpsi += `<div class="container bg-white mb-3 rounded">
                            <div class="row">
                                <div class="col col-10">
                                    <input type="hidden" id='name`+index+`' value="`+document.getElementById(`name`+index+``).value+`">
                                    <label id="kolom`+index+`" class="form-label">`+label.value+`</label>
                                </div>
                                <div class="col col-11">
                                `
    var loopOpsi = document.getElementsByClassName(`test`+index+``)
    
    for(var i=0; i<loopOpsi.length; i++){
        
        
        var opsi = document.getElementById(`option`+index+i+``).value
        stringOpsi += `<div class="form-check">
                                        <input class="`+label.value+`" value="`+opsi+`" onChange="radioHandler('`+label.value+`')" type="radio" name="label`+label.value+`" id="flexRadioDefault1">
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            `+opsi+`
                                        </label>
                                    </div>`  
    }
    stringOpsi += `<input type="hidden" class="test" id="radio`+label.value+`" name="`+document.getElementById(`name`+index+``).value+`"> </div>
                            </div>
                        </div>`
    stringKolom = stringOpsi
    }
 }


    const response = await fetch('http://localhost:8080/labelUpdate/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({formHTML:stringKolom, idLaporan:idLaporan, tipeData:ddLabelInput.value,  urutan:index })
    }).then(async () => {await getEditForm()})



}
async function deleteLabel(k){
    var id = laporan.value; 
        
        const response = await fetch('http://localhost:8080/labelDelete/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idLaporan:idLaporan,  urutan:k })
            }).then(window.location.reload())
            
    }

    async function updateUrutanLabel(k){
    var id = laporan.value; 
        
        const response = await fetch('http://localhost:8080/labelUpdateUrutan/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({idLaporan:idLaporan,  urutan:k })
            })
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