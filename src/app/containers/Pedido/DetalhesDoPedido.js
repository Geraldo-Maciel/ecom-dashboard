import React, { Component } from 'react';
import Titulo from '../../components/Texto/Titulo';
import { TextoDados } from '../../components/Texto/Dados';
import ButtonSimples from '../../components/Button/Simples';
import TabelaSimples from '../../components/Tabela/Simples';

import { connect } from 'react-redux';
import { formatMoney } from '../../actions';
import moment from 'moment';
import * as actions from '../../actions/pedidos';

import AlertGeral from '../../components/Alert/Geral';

class DetalhesDoPedido extends Component {

    state = {
        aviso: null
    }

    cancelarPedido = () => {
        const { usuario, pedido } = this.props;
        if(!usuario || !pedido) return null;
        if(window.confirm("Você realmente deseja cancelar esse pedido?")){
            this.props.cancelarPedido(pedido.pedido._id, usuario.loja, (error) => {
                this.setState({ 
                    aviso: { 
                        status: !error, 
                        msg: error ? error.message : "Pedido cancelado com sucesso!" 
                    } 
                });
            });
        }
    }

    renderCabecalho(){
        if(!this.props.pedido) return null;
        const { pedido } = this.props.pedido;
        return (
            <div className="flex">
                <div className="flex-1 flex">
                    <Titulo tipo="h2" titulo={`Pedido - ${pedido.cliente ? pedido.cliente.nome : "" } - ${moment(pedido.createdAt).format("DD/MM/YYYY")}`} />
                </div>
                <div className="flex-1 flex flex-end">
                    {
                        pedido.cancelado ? (
                            <ButtonSimples 
                                type="danger" 
                                label="CANCELADO" />
                        ) : (
                            <ButtonSimples 
                                type="danger" 
                                label="CANCELAR PEDIDO" 
                                onClick={() => this.cancelarPedido()} />
                        )
                    }
                </div>
            </div>
        )
    }

    renderDadosDoCliente(){
        if(!this.props.pedido) return null;
        const { cliente } = this.props.pedido.pedido;
        return (
            <div className="flex-2">
                <Titulo tipo="h4" titulo="Dados do Cliente" />
                <br />
                <TextoDados chave="Nome" valor={cliente ? cliente.nome : ""} />
                <TextoDados chave="CPF" valor={ cliente ? cliente.cpf : "" } />
                <TextoDados chave="Telefone" valor={ cliente ? cliente.telefones[0] : "" } />
                <TextoDados chave="Data de Nascimento" valor={cliente ? moment(cliente.dataDeNascimento).format("DD/MM/YYYY") : ""} />
            </div>
        )
    }

    renderDadosDeEntrega(){
        if(!this.props.pedido) return null;
        const { entrega } = this.props.pedido.pedido;
        return (
            <div className="flex-2">
                <Titulo tipo="h4" titulo="Dados de Entrega" />
                <br />
                <TextoDados chave="Endereco" valor={entrega ? entrega.endereco.local : ""} />
                <TextoDados chave="Numero" valor={entrega ? entrega.endereco.numero : ""} />
                <TextoDados chave="Bairro" valor={entrega ? entrega.endereco.bairro : ""} />
                <TextoDados chave="Cidade" valor={entrega ? entrega.endereco.cidade : ""} />
                <TextoDados chave="Estado" valor={entrega ? entrega.endereco.estado : ""} />
                <TextoDados chave="CEP" valor={entrega ? entrega.endereco.CEP : ""} />
            </div>
        )
    }

    renderDadosDePagamento(){
        if(!this.props.pedido) return null;
        const { entrega, pagamento } = this.props.pedido.pedido;
        return (
            <div className="flex-3">
                <Titulo tipo="h4" titulo="Dados de Pagamento" />
                <br />
                <TextoDados chave="Taxa de Entrega" valor={`${formatMoney(entrega.custo)} (${entrega.tipo})`} />
                <TextoDados chave="Valor do Pedido" valor={`${formatMoney( pagamento.valor - entrega.custo )}`} />
                <TextoDados chave="Valor Total" valor={`${formatMoney(pagamento.valor)}`} />
                <TextoDados chave="Forma de Pagamento" valor={pagamento.forma} />
            </div>
        )
    }

