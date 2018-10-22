
function logaUsuario(event, form){
    event.preventDefault();
    
    let campoLogin = form.email;
    let campoSenha = form.senha;
    
    $.ajax({ 
        url: urlProducao + 'login.php',
        type: 'POST',
        dataType: 'json',
        data: $(form).serialize(),
        success : function(data){
            if(data.status){
                alert('Logado com sucesso!!');
                
                window.localStorage.setItem('autenticadoEngetec', true);
                window.localStorage.setItem('emailEngetec', campoLogin.value);
                
                renderizaPerfilUsuario();
                
                $('#modalLogaUsuario').modal('hide');
            }else{ 
                alert(' Login ou senha incorretos!');
                campoLogin.focus();
            }
        }
    });
}

function deslogar(event){
    if(event)
    event.preventDefault();
    
    alert('Deslogado com sucesso');
    window.localStorage.setItem('autenticadoEngetec', false);
    window.localStorage.setItem('emailEngetec', null);
    renderizaBtnLogar();
}

function validaSessao(){
    if(window.localStorage.getItem('autenticadoEngetec') == null ||  window.localStorage.getItem('autenticadoEngetec') == 'false'){
        window.localStorage.setItem('autenticadoEngetec', false);
        window.localStorage.setItem('emailEngetec', null);
        renderizaBtnLogar();
    }else{ 
        renderizaPerfilUsuario();
    }
}

function renderizaPerfilUsuario(){
    let email = window.localStorage.getItem('emailEngetec');
    document.querySelector('#areaLogin').innerHTML = `
    <div class="dropdown">
    <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuMenu" data-toggle="dropdown"
    aria-haspopup="true" aria-expanded="false">
    ${email}
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuMenu">
    <button class="dropdown-item" type="button">Alterar Senha</button>
    <button class="dropdown-item" onclick="deslogar(event)" type="button">Sair</button>
    </div>
    </div>
    `;
}

function fechaModalLogin(){
    $('#modalLogaUsuario').modal('hide');
}

function recuperarSenha(event, form){
    event.preventDefault();

    $.ajax({
        url: urlProducao + 'login.php',
        type: 'POST',
        dataType: 'json',
        data: $(form).serialize(),
        success : function(data){
            if(data.status){ 
                alert('Sua senha foi enviada para o e-mail do seu cadastro!!');
            }else{ 
                alert('Desculpe, Este e-mail não está cadastrado!!');
            }
        }
    });
}

function renderizaBtnLogar(){ 
    document.querySelector('#areaLogin').innerHTML = `
    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#modalLogaUsuario">Area Restrita</button>
    `;
}

$(function(){
    validaSessao();
})