import React, {Component} from 'react';

import DetalhesDoCliente from './detalhesDoCliente';
import DetalhesDosPedidos from './detalhesdosPedidos';

import {connect} from 'react-redux';
import * as actions from '../../actions/clientes';

class Cliente extends Component {

    componentWillMount () {
        const {usuario} = this.props;
        const {id} = this.props.match.params;
        if (!usuario) return null ;;
        this.props.getCliente (id, usuario.loja);
    }

    componentWillUnmount () {
        this.props.limparCliente ();
    }

    render () {
        return (
            <div className = "Cliente full-width flex vertical">
                <div className = "Card">
                    <DetalhesDoCliente history = {this.props.history} />
                </div>
                <div className = "Sub-Card">
                    <DetalhesDosPedidos id = {this.props.match.params.id} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions) (Cliente);
/*
import React, {Component} from 'react';

import DetalhesDoCliente from './detalhesDoCliente';
import DetalhesDosPedidos from './detalhesDosPedidos';

//import {conectar} from 'react-redux';
//import * como ações de '../../actions/clientes';

class Cliente extends Component {
*/
/*
    componentWillMount () {
        const {usuario} = this.props;
        const {id} = this.props.match.params;npm start
        if (! usuario) return null ;;
        this.props.getCliente (id, usuario.loja);
    }

    componentWillUnmount () {
        this.props.limparCliente ();
    }
*/
/*
    render() {
        return (
            <div className = "Cliente full-width flex vertical">
                <div className = "Card">
                    <DetalhesDoCliente history = {this.props.history} />
                </div>
                <div className = "Sub-Card">
                    <DetalhesDosPedidos />
                </div>
            </div>
        )
    }
}

//const mapStateToProps = state => ({
//    usuario: state.auth.usuario
//})

//exportar conexão padrão (mapStateToProps, ações) (Cliente);
export default Cliente;
*/