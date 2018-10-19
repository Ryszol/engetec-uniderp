//OCULTA TUDO POR PADRÃO ATÉ QUE O USUÁRIO MARQUE ALGO
window.onload = function() {
    $('#cAluno').hide();
    $('#cProfessor').hide();
    $('#cProfissional').hide();
    $('#oficinas').hide();
    $('#soParaAlunos').hide();

};

//SE MARCA ALUNO ENTÃO DESMARCA O RESTANTE
function mAluno(objCheck) {
    if (objCheck.checked) {
        $('#cAluno').show();
        $('#cProfessor').hide();
        $('#cProfissional').hide();
        $('#soParaAlunos').show();
        $('#instituicao').val('');
        $('#cProfessor .md-form label.active').removeClass('active');
        $('#empresa').val('');
        $('#cProfissional .md-form label.active').removeClass('active');
    } else { //o else é apenas pra verificar mesmo
        $('#cAluno').hide();
        $('#cProfessor').show();
        $('#cProfissional').show();
        $('#soParaAlunos').hide();
    }
};

//SE MARCA PROFESSOR ENTÃO DESMARCA O RESTANTE
function mProfessor(objCheck) {
    if (objCheck.checked) {
        $('#cProfessor').show();
        $('#cAluno').hide();
        $('#cProfissional').hide();
        $('#soParaAlunos').hide();
        $('#ra').val('');
        $('#curso').val('');
        $('#cAluno .md-form label.active').removeClass('active');
        $('#checkbox_oficina').prop('checked', false);
        $('#oficinas input[type="radio"]').prop('checked', false);
        $('#visita').prop('checked', false);
        $('#oficinas').hide();
        $('#empresa').val('');
        $('#cProfissional .md-form label.active').removeClass('active');
    } else {
        $('#cProfessor').hide();
        $('#cAluno').show();
        $('#cProfissional').show();
        $('#soParaAlunos').show();
    }
};

//SE MARCA PROFISSIONAL ENTÃO DESMARCA O RESTANTE
function mProfissional(objCheck) {
    if (objCheck.checked) {
        $('#cProfissional').show();
        $('#cAluno').hide();
        $('#cProfessor').hide();
        $('#soParaAlunos').hide();
        $('#ra').val('');
        $('#curso').val('');
        $('#cAluno .md-form label.active').removeClass('active');
        $('#checkbox_oficina').prop('checked', false);
        $('#oficinas input[type="radio"]').prop('checked', false);
        $('#visita').prop('checked', false);
        $('#oficinas').hide();
        $('#instituicao').val('');
        $('#cProfessor .md-form label.active').removeClass('active');
    } else {
        $('#cProfissional').hide();
        $('#cAluno').show();
        $('#cProfessor').show();
        $('#soParaAlunos').show();
    }
};

function mOficina(objCheck) {
    if (objCheck.checked) {
        $('#oficinas').show();
    } else {
        $('#oficinas').hide();
    }
};

$('#resetar').click(function() {
	$('.md-form label.active').removeClass('active');
	$('#cAluno').hide();
	$('#cProfessor').hide();
	$('#cProfissional').hide();
	$('#oficinas').hide();
	$('#soParaAlunos').hide();
});

$('#resetar2').click(function() {
	$('.md-form label.active').removeClass('active');
	$('#cAluno').hide();
	$('#cProfessor').hide();
	$('#cProfissional').hide();
	$('#oficinas').hide();
	$('#soParaAlunos').hide();
});
