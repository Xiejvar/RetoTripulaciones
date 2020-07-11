import React,{ Component } from 'react';

class CheckEmail extends Component{

    componentDidMount(){
        this.confirmEmail()
    }
    confirmEmail(){
        const search = this.props.location.search
        const params = new URLSearchParams(search)
        let tok = params.get('tok')
        tok = encodeURIComponent(tok)
        fetch(`http://localhost:1024/checkEmail?tok=${tok}`)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if(res.valid){
                this.props.history.push('/')
            }
        })
    }
    render(){
        return(
            <h1>Usuario no ha sido confirmado</h1>
        )
    }
}

export default CheckEmail