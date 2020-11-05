// Variaveis com dados temporarios
var idPacienteMensagem, idPacienteChat = "null";
var nomeCompletoUsuario, idUsuario;
var def_email, def_senha, def_receptor;
var def_assunto, def_rodape;
var def_politica, def_politica_data, def_termo, def_termo_data, def_sobre, def_sobre_data;

// verificar alterações do status de autenticação
auth.onAuthStateChanged(user => {
    if (!user) {
        window.open('sigin.html', "_self");
    }
    else {

        idUsuario = user.uid;

        // VARIAVEL COM O NOME DO USUARIO ATUAL (TEMPORARIAMENTE INOPERANTE)
        db.ref('usuarios/cme' + '/' + user.uid + '/' + 'nome').once('value', (snap) => {
            nomeCompletoUsuario = snap.val();
        });

        db.ref('usuarios/cme' + '/' + user.uid + '/' + 'usuario').once('value', (snap) => {
            if (snap.val() == "admin") {
                document.getElementById("menu-lista-funcionario").classList.remove("disabled");
                document.getElementById("menu-lista-definicoes").classList.remove("disabled");

            }
        });
    }
});

// recuperar dados de definicao da conta e notificação
var ref_def_conta = firebase.database().ref().child("informacoes/-012020-email");
ref_def_conta.once("value", (snap) => {
    var receptor = snap.child("receptor").val();
    var emissor = snap.child("emissor").val();
    var password = snap.child("password").val();
    var rodape = snap.child("rodape").val();

    var rMensagem = snap.child("assunto").val();
    var rDesmarcacao = snap.child("assunto-agendamento").val();
    var rAgendamento = snap.child("assunto-consulta").val();
    var rCancelamento = snap.child("assunto-pendente").val();
    var rRemarcar = snap.child("assunto-remarcar").val();

    def_email = emissor;
    def_senha = password;
    def_receptor = receptor;
    def_rodape = rodape;

    def_assMensagem = rMensagem;
    def_assDesmarcacao = rDesmarcacao;
    def_assAgendamento = rAgendamento;
    def_assRemarcacao = rRemarcar;
    def_assCancelamento = rCancelamento;

    const formConta = document.querySelector('#definicao-conta');
    formConta['definicao-email'].value = def_email;
    formConta['definicao-senha'].value = def_senha;
    formConta['definicao-encaminhamento'].value = def_receptor;

    const formAssMensagem = document.querySelector('#definicao-notificacao-assMensagem');
    formAssMensagem['definicao-assunto'].value = def_assMensagem;
    const formAssDesmarcacao = document.querySelector('#definicao-notificacao-assDesmarcacao');
    formAssDesmarcacao['definicao-assunto-desmarcacao'].value = def_assDesmarcacao;
    const formAssAgendamento = document.querySelector('#definicao-notificacao-assAgendamento');
    formAssAgendamento['definicao-assunto-agendamento'].value = def_assAgendamento;
    const formAssRemarcacao = document.querySelector('#definicao-notificacao-assRemarcacao');
    formAssRemarcacao['definicao-assunto-remarcacao'].value = def_assRemarcacao;
    const formAssCancelamento = document.querySelector('#definicao-notificacao-assCancelamento');
    formAssCancelamento['definicao-assunto-cancelamento'].value = def_assCancelamento;
    const formAssAssinatura = document.querySelector('#definicao-notificacao-assinatura');
    formAssAssinatura['definicao-rodape'].value = def_rodape;

});

// recuperar dados de definicao de informações
var ref_def_politica = firebase.database().ref().child("informacoes/-112019-politica");
ref_def_politica.once("value", (snap) => {
    var politica_data = snap.child("data").val();
    var politica = snap.child("informacao").val();
    def_politica_data = politica_data;
    def_politica = politica;

    const formInformacaoPolitica = document.querySelector('#definicao-informacao-politica');
    formInformacaoPolitica['definicao-politica'].value = def_politica;

});

var ref_def_sobre = firebase.database().ref().child("informacoes/-112019-sobre");
ref_def_sobre.once("value", (snap) => {
    var sobre_data = snap.child("data").val();
    var sobre = snap.child("informacao").val();
    def_sobre_data = sobre_data;
    def_sobre = sobre;

    const formInformacaoSobre = document.querySelector('#definicao-informacao-sobre');
    formInformacaoSobre['definicao-sobre'].value = def_sobre;

});