    renderDadosDoCarrinho(){
        if(!this.props.pedido) return null;
        const { carrinho } = this.props.pedido.pedido;
        const dados = [];
        carrinho.forEach((item) => {
            dados.push({
                "Produto": item.produto.titulo + " - " + item.variacao.nome,
                "Preço Und.": formatMoney(item.precoUnitario),
                "Quantidade": item.quantidade,
                "Preço Total": formatMoney(item.precoUnitario * item.quantidade)
            });
        });
        return (
            <div className="flex-3">
                <Titulo tipo="h4" titulo="Carrinho" />
                <br />
                <TabelaSimples 
                    cabecalho={[ "Produto", "Preço Und.", "Quantidade", "Preço Total" ]}
                    dados={dados} />
            </div>
        )
    }

    render(){
        return (
            <div className="Detalhes-do-Pedido">
                { this.renderCabecalho() }
                <AlertGeral aviso={this.state.aviso} />
                <div className="flex vertical">
                    <div className="flex horizontal">
                        { this.renderDadosDoCliente() }
                        { this.renderDadosDoCarrinho() }
                    </div>
                    <div className="flex horizontal">
                        { this.renderDadosDeEntrega() }
                        { this.renderDadosDePagamento() }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    pedido: state.pedido.pedido,
    usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(DetalhesDoPedido);
/*
import React, { Component } from 'react';

import Titulo from '../../components/Texto/Titulo';
import { TextoDados } from '../../components/Texto/Dados';
import ButtonSimples from '../../components/Button/Simples';
import TabelaSimples from '../../components/Tabela/Simples';

//import { connect } from 'react-redux';
//import { formatMoney } from '../../actions';

import moment from 'moment';

import * as actions from '../../actions/pedidos';

import AlertGeral from '../../components/Alert/Geral';

class DetalhesDoPedido extends Component {

    state = {
        aviso: null
    }

    cancelarPedido = () => {
        const { usuario, pedido } = this.props;
        if(!usuario || !pedido) return null;
        if(window.confirm("Você realmente deseja cancelar esse pedido?")){
            this.props.cancelarPedido(pedido.pedido._id, usuario.loja, (error) => {
                this.setState({ 
                    aviso: { 
                        status: !error, 
                        msg: error ? error.message : "Pedido cancelado com sucesso!" 
                    } 
                });
            });
        }
    }

    renderCabecalho(){
        return (
            <div className="flex">
                <div className="flex-1 flex">
                    <Titulo tipo="h4" titulo="Pedido - Cliente 1 - 04/04/2019" />
                </div>
                <div className="flex-1 flex flex-end">
                            <ButtonSimples 
                                type="danger" 
                                label="CANCELAR PEDIDO" 
                                onClick={() => this.cancelarPedido()} />
                </div>
            </div>
        )
    }
/*    
    renderCabecalho(){
        if(!this.props.pedido) return null;
        const { pedido } = this.props.pedido;
        return (
            <div className="flex">
                <div className="flex-1 flex">
                    <Titulo tipo="h2" titulo={`Pedido - ${pedido.cliente ? pedido.cliente.nome : "" } - ${moment(pedido.createdAt).format("DD/MM/YYYY")}`} />
                </div>
                <div className="flex-1 flex flex-end">
                    {
                        pedido.cancelado ? (
                            <ButtonSimples 
                                type="danger" 
                                label="CANCELADO" />
                        ) : (
                            <ButtonSimples 
                                type="danger" 
                                label="CANCELAR PEDIDO" 
                                onClick={() => this.cancelarPedido()} />
                        )
                    }
                </div>
            </div>
        )
    }
*/
/*
    renderDadosDoCliente(){
//        if(!this.props.pedido) return null;
//        const { cliente } = this.props.pedido.pedido;

        return (
            <div className="flex-2">
                <Titulo tipo="h4" titulo="Dados do Cliente" />
                <br />
                <TextoDados chave="Nome" valor="Cliente 1" />
                <TextoDados chave="CPF" valor="111.222.333-45" />
                <TextoDados chave="Telefone" valor="11 1234-5678" />
                <TextoDados chave="Data de Nascimento" valor="10/04/1990" />
            </div>
/*
        return (
            <div className="flex-2">
                <Titulo tipo="h4" titulo="Dados do Cliente" />
                <br />
                <TextoDados chave="Nome" valor={cliente ? cliente.nome : ""} />
                <TextoDados chave="CPF" valor={ cliente ? cliente.cpf : "" } />
                <TextoDados chave="Telefone" valor={ cliente ? cliente.telefones[0] : "" } />
                <TextoDados chave="Data de Nascimento" valor={cliente ? moment(cliente.dataDeNascimento).format("DD/MM/YYYY") : ""} />
            </div>
*/
/*
        )
    }

    renderDadosDeEntrega(){
//        if(!this.props.pedido) return null;
//        const { entrega } = this.props.pedido.pedido;
        return (
            <div className="flex-2">
                <Titulo tipo="h4" titulo="Dados de Entrega" />
                <br />
                <TextoDados chave="Endereco" valor="Rua teste, 123" />
                <TextoDados chave="Numero" valor="Centro" />
                <TextoDados chave="Bairro" valor="Uberaba" />
                <TextoDados chave="Cidade" valor="Minas Gerais" />
                <TextoDados chave="Estado" valor="MG" />
                <TextoDados chave="CEP" valor="38540-123" />
            </div>
        )
/*        
        return (
            <div className="flex-2">
                <Titulo tipo="h4" titulo="Dados de Entrega" />
                <br />
                <TextoDados chave="Endereco" valor={entrega ? entrega.endereco.local : ""} />
                <TextoDados chave="Numero" valor={entrega ? entrega.endereco.numero : ""} />
                <TextoDados chave="Bairro" valor={entrega ? entrega.endereco.bairro : ""} />
                <TextoDados chave="Cidade" valor={entrega ? entrega.endereco.cidade : ""} />
                <TextoDados chave="Estado" valor={entrega ? entrega.endereco.estado : ""} />
                <TextoDados chave="CEP" valor={entrega ? entrega.endereco.CEP : ""} />
            </div>
        )
*/
/*
    }

    renderDadosDePagamento(){
//        if(!this.props.pedido) return null;
//        const { entrega, pagamento } = this.props.pedido.pedido;
        return (
            <div className="flex-3">
                <Titulo tipo="h4" titulo="Dados de Pagamento" />
                <br />
                <TextoDados chave="Taxa de Entrega" valor="R$ 15,50 (PAC)" />
                <TextoDados chave="Valor do Pedido" valor="R$ 32,00" />
                <TextoDados chave="Valor Total" valor="R$ 47,50" />
                <TextoDados chave="Forma de Pagamento" valor="BOLETO" />
            </div>
        )
/*        
        return (
            <div className="flex-3">
                <Titulo tipo="h4" titulo="Dados de Pagamento" />
                <br />
                <TextoDados chave="Taxa de Entrega" valor={`${formatMoney(entrega.custo)} (${entrega.tipo})`} />
                <TextoDados chave="Valor do Pedido" valor={`${formatMoney( pagamento.valor - entrega.custo )}`} />
                <TextoDados chave="Valor Total" valor={`${formatMoney(pagamento.valor)}`} />
                <TextoDados chave="Forma de Pagamento" valor={pagamento.forma} />
            </div>
        )
*/ 
/*       
    }

    renderDadosDoCarrinho(){
/*        
        if(!this.props.pedido) return null;
        const { carrinho } = this.props.pedido.pedido;
        const dados = [];
        carrinho.forEach((item) => {
            dados.push({
                "Produto": item.produto.titulo + " - " + item.variacao.nome,
                "Preço Und.": formatMoney(item.precoUnitario),
                "Quantidade": item.quantidade,
                "Preço Total": formatMoney(item.precoUnitario * item.quantidade)
            });
        });
*/
/*
        const dados = [
            {
                "Produto": "Produto 1",
                "Preço Und.": "R$ 69,90",
                "Quantidade": "1",
                "Preço Total": "R$ 12,00"
            },
            {
                "Produto": "Produto 2",
                "Preço Und.": "R$ 10,00",
                "Quantidade": "2",
                "Preço Total": "R$ 20,00"
            }
        ]        
        return (
            <div className="flex-3">
                <Titulo tipo="h4" titulo="Carrinho" />
                <br />
                <TabelaSimples 
                    cabecalho={[ "Produto", "Preço Und.", "Quantidade", "Preço Total" ]}
                    dados={dados} />
            </div>
        )
    }

    render(){
        return (
            <div className="Detalhes-do-Pedido">
                { this.renderCabecalho() }
                <div className="flex vertical">
                    <div className="flex horizontal">
                        { this.renderDadosDoCliente() }
                        { this.renderDadosDoCarrinho() }
                    </div>
                    <div className="flex horizontal">
                        { this.renderDadosDeEntrega() }
                        { this.renderDadosDePagamento() }
                    </div>
                </div>
            </div>
        )
    }
}

//const mapStateToProps = state => ({
//    pedido: state.pedido.pedido,
//    usuario: state.auth.usuario
//})

//export default connect(mapStateToProps, actions)(DetalhesDoPedido);
export default DetalhesDoPedido;
*/