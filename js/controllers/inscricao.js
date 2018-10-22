function buscaOficinasFormulario(){
    $.ajax({
        url: urlProducao + 'oficina.php',
        type: 'GET',
        dataType: 'json',
        success : function(oficinas){
            let listaOficinas = document.querySelector('#oficinas');
            listaOficinas.innerHTML = `
            ${ 
                oficinas.map( (oficina, i) => { 
                    return `
                    <div class="col-lg-12">
                    <div class="p-1">
                    <input class="form-check-input" type="radio" value="${oficina.id}" id="${oficina.id}" name="oficinaOption">
                    <label class="form-check-label" for="${oficina.id}">
                    Oficina ${i=i+1}: ${oficina.tema} <i><b>Prof: ${oficina.professor}</b></i>
                    </label>
                    </div>
                    </div>
                    `
                }).join("")
            }
            `;
        }
    });
}

function salvaInscricao(event, form){
    event.preventDefault();
    $.ajax({ 
        url: urlProducao + 'inscricao.php',
        type: 'POST',
        dataType: 'json',
        data: $(form).serialize(),
        beforeSend : function(data){
            document.querySelector('#spinner').innerHTML = `
            <!--Big blue-->
            <div class="preloader-wrapper big active center">
            <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
            <div class="circle"></div>
            </div>
            <div class="gap-patch">
            <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
            <div class="circle"></div>
            </div>
            </div>
            </div>
            `;
        },
        success : function(data){
            document.querySelector('#spinner').innerHTML = '';
            if(data.status){ 
                alert('Inscrição Realizada com sucesso!!');
                window.location.href = "relacao-inscritos.html";
            }else { 
                alert('Registro Acadêmico, E-mail ou Cpf Já existe!');
            }
            
        }
    });
}

function buscaRelacaoInscritos(){
    $.ajax({ 
        url: urlProducao + '/inscricao.php',
        type: 'GET',
        dataType: 'json',
        success : function(inscritos){
            let listaInscritos = document.querySelector('#relacaoInscritos');
            listaInscritos.innerHTML = `
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
            <thead>
            <tr>
            <th class="th-sm"> 
            Nome
            <i class="fa fa-sort float-right" aria-hidden="true">
            </th>
            <th class="th-sm">
            Email
            <i class="fa fa-sort float-right" aria-hidden="true">
            </th>
            <th class="th-sm">
            Tipo
            <i class="fa fa-sort float-right" aria-hidden="true">
            </th>
            <th class="th-sm">
            Telefone
            <i class="fa fa-sort float-right" aria-hidden="true">
            </th>
            </tr>
            </thead>
            <tbody>
            ${ 
                inscritos.map( (inscrito, i) => { 
                    return `
                    <tr>
                    <td>${inscrito.nome}</td>
                    <td>${inscrito.email}</td>
                    <td>${inscrito.tipo}</td>
                    <td>${inscrito.telefone}</td>
                    </tr>
                    `
                }).join("")
            }
            </tbody>
            </table>
            `;
            
            $('#dtBasicExample').DataTable();
            $('.dataTables_length').addClass('bs-select');
        }
    });
}