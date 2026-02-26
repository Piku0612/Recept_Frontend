import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from "../components/Button";
import { register } from "../api";
import Input from "../components/Input";

export default function Register() {

    const [email, setEmail]=useState('')
    const [username, setUsername]=useState('')
    const [psw, setPsw]=useState('')
    const [psw2, setPsw2]=useState('')

    const [hiba, setHiba]= useState('')
    const [uzenet, setUzenet]=useState('')

    async function onReg(){
        setHiba('')
        setUzenet('')

        if (!email || !username || !psw || !psw2) {
            return setHiba('Minden mezőt tölts ki!')
        }

        if (psw!==psw2) {
            return setHiba('A jelszavak nem egyeznek!')
        }

        try {
            const data = await register( username,psw, email)
            if (data.error) {
                setHiba(data.error)
            }
            setUzenet(data.message)
        } catch (err) {
            setHiba(err.data)

        }
    }

    return (
        <>


            <div className="container d-flex vh-100 flex-column" style={{marginTop:130} }>
                <div className="p-4 border border-secondary rounded" >

                    <Input label="E-mail" type='email' value={email} setValue={setEmail} placeholder='examle@example.com' />
                    <Input label="Felhasznalonev" type='text' value={username} setValue={setUsername} placeholder='JohnDoe' />
                    <Input label="Jelszo" type='password' value={psw} setValue={setPsw} placeholder='********' />
                    <Input label="Jelszo megerositese" type='password' value={psw2} setValue={setPsw2} placeholder='********' />

                    <div className="text-center">
                    <Button szin='btn btn-dark px-4' onClick={onReg} text='Register'/>
                    </div>

                    {hiba && <div className="alert alert-danger text-center my-2">{hiba}</div>}
                    {uzenet && <div className="alert alert-success text-center my-2">{uzenet}</div>}


                    <div className="text-center">
                        <p>Already a member? <Link to="/login" className=" text-decoration-none">
                            Login
                        </Link></p>
                    </div>


                </div>
            </div>
        </>
    )
}