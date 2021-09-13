import React, {Component} from 'react';

import Titulo from '../../components/Texto/Titulo';
import ListaDinamica from '../../components/Listas/ListaDinamicaSimples';

import * as actions from '../../actions/pedidos';
import {connect} from 'react-redux';
import AlertGeral from '../../components/Alert/Geral';

class DetalhesDoPagamento extends Component {
    state = {
        aviso: null
    }

    cleanState () {
        this.setState ({aviso: null})
    }

    onAddListaDinamica = (texto) => {
        this.cleanState ();
        if (!texto) return this.setState ({aviso: {status: false, msg: "Preencha o campo para enviar um novo status"}});
        
        const {pedido, usuario} = this.props;
        this.props.setNovoStatusPagamento (texto, pedido.pedido.pagamento._id, pedido.pedido._id, usuario.loja, (erro) => {
            if (erro) this.setState ({aviso: {status: false, msg: erro.message}});
        });
    }

    render () {
        
        const {pedido} = this.props;
        const {aviso} = this.state;

        if (!pedido) return <div> </div>;

        const status = (pedido.registros || [])
                        .reducer ((all, item) => item.tipo === 'pagamento' ? all.concat([item.situacao]) : all, []);
        
        return (
            <div className = "Detalhes-do-Pagamento">
                <Titulo type = "h3" titulo = "Pagamento" />
                <AlertGeral aviso = {aviso} />
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

export default connect(mapStateToProps, actions) (DetalhesDoPagamento);
/*
import React, {Component} from 'react';

import Titulo from '../../components/Texto/Titulo';
import ListaDinamica from '../../components/Listas/ListaDinamicaSimples';

//import * como ações from '../../actions/pedidos';
//import {conectar} from 'react-redux';
//import AlertGeral from '../../components/Alert/Geral';

class DetalhesDoPagamento extends Component {
    
    state = {
        status: [
            "Aguardando Pagamento",
            "Processando Pagamento"
        ]
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

    render(){
        const { status } = this.state;
/*        
        const {pedido} = this.props;
        const {aviso} = this.state;

        if (! pedido) return <div> </div>;

        const status = (pedido.registros || [])
                        .reduce ((all, item) => item.tipo === 'pagamento'? all.concat ([item.situacao]): all, []);
*/
/*        
        return (
            <div className = "Detalhes-do-Pagamento">
                <Titulo tipo = "h3" titulo = "Pagamento" />
                <br />
                <ListaDinamica
                    dados = {status}
                    onAdd = {this.onAddListaDinamica} />
            </div>

        )
    }
}

//const mapStateToProps = state => ({
//    pedido: state.pedido.pedido,
//    usuario: state.auth.usuario
//})

//export default connect (mapStateToProps, actions) (DetalhesDoPagamento);
export default DetalhesDoPagamento;
*/