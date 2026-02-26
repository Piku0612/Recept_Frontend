import { NavLink, Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { login } from "../api";
import Input from "../components/Input";
import { useState } from "react";


export default function Login() {

    const [email, setEmail] = useState('')
    const [psw, setPsw] = useState('')

    const [hiba, setHiba] = useState('')
    const [uzenet, setUzenet] = useState('')

    async function onLogin() {
        setHiba('')
        setUzenet('')

        if (!email || !psw) {
            return setHiba('Minden mezőt tölts ki!')
        }


        try {
            const data = await login(email, psw)
            if (data.error) {
                setHiba(data.error)
            }
            setUzenet(data.message)
        } catch (err) {
            setHiba("Nem sikerult a backendhez kapcsolodni")

        }
    }


    return (

        <>
            <div className="container d-flex vh-100 flex-column  " style={{marginTop:130} }>
                <div className="p-4 border border-secondary rounded" >

                    <Input label="E-mail" type='email' value={email} setValue={setEmail} placeholder='examle@example.com' />
                    <Input label="Jelszo" type='password' value={psw} setValue={setPsw} placeholder='********' />

                    <div className="text-center">
                        <Button szin='btn btn-dark px-4' text='Login' />
                    </div>


                    <div className="text-center">
                        <p>Not a member? <Link to="/register" className="text-decoration-none">
                            Register
                        </Link></p>
                    </div>

                </div>

            </div>
        </>

    )
}