var ref_def_termos = firebase.database().ref().child("informacoes/-112019-termos");
ref_def_termos.once("value", (snap) => {
    var termo_data = snap.child("data").val();
    var termo = snap.child("informacao").val();
    def_termo_data = termo_data;
    def_termo = termo;

    const formInformacaoTermo = document.querySelector('#definicao-informacao-termo');
    formInformacaoTermo['definicao-termo'].value = def_termo;

});

// salvar definições de conta
const salvarDefinicoesConta = document.querySelector('#definicao-conta');
salvarDefinicoesConta.addEventListener('submit', (e) => {
    e.preventDefault();

    const email_def = salvarDefinicoesConta['definicao-email'].value;
    const senha_def = salvarDefinicoesConta['definicao-senha'].value;
    const receptor_def = salvarDefinicoesConta['definicao-encaminhamento'].value;

    function salvarDados(email_def, senha_def, receptor_def) {
        db.ref('informacoes/-012020-email').update({
            emissor: email_def,
            receptor: receptor_def,
            password: senha_def
        });
    }
    salvarDados(email_def, senha_def, receptor_def);
});

// salvar definições de assinatura Rodape
const salvarDefAssRodape = document.querySelector('#definicao-notificacao-assinatura');
salvarDefAssRodape.addEventListener('submit', (e) => {
    e.preventDefault();
    const assRodape = salvarDefAssRodape['definicao-rodape'].value;

    function salvarDadosRodape(assRodape) {
        db.ref('informacoes/-012020-email').update({
            'rodape': assRodape
        });
    }
    salvarDadosRodape(assRodape);
});

// salvar definições de assinatura Remarcação
const salvarDefAssRemarcar = document.querySelector('#definicao-notificacao-assRemarcacao');
salvarDefAssRemarcar.addEventListener('submit', (e) => {
    e.preventDefault();
    const assRemarcacao = salvarDefAssRemarcar['definicao-assunto-remarcacao'].value;

    function salvarDadosRemarcacao(assRemarcacao) {
        db.ref('informacoes/-012020-email').update({
            'assunto-remarcar': assRemarcacao
        });
    }
    salvarDadosRemarcacao(assRemarcacao);
});

// salvar definições de assinatura Cancelamento
const salvarDefAssCancel = document.querySelector('#definicao-notificacao-assCancelamento');
salvarDefAssCancel.addEventListener('submit', (e) => {
    e.preventDefault();
    const assCancel = salvarDefAssCancel['definicao-assunto-cancelamento'].value;

    function salvarDadosCancelamento(assCancel) {
        db.ref('informacoes/-012020-email').update({
            'assunto-pendente': assCancel
        });
    }
    salvarDadosCancelamento(assCancel);
});

// salvar definições de assinatura Agendamento
const salvarDefAssAgendamento = document.querySelector('#definicao-notificacao-assAgendamento');
salvarDefAssAgendamento.addEventListener('submit', (e) => {
    e.preventDefault();
    const assAgendamento = salvarDefAssAgendamento['definicao-assunto-agendamento'].value;

    function salvarDadosAgendamento(assAgendamento) {
        db.ref('informacoes/-012020-email').update({
            'assunto-consulta': assAgendamento
        });
    }
    salvarDadosAgendamento(assAgendamento);
});

// salvar definições de assinatura Desmarcacao
const salvarDefAssDesmarcacao = document.querySelector('#definicao-notificacao-assDesmarcacao');
salvarDefAssDesmarcacao.addEventListener('submit', (e) => {
    e.preventDefault();
    const assDesmarcacao = salvarDefAssDesmarcacao['definicao-assunto-desmarcacao'].value;

    function salvarDadosDesmarcacao(assDesmarcacao) {
        db.ref('informacoes/-012020-email').update({
            'assunto-agendamento': assDesmarcacao
        });
    }
    salvarDadosDesmarcacao(assDesmarcacao);
});

// salvar definições de assinatura Mensagem
const salvarDefAssMensagem = document.querySelector('#definicao-notificacao-assMensagem');
salvarDefAssMensagem.addEventListener('submit', (e) => {
    e.preventDefault();
    const assMensagem = salvarDefAssMensagem['definicao-assunto'].value;

    function salvarDadosMensagem(assMensagem) {
        db.ref('informacoes/-012020-email').update({
            assunto: assMensagem
        });
    }
    salvarDadosMensagem(assMensagem);
});



