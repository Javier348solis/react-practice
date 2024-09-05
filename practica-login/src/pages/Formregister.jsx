import React, { useEffect,useRef,useState } from 'react'
import getData, { guardarUser } from '../services/Fetch'
import { useNavigate } from 'react-router-dom'
i


function Formregister() {
  const [userName,setUserName] = useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [datos, setDatos] = useState([])
  const navegar = useNavigate()

  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()


  useEffect(() => {
    const getUsers = async () => {
        const dataUsuarios = await getData("users")
        setDatos(dataUsuarios)
    }
    getUsers()
}, []);


//Validamos los espacios vacios en cada uno de los input, luego nos dara una alerta si los input estan vacios al darle click.
const validaUsuario = async() => {
    const usernameTrim = usernameRef.current.value
    const emailTrim = emailRef.current.value
    const passwordTrim = passwordRef.current.value
    if(!usernameTrim || !emailTrim || !passwordTrim){
      alert("Por favor, llene todos los espacios")
      return
    }else{
    const user = datos.find((usuario) => usuario.email === email);
    if (user) {
      alert("INCORRECTO")
    } else {
     await guardarUser({
        name:userName,
        email:email,
        password:password
      },"users")
      navegar("/InicioSesi")
    }
  }
}
  
  return (
    <>
    {/* Se valida el valor de cada input con el target.value */}
     <main className='fondo'>
      <div>
       <div className='big-space'>
       <h1>Registrar</h1>
       <input ref={usernameRef}  onChange={(e)=>{setUserName(e.target.value)}} type="text" placeholder='Nombre'/>
       <input ref={emailRef} onChange={(e)=>{setEmail(e.target.value)}}  type="email" placeholder='Correo'/>
       <input ref={passwordRef}  onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='Contraseña'/>
       <button onClick={validaUsuario}>Registrarse</button> 
       </div>
      </div>
      </main> 
    </> 
  )
}

export default Formregister
