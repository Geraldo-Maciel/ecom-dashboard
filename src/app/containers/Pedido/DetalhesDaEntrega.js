import React, {Component} from 'react';

import Titulo from '../../components/Texto/Titulo';
import ListaDinamica from '../../components/Listas/ListaDinamicaSimples';
import InputValor from '../../components/Inputs/InputValor';

import * as actions from '../../actions/pedidos';
import {connect} from 'react-redux';
import AlertGeral from '../../components/Alert/Geral';

class DetalhesDaEntrega extends Component {
    state = {
        aviso: null
    }

    cleanState () {
        this.setState ({aviso: null})
    }

    onAddListaDinamica = (texto) => {
        if (!texto) return this.setState ({aviso: {status: false, msg: "Preencha o campo para enviar um novo status"}});
        this.setNovoStatus (texto, undefined);
    }

    setNovoStatus = (status, codigoRastreamento) => {
        this.cleanState ();

        const {pedido, usuario} = this.props;
        if (!usuario || !pedido) return false;
//        if (!usuario || !pedido) return falso;
        this.props.setNovoStatusEntrega (
            {status, codigoRastreamento},
            pedido.pedido.entrega._id, pedido.pedido._id, usuario.loja,
            (erro) => {
                if (erro) this.setState ({aviso: false, msg: erro.message});
            }
        )
    }

    handleSubmit = (value) => {
        if (!value) return this.setState ({aviso: {status: false, msg: "Preencha o código de rastreamento corretamente"}});
        this.setNovoStatus ("Atualização no Cód. de Rastreamento", value);
    }

    render () {
        
        const {pedido} = this.props;
        const {aviso} = this.state;
        if (!pedido) return <div> </div>;

        const status = (pedido.registros || [])
                        .reduce ((all, item) => item.tipo === 'entrega'? all.concat([item.situacao]) : all, []);
        const {codigoRastreamento} = pedido.pedido.entrega;
        return (
            <div className = "Detalhes-do-Entrega">
                <Titulo type = "h3" titulo = "Entrega" />
                <AlertGeral aviso = {aviso} />
                <br />
                <label> Código de Rastreamento </label>
                <InputValor
                    valor = {codigoRastreamento}
                    handleSubmit = {(value) => this.handleSubmit (value)}
                    nome = {"codigoRastreamento"} />
                <br />
                <ListaDinamica
                    dados = {status}
                    onAdd = {this.onAddListaDinamica} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    pedido: state.pedido.pedido,
    usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions) (DetalhesDaEntrega);
/*
import React, {Component} from 'react';

import Titulo from '../../components/Texto/Titulo';
import ListaDinamica from '../../components/Listas/ListaDinamicaSimples';
import InputValor from '../../components/Inputs/InputValor';

//import * como ações from '../../actions/pedidos';
//import {conectar} from 'react-redux';
//import AlertGeral from '../../components/Alert/Geral';

class DetalhesDaEntrega extends Component {

    state = {
        status: [
            "Preparando para Envio",
            "Entrega a Transportador",
            "Em Trânsito"
        ],
        codigoDeeRastreamento: "PA123456912BR"
    }

//    cleanState () {
//        this.setState ({aviso: null})
//    }

    onAddListaDinamica = (texto) => {
        if (!texto) return false;
        let {status} = this.state;
        status.push(texto);
        this.setState({ status });
    }

/*
    setNovoStatus = (status, codigoRastreamento) => {
        this.cleanState ();

        const {pedido, usuario} = this.props;
        if (! usuario ||! pedido) retorna falso;
        this.props.setNovoStatusEntrega (
            {status, codigoRastreamento},
            pedido.pedido.entrega._id, pedido.pedido._id, usuario.loja,
            (erro) => {
                if (erro) this.setState ({aviso: false, msg: error.message});
            }
        )
    }
*/
/*
    handleSubmit = (value) => {
        this.setState({ codigoDeRastreamento: value });
        alert("Salvo!");
//        if (! value) return this.setState ({aviso: {status: false, msg: "Preencha o código de rastreamento corretamente"}});
//        this.setNovoStatus ("Atualização no Cód. de Rastreamento", valor);
    }

    render(){
/*        
        const {pedido} = this.props;
        const {aviso} = this.state;
        if (! pedido) return <div> </div>;

        const status = (pedido.registros || [])
                        .reduce ((all, item) => item.tipo === 'entrega'? all.concat ([item.situacao]): all, []);
        const {codigoRastreamento} = pedido.pedido.entrega;
*/
/*
        const { status, codigoDeRastreamento } = this.state;
        return (
            <div className = "Detalhes-da-Entrega">
                <Titulo tipo = "h3" titulo = "Entrega" />
                <br />
                <label> Código de Rastreamento </label>
                <InputValor
                    valor = {codigoDeRastreamento}
                    handleSubmit = {(value) => this.handleSubmit(value)}
                    nome = {"codigoRastreamento"} />
                <br />
                <ListaDinamica
                    dados = {status}
                    onAdd = {this.onAddListaDinamica} />
            </div>

        )
/*            
            <div className = "Detalhes-do-Entrega">
                <Titulo tipo = "h3" titulo = "Entrega" />
                <AlertGeral aviso = {aviso} />
                <br />
                <label> Código de Rastreamento </label>
                <InputValor
                    valor = {codigoRastreamento}
                    handleSubmit = {(value) => this.handleSubmit (value)}
                    nome = {"codigoRastreamento"} />
                <br />
                <ListaDinamica
                    dados = {status}
                    onAdd = {this.onAddListaDinamica} />
            </div>
*/
/*
    }
}

//const mapStateToProps = state => ({
//    pedido: state.pedido.pedido,
//    usuario: state.auth.usuario
//})

//exportar conexão padrão (mapStateToProps, ações) (DetalhesDaEntrega);
export default DetalhesDaEntrega;
*/