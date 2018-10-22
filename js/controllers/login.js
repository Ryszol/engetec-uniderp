
function logaUsuario(event, form){
    event.preventDefault();
    
    let campoLogin = form.email;
    let campoSenha = form.senha;
    
    $.ajax({ 
        url: urlProducao + 'login.php',
        type: 'POST',
        dataType: 'json',
        data: $(form).serialize(),
        beforeSend : function(data){
            colocaSpinner('#spinner-login', true);
        },
        success : function(data){
            colocaSpinner('#spinner-login', false);
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

function colocaSpinner(spinner, show){
    if(show){
        document.querySelector(spinner).innerHTML = `
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
    }else{
        document.querySelector(spinner).innerHTML = '';
    }
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
    let email = window.localStorage.getItem('emailEngetec').split('@')[0];
    document.querySelector('#areaLogin').innerHTML = `
    <div class="dropdown">
    <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuMenu" data-toggle="dropdown"
    aria-haspopup="true" aria-expanded="false">
    ${email}
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuMenu">
    <button class="dropdown-item" type="button" data-toggle="modal" data-target="#modalAlteraSenha">Alterar Senha</button>
    <button class="dropdown-item" onclick="deslogar(event)" type="button">Sair</button>
    </div>
    </div>
    `;
}

function fechaModalLogin(){
    $('#modalLogaUsuario').modal('hide');
}

function fechaModalAlteraSenha(){ 
    $('#modalAlteraSenha').modal('hide');
}

function recuperarSenha(event, form){
    event.preventDefault();
    
    $.ajax({
        url: urlProducao + 'login.php',
        type: 'POST',
        dataType: 'json',
        data: $(form).serialize(),
        beforeSend: function(data){
            colocaSpinner('#spinner-recuperar-senha', true);
        },
        success : function(data){
            colocaSpinner('#spinner-recuperar-senha', false);
            if(data.status){ 
                form.reset();
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

function alterarSenha(event, form){

    // Impedir que o formulário recarregue a página
    event.preventDefault();

    let campoNovaSenha = form.alteraSenha;
    let campoNovaSenhaConfirma = form.alteraSenhaConfirma;
    let emailUsuarioLogado = window.localStorage.getItem('emailEngetec');

    // Prepara dados para enviar ao backend;
    let dataSend = {};
    dataSend.alteraSenha = campoNovaSenha.value;
    dataSend.email = emailUsuarioLogado;
    
    // Valida se senhas são iguais
    if (campoNovaSenha.value != campoNovaSenhaConfirma.value) {
        alert('AS SENHAS DEVEM SER IGUAIS');
        form.reset();
        campoNovaSenha.focus();
    } else {
        $.ajax({
            url: urlProducao + 'login.php',
            type: 'POST',
            dataType: 'json',
            data: dataSend,
            beforeSend: function(data){
                colocaSpinner('#spinner-alterar-senha', true);
            },
            success : function(data){
                colocaSpinner('#spinner-alterar-senha', false);
                if(data.status){ 
                    alert('Senha alterada com sucesso!! Enviamos sua nova senha para seu E-mail');
                    form.reset();
                    fechaModalAlteraSenha();
                }else{ 
                    alert('Problemas ao alterar senha!!');
                    form.reset();
                }
            }
        });
    }
}

$(function(){
    validaSessao();
})