// salvar definições de informações política
const salvarDefinicoesInformacaoPolitica = document.querySelector('#definicao-informacao-politica');
salvarDefinicoesInformacaoPolitica.addEventListener('submit', (e) => {
    e.preventDefault();
    const politica_def = salvarDefinicoesInformacaoPolitica['definicao-politica'].value;

    function salvarDadosPolitica(politica_def) {
        db.ref('informacoes/-112019-politica').update({
            data: new Date().toLocaleString(),
            informacao: politica_def
        });
    }
    salvarDadosPolitica(politica_def);
});

// salvar definições de informações termo
const salvarDefinicoesInformacaoTermo = document.querySelector('#definicao-informacao-termo');
salvarDefinicoesInformacaoTermo.addEventListener('submit', (e) => {
    e.preventDefault();
    const termo_def = salvarDefinicoesInformacaoTermo['definicao-termo'].value;

    function salvarDadosTermo(termo_def) {
        db.ref('informacoes/-112019-termos').update({
            data: new Date().toLocaleString(),
            informacao: termo_def
        });
    }
    salvarDadosTermo(termo_def);
});

// salvar definições de informações sobre
const salvarDefinicoesInformacaoSobre = document.querySelector('#definicao-informacao-sobre');
salvarDefinicoesInformacaoSobre.addEventListener('submit', (e) => {
    e.preventDefault();
    const sobre_def = salvarDefinicoesInformacaoSobre['definicao-sobre'].value;

    function salvarDadosSobre(sobre_def) {
        db.ref('informacoes/-112019-sobre').update({
            data: new Date().toLocaleString(),
            informacao: sobre_def
        });
    }
    salvarDadosSobre(sobre_def);
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

// recuperar dados de lista de agendamentos    
var ref_lista_agendamento = firebase.database().ref().child("agendamentos");
ref_lista_agendamento.on("child_added", (snap) => {
    var id = snap.child("id").val();
    var consulta = snap.child("consulta").val();
    var nome = snap.child("paciente_nome").val();
    var apelido = snap.child("paciente_apelido").val();
    var pac = snap.child("paciente_pac").val();
    var medico = snap.child("agendamento_medico").val();
    var celular = snap.child("paciente_celular").val();
    var pac = snap.child("paciente_pac").val();
    var data = snap.child("agendamento_data").val();
    var hora_inicial = snap.child("agendamento_hora_inicial").val();
    var hora_final = snap.child("agendamento_hora_final").val();
    var hora_paciente = snap.child("agendamento_hora_paciente").val();

    $("#tbl_agendamento_corpo").append("<tr data-id='"
        + id + "'><td>"
        + nome + "</td><td>"
        + apelido + "</td><td>"
        + pac + "</td><td>"
        + celular + "</td><td>"
        + consulta + "</td><td>"
        + medico + "</td><td>"
        + data + ' | ' + hora_inicial + ' ás ' + hora_final + "</td><td>"
        + hora_paciente + "</td><td>"
        + "<button class='btn-remover-lista-agendamento btn btn-danger'>Terminar</button></td>"
        + "</tr>");
});

var ref_lista_agendamento = firebase.database().ref().child("agendamentos");
// remover dados de lista de agendamentos
$("#tbl_agendamento_corpo").on('click', '.btn-remover-lista-agendamento', function (e) {
    var $row = $(this).closest('tr'),
        rowId = $row.data('id');
    var rowId = $row.data('id');

    ref_lista_agendamento.child(rowId).remove()
        .then(function () {
            $row.remove();
        })
        .catch(function (error) {
            console.log('ERROR');
        });
});

// recuperar dados de lista de conversas    
var ref_lista_conversas = firebase.database().ref().child("mensagens");
ref_lista_conversas.on("child_added", (snap) => {
    var id = snap.key;

    var ref_lista_conversas_paciente_inf = firebase.database().ref().child("usuarios/pacientes/" + id);
    var ref_lista_conversas_paciente = firebase.database().ref().child("mensagens/" + id);

    ref_lista_conversas_paciente_inf.once("value", (snap) => {
        var nome = snap.child("nome").val();
        var apelido = snap.child("apelido").val();

        $("#tbl_lista_conversas_corpo").append("<tr data-id='"
            + id + "'><td>"
            + nome + "</td><td>"
            + apelido + "</td><td>"
            + "<button id='btn-abrir-conversa' class='btn btn-primary' data-toggle='modal' data-target='#modal-chat'>Abrir</button></td></tr>");

    });
});

$("#tbl_lista_conversas_corpo").on('click', '#btn-abrir-conversa', function (e) {
    var $row = $(this).closest('tr'),
        rowId = $row.data('id');

    var rowId = $row.data('id');
    idPacienteChat = rowId;

    // recuperar dados de lista de chat de mensagens    
    var ref_lista_chat_mensagens = firebase.database().ref().child("mensagens/" + idPacienteChat);

    ref_lista_chat_mensagens.once("value", (snap) => {
        var idMensagemChat = snap.key;

        var ref_lista_chat_paciente_inf = firebase.database().ref().child("usuarios/pacientes/" + idPacienteChat);
        var ref_lista_chat_paciente = firebase.database().ref().child("mensagens/" + idPacienteChat);

        ref_lista_chat_paciente_inf.once("value", (snap) => {
            var nome = snap.child("nome").val();
            var apelido = snap.child("apelido").val();

            ref_lista_chat_paciente.on("child_added", (snap) => {
                var id = snap.child("id").val();
                var mensagem = snap.child("mensagem").val();
                var deUsuario = snap.child("usuario").val();
                var data = snap.child("data").val();
                var deId = snap.child("deId").val();
                var nomeMensagem;

                var ref_lista_chat_cme_inf = firebase.database().ref().child("usuarios/cme/" + deId);
                ref_lista_chat_cme_inf.once("value", (snap) => {
                    var cme_nome = snap.child("nome").val();

                    if (deUsuario == "cme") {
                        nomeMensagem = "CME: (" + cme_nome + ")";
                        $("#tbl_lista_chat_corpo").append("<tr class='table-secondary' data-id='"
                            + id + "'><td>"
                            + nomeMensagem + "</td><td>"
                            + mensagem + "</td><td>"
                            + data + "</td></tr>");
                    }
                    else {
                        nomeMensagem = nome + " " + apelido;
                        $("#tbl_lista_chat_corpo").append("<tr class='table-success' data-id='"
                            + id + "'><td>"
                            + nomeMensagem + "</td><td>"
                            + mensagem + "</td><td>"
                            + data + "</td></tr>");
                    }
                });
            });
        });
    });

});

// responder mensagem chat
const responderMensagemChat = document.querySelector('#chat');
responderMensagemChat.addEventListener('submit', (e) => {
    e.preventDefault();

    // recuperar informações da mensagem chat
    const mensagem = responderMensagemChat['enviar-mensagem-chat'].value;

    var idPush = db.ref().push();
    var idMensagemChat = idPush.key;

    document.querySelector("#chat").reset();

    function escreverMensagemChat(mensagem, idMensagemChat) {

        db.ref('mensagens/' + idPacienteChat + "/" + idMensagemChat).set({
            id: idMensagemChat,
            de: "cme",
            deId: idUsuario,
            tempo: firebase.database.ServerValue.TIMESTAMP,
            mensagem: mensagem,
            data: new Date().toLocaleString(),
            usuario: "cme",
        });
    }

    escreverMensagemChat(mensagem, idMensagemChat);

});

// recuperar dados de lista de usuarios    
var ref_lista_usuario = firebase.database().ref().child("usuarios/cme");
ref_lista_usuario.on("child_added", (snap) => {
    var id = snap.child("id").val();
    var nome = snap.child("nome").val();
    var email = snap.child("email").val();
    var usuario = snap.child("usuario").val();

    $("#tbl_lista_usuario_corpo").append("<tr data-id='"
        + id + "'><td>"
        + nome + "</td><td>"
        + email + "</td><td>"
        + usuario + "</td></tr>");

});
/*
// var ref_lista_usuario = firebase.database().ref().child("usuarios/cme");
 
// remover dados de lista de usuarios
// $("#tbl_lista_usuario_corpo").on('click', '.btn-remover-lista-usuario', function (e) {
//    var $row = $(this).closest('tr'),
 //       rowId = $row.data('id');
  //  var rowId = $row.data('id');
 
    //ref_lista_usuario.child(rowId).remove()
      //  .then(function () {
        //    $row.remove();
       // })
       // .catch(function (error) {
       //     console.log('ERROR');
      //  });
// });
*/

// recuperar dados de lista de pacientes    
var ref_lista_paciente = firebase.database().ref().child("usuarios/pacientes");
ref_lista_paciente.on("child_added", (snap) => {
    var id = snap.child("id").val();
    var nome = snap.child("nome").val();
    var apelido = snap.child("apelido").val();
    var celular = snap.child("celular").val();
    var nascimento = snap.child("nascimento").val();
    var regiao = snap.child("regiao").val();
    var provincia = snap.child("provincia").val();
    var residencia = snap.child("residencia").val();

    $("#tbl_lista_paciente_corpo").append("<tr data-id='"
        + id + "'><td>"
        + nome + "</td><td>"
        + apelido + "</td><td>"
        + celular + "</td><td>"
        + nascimento + "</td><td>"
        + regiao + ", " + provincia + ", " + residencia + "</td></tr>");

});
/*
var ref_lista_paciente = firebase.database().ref().child("usuarios/pacientes");
 
// remover dados de lista de pacientes
$("#tbl_lista_paciente_corpo").on('click', '.btn-remover-lista-paciente', function (e) {
    var $row = $(this).closest('tr'),
        rowId = $row.data('id');
    var rowId = $row.data('id');
 
    ref_lista_paciente.child(rowId).remove()
        .then(function () {
            $row.remove();
        })
        .catch(function (error) {
            console.log('ERROR');
        });
});
 
*/

// recuperar dados de consultas programadas    
var ref_consultas_programadas = firebase.database().ref().child("consultas");
ref_consultas_programadas.on("child_added", (snap) => {
    var id = snap.child("id").val();
    var consulta = snap.child("consulta").val();
    var medico = snap.child("consulta_medico").val();
    var data = snap.child("consulta_data").val();
    var hora_inicial = snap.child("consulta_hora_inicial").val();
    var hora_final = snap.child("consulta_hora_final").val();
    var data = snap.child("consulta_data").val();
    var ormm = snap.child("consulta_ormm").val();

    $("#tbl_consulta_corpo").append("<tr data-id='"
        + id + "'><td>"
        + consulta + "</td><td>"
        + medico + "</td><td>"
        + data + ' | ' + hora_inicial + ' ás ' + hora_final + "</td><td>"
        + ormm + "</td><td>"
        + "<button class='btn-remover-consulta-programada btn btn-danger'>Remover</button></td></tr>");

});

// recuperar dados de agendamentos pendentes    
var ref_agendamentos_pendente = firebase.database().ref().child("agendamentos-pendente");
ref_agendamentos_pendente.on("child_added", (snap) => {
    var id = snap.child("id").val();
    var nome = snap.child("paciente_nome").val();
    var apelido = snap.child("paciente_apelido").val();
    var pac = snap.child("paciente_pac").val();
    var consulta = snap.child("consulta").val();
    var medico = snap.child("consulta_medico").val();
    var data = snap.child("consulta_data").val();
    var hora_inicial = snap.child("consulta_hora_inicial").val();
    var hora_final = snap.child("consulta_hora_final").val();
    var hora_paciente = snap.child("consulta_hora_paciente").val();

    $("#tbl_agendamento_pendente_corpo").append("<tr data-id='"
        + id + "'><td>"
        + nome + "</td><td>"
        + apelido + "</td><td>"
        + pac + "</td><td>"
        + consulta + "</td><td>"
        + medico + "</td><td>"
        + data + ' | ' + hora_inicial + ' ás ' + hora_final + "</td><td>"
        + hora_paciente + "</td><td>"
        + "<button class='btn-permitir-agendamento-pendente btn btn-primary'>Permitir</button> | "
        + "<button class='btn-remover-agendamento-pendente btn btn-danger'>Cancelar</button></td>"
        + "</tr>");

});

// recuperar dados de agendamentos desmarcado    
var ref_agendamentos_desmarcado = firebase.database().ref().child("agendamentos-desmarcado");
ref_agendamentos_desmarcado.on("child_added", (snap) => {
    var id = snap.child("id").val();
    var nome = snap.child("paciente_nome").val();
    var apelido = snap.child("paciente_apelido").val();
    var pac = snap.child("paciente_pac").val();
    var consulta = snap.child("consulta").val();
    var medico = snap.child("agendamento_medico").val();
    var data = snap.child("agendamento_data").val();
    var hora_inicial = snap.child("agendamento_hora_inicial").val();
    var hora_final = snap.child("agendamento_hora_final").val();
    var hora_paciente = snap.child("agendamento_hora_paciente").val();

    $("#tbl_agendamento_desmarcado_corpo").append("<tr data-id='"
        + id + "'><td>"
        + nome + "</td><td>"
        + apelido + "</td><td>"
        + pac + "</td><td>"
        + consulta + "</td><td>"
        + medico + "</td><td>"
        + data + ' | ' + hora_inicial + ' ás ' + hora_final + "</td><td>"
        + hora_paciente + "</td><td>"
        + "<button class='btn-remover-agendamento-desmarcado btn btn-danger'>Terminar</button></td>"
        + "</tr>");

});

// remover agendamento desmarcado
$("#tbl_agendamento_desmarcado_corpo").on('click', '.btn-remover-agendamento-desmarcado', function (e) {
    var $row = $(this).closest('tr'), rowId = $row.data('id');
    var rowId = $row.data('id');

    ref_agendamentos_desmarcado.remove()
        .then(function () {
            $row.remove();
        })
        .catch(function (error) {
            console.log('ERROR');
        });
});

// permitir agendamento
$("#tbl_agendamento_pendente_corpo").on('click', '.btn-permitir-agendamento-pendente', function (e) {
    var $row = $(this).closest('tr'), rowId = $row.data('id');
    var rowId = $row.data('id');

    // recuperar informações do agendamento pendente
    var ref_agendamentos_val = firebase.database().ref().child('agendamentos-pendente' + '/' + rowId);

    ref_agendamentos_val.once('value', (snap) => {

        var consulta = snap.child("consulta").val();
        var agendamento_data = snap.child("consulta_data").val();
        var agendamento_hora_final = snap.child("consulta_hora_final").val();
        var agendamento_hora_inicial = snap.child("consulta_hora_inicial").val();
        var agendamento_hora_paciente = snap.child("consulta_hora_paciente").val();
        var consulta_id = snap.child("consulta_id").val();
        var agendamento_inf = snap.child("consulta_inf").val();
        var agendamento_medico = snap.child("consulta_medico").val();
        var agendamento_ormm = snap.child("consulta_ormm").val();
        var paciente_apelido = snap.child("paciente_apelido").val();
        var paciente_bi = snap.child("paciente_bi").val();
        var paciente_celular = snap.child("paciente_celular").val();
        var paciente_id = snap.child("paciente_id").val();
        var paciente_nascimento = snap.child("paciente_nascimento").val();
        var paciente_nome = snap.child("paciente_nome").val();
        var paciente_pac = snap.child("paciente_pac").val();
        var paciente_provincia = snap.child("paciente_provincia").val();
        var paciente_regiao = snap.child("paciente_regiao").val();
        var paciente_residencia = snap.child("paciente_residencia").val();
        var paciente_sexo = snap.child("paciente_sexo").val();

        var idPush = db.ref().push();
        var agendamento_id = idPush.key;

        function passarDadosAgendamento(consulta, agendamento_data, agendamento_hora_final,
            agendamento_hora_inicial, agendamento_hora_paciente, consulta_id, agendamento_inf, agendamento_medico,
            agendamento_ormm, paciente_apelido, paciente_bi, paciente_celular, paciente_nascimento, paciente_nome,
            paciente_id, paciente_pac, paciente_provincia, paciente_regiao, paciente_residencia, paciente_sexo) {

            db.ref('agendamentos/' + agendamento_id).set({
                id: agendamento_id,
                consulta: consulta,
                agendamento_data: agendamento_data,
                agendamento_hora_final: agendamento_hora_final,
                agendamento_hora_inicial: agendamento_hora_inicial,
                agendamento_hora_paciente: agendamento_hora_paciente,
                consulta_id: consulta_id,
                agendamento_inf: agendamento_inf,
                agendamento_medico: agendamento_medico,
                agendamento_ormm: agendamento_ormm,
                paciente_apelido: paciente_apelido,
                paciente_bi: paciente_bi,
                paciente_celular: paciente_celular,
                paciente_nascimento: paciente_nascimento,
                paciente_nome: paciente_nome,
                paciente_id: paciente_id,
                paciente_pac: paciente_pac,
                paciente_provincia: paciente_provincia,
                paciente_regiao: paciente_regiao,
                paciente_residencia: paciente_residencia,
                paciente_sexo: paciente_sexo
            });

            var idPushNot = db.ref().push();
            var idPushNot2 = db.ref().push();
            var notificacao_id = idPushNot.key;
            var notificacao_id2 = idPushNot2.key;

            // notificar paciente
            db.ref('notificacoes/' + paciente_id + '/' + notificacao_id2).set({
                id: notificacao_id2,
                titulo: "Pagamento efectuado",
                descricao: "Efectuou com sucesso o pagamento para a consulta de " + consulta + ".",
                paciente_id: paciente_id
            });

            // notificar paciente
            db.ref('notificacoes/' + paciente_id + '/' + notificacao_id).set({
                id: notificacao_id,
                titulo: "Confirmação de agendamento",
                descricao: "A consulta de " + consulta + " agendado para " + agendamento_data + " às " + agendamento_hora_paciente + " foi confirmado, verifique o seu agendamento.",
                paciente_id: paciente_id
            });

        }

        passarDadosAgendamento(consulta, agendamento_data, agendamento_hora_final, agendamento_hora_inicial,
            agendamento_hora_paciente, consulta_id, agendamento_inf, agendamento_medico, agendamento_ormm,
            paciente_apelido, paciente_bi, paciente_celular, paciente_nascimento, paciente_nome, paciente_id,
            paciente_pac, paciente_provincia, paciente_regiao, paciente_residencia, paciente_sexo);

        ref_agendamentos_val.remove()
            .then(function () {
                $row.remove();
            })
            .catch(function (error) {
                console.log('ERROR');
            });
    });
});

var ref_agendamentos_pendente = firebase.database().ref().child("agendamentos-pendente");

// remover dados de agendamento pendente
$("#tbl_agendamento_pendente_corpo").on('click', '.btn-remover-agendamento-pendente', function (e) {
    var $row = $(this).closest('tr'),
        rowId = $row.data('id');
    var rowId = $row.data('id');

    ref_agendamentos_pendente.child(rowId).remove()
        .then(function () {
            $row.remove();
            
        })
        .catch(function (error) {
            console.log('ERROR');
        });
});

var ref_consultas_programadas = firebase.database().ref().child("consultas");

// remover dados de consultas programadas
$("#tbl_consulta_corpo").on('click', '.btn-remover-consulta-programada', function (e) {
    var $row = $(this).closest('tr'),
        rowId = $row.data('id');
    var rowId = $row.data('id');

    ref_consultas_programadas.child(rowId).remove()
        .then(function () {
            $row.remove();
        })
        .catch(function (error) {
            console.log('ERROR');
        });
});

// accordion menu
$(document).ready(function () {
    $(".collapse").on('show.bs.collapse', function () {
        $(this).parent(".card").find(".toggle").addClass("rotate");
    }).on('hide.bs.collapse', function () {
        $(this).parent(".card").find(".toggle").removeClass("rotate");
    });
});

// programar consulta
const programarConsulta = document.querySelector('#programar-consulta');
programarConsulta.addEventListener('submit', (e) => {
    e.preventDefault();

    // recuperar informações da consulta
    const consulta = programarConsulta['programar-consulta-consulta'].value;
    const consulta_medico = programarConsulta['programar-consulta-medico'].value;
    const consulta_inf = programarConsulta['programar-consulta-inf'].value;
    const consulta_ormm = programarConsulta['programar-consulta-ormm'].value;
    const consulta_data = programarConsulta['programar-consulta-data'].value;
    const consulta_hora_inicial = programarConsulta['programar-consulta-inicio'].value;
    const consulta_hora_final = programarConsulta['programar-consulta-fim'].value;

    var idPush = db.ref().push();
    var idConsulta = idPush.key;

    document.querySelector("#programar-consulta").reset();
    $('#modal-adicionar-consulta').hide();
    $('.modal-backdrop').hide();

    function writeUserData(consulta, consulta_medico, consulta_inf, consulta_ormm, consulta_data, consulta_hora_inicial, consulta_hora_final, idConsulta) {

        db.ref('consultas/' + idConsulta).set({
            id: idConsulta,
            consulta: consulta,
            consulta_data: consulta_data,
            consulta_hora_inicial: consulta_hora_inicial,
            consulta_hora_final: consulta_hora_final,
            consulta_inf: consulta_inf,
            consulta_medico: consulta_medico,
            consulta_ormm: consulta_ormm,
        });
    }

    writeUserData(consulta, consulta_medico, consulta_inf, consulta_ormm, consulta_data, consulta_hora_inicial, consulta_hora_final, idConsulta);

});





