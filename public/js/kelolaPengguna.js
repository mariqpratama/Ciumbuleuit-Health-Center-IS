async function ubahStatus(id,status){
    const response = await fetch('http://localhost:8080/ubahStatus/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id:id,status:status })
    }).then(window.location.reload());
  
}

async function getPengguna() {
    const response = await fetch('http://localhost:8080/getPengguna/', {
        method: 'GET'
    });
    await  response.json().then(async(response)  => {
        
        var baru = JSON.stringify(response, null);
        var baru2 = JSON.parse(baru);
        for (i = 1; i < baru2.length; i++) {
            var id = baru2[i].idPengguna;
            var username = baru2[i].username;
            var nama = baru2[i].nama;
            var status = baru2[i].status;

            var tabel = document.getElementById("tabelPengguna")
            tabel.innerHTML += `<tr>
                                  <td>`+username+`</td>
                                  <td>`+nama+`</td>
                                  <td id="kolomPeran`+i+`"></td>
                                  <td>`+status+`</td>
                                  <td id="btn-status`+id+`"></td>
                                </tr>` 

            const response2 = await fetch('http://localhost:8080/getPeran/'+ id, {
                method: 'GET'
            });
            await response2.json().then((response2) => {   

                var getPeran = JSON.stringify(response2, null);
                var getPeran2 = JSON.parse(getPeran);
                var stringPeran = ''
                for(var j=0; j<getPeran2.length; j++){
                    if(j==getPeran2.length-1){
                        stringPeran = stringPeran  + getPeran2[j].peran + `. `
                    }else{
                        stringPeran = stringPeran  + getPeran2[j].peran + `, `
                    }
                }
                document.getElementById(`kolomPeran`+i+``).innerHTML += stringPeran
            });
            
            var btn = document.getElementById("btn-status"+id+"")
            var btnUbahStatus = document.createElement("button");

            btnUbahStatus.textContent = 'Ubah Status';
            btnUbahStatus.setAttribute('onClick', `ubahStatus('${id}', '${status}')` )
            btn.appendChild(btnUbahStatus);
        }
    });
}
getPengguna();

function cekToken() {
    var cek = window.localStorage.getItem("id")
    if(cek == null) {
        window.location.href = "/masuk"
    }
}
cekToken();