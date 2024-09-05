import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getData from '../services/Fetch'
import "./InicioSesi.css"

function InicioSesi() {
  const [lista, setLista] = useState([])
  const [correo, setCorreo] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()


  useEffect(()=>{
    async function obtenerDatos() {
      const datos = await getData("users")
      setLista(datos)
    }
    obtenerDatos()
  },[])
  const validarInputs = ()=>{
    const user = lista.find(users => users.email === correo && users.password === password)
    const admin = lista.find(users => "adminperfume@gmail.com" === correo && "administrator2000" === password)
    if(admin){
      localStorage.setItem("admin",true)
      navigate("/admin")
      return
    }
    if (user) {
      localStorage.setItem("idUsaurio", user.id)
      navigate("/home")
    } else {
      alert("Datos incorrectos")
    }
  }

  return (
    <>
    <div className='Log-in'>
      <h1>Log-In</h1>
      <input onChange={(e)=> {setCorreo(e.target.value)}} type="text" placeholder='Correo electronico'/>
      <input onChange={(e)=> {setPassword(e.target.value)}} type="password" placeholder='Contraseña'/>
      <button onClick={validarInputs}>Ingresar</button>
    </div>
    </>
  )
}

export default InicioSesi