import {TextField} from "@mui/material";
import {Dispatch, SetStateAction, useState} from "react";
import {useNavigation,} from "react-navi";

function Email (props: { email: string, setEmail: Dispatch<SetStateAction<string>>}) {
    return (
        <TextField
            label="email" variant="outlined" required={true} value={props.email} onChange={e => props.setEmail(e.target.value)}/>
    )
}

function Password (props: {password: string, setPassword: Dispatch<SetStateAction<string>>}) {
    return (
        <TextField label="password" variant="outlined" required={true} value={props.password} onChange={e => props.setPassword(e.target.value)}/>
    )
}

export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigation = useNavigation();

    let loginUser = () => {
        if (email && password) {
            fetchLogin(email, password).then(result => {
                localStorage.setItem('token',result.token);
                navigation.navigate('/home');
            })
        }
    }
    return (
        <div className="Login container h-100 w-100 d-flex justify-content-center align-items-center">
            <div className="w-100 row justify-content-center">
                <div className="col-lg-6 col-12">
                    <div className="container-fluid">
                        <div className="row">
                            <h2><b>login</b></h2>
                            <hr/>
                        </div>
                        <div className="row mb-2">
                            <Email email={email} setEmail={setEmail}></Email>
                        </div>
                        <div className="row mb-4">
                            <Password password={password} setPassword={setPassword}></Password>
                        </div>
                        <div className="row d-flex justify-content-end">
                            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                                <button disabled={!email || !password} className="w-100 btn btn-primary" onClick={loginUser}>
                                    login
                                </button>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-sm-0 mt-2">
                                <button className="w-100 btn btn-info">
                                    register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

async function fetchLogin(email: string, password: string): Promise<any> {
    const response =
        await fetch('http://localhost:4000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})});
    return response.json();
}
