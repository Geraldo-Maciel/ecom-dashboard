import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

const noAuth = Component => {
    class ComponentNoAuth extends React.Component {

        componentDidMount(){
            const { getUser, authorized, history, usuario } = this.props;
            getUser();
            if (authorized && usuario.role.includes("admin")) history.replace ("/");
        }

        componentDidUpdate(prevProps){
            const { authorized, history } = this.props;
            if (!authorized && prevProps.authorized && prevProps.usuario.role.includes("admin")) history.replace ("/");
//            if (!authorized && this.props.authorized && this.props.usuario.role.includes("admin")) history.replace ("/");
        }
/*
        componentWillMount () {
            const {getUser, authorized, history, usuario} = this.props;
            getUser ();
            if (authorized && usuario.role.includes("admin")) history.replace ("/");
        }

        componentWillUpdate (nextProps) {
            const {authorized, history} = this.props;
            if (!authorized && nextProps.authorized && nextProps.usuario.role.includes("admin")) history.replace ("/");
        }
*/
        render () {
            return (
                <div>
                    <Component {... this.props} />
                </div>
            )
        }
    }

    const mapStateToProps = state => ({
        authorized: state.auth.authorized,
        usuario: state.auth.usuario
    });
    return connect(mapStateToProps, actions) (ComponentNoAuth);
}

export default noAuth;
/*
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const noAuth = Component => {
    class ComponentnoAuth extends React.Component {

        componentDidMount(){
            const { getUser, authorized, history, usuario } = this.props;
            getUser();
            if (authorized && usuario.role.includes ("admin")) history.replace ("/");
        }

        componentDidUpdate(prevProps){
            const { authorized, history } = this.props;
            if (!authorized && this.props.authorized && this.props.usuario.role.includes ("admin")) history.replace ("/");
        }

        render(){
                return (
                    <div>
                        <Component {...this.props} />
                    </div>
                )
        }
    }

    const mapStateToProps = state => ({
        authorized: state.auth.authorized,
        usuario: state.auth.usuario
    });

    return connect(mapStateToProps, actions)(ComponentnoAuth);
}

export default noAuth;
*/