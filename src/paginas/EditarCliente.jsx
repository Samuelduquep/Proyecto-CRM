import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Formulario from "../components/Formulario"


const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setCargando(!cargando);
      }, 0);
    };

    obtenerClienteAPI();
  }, []);

  return cargando ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <p className=" text-4xl p-10 text-center font-bold uppercase text-gray-700">
      No hay Resultados{" "}
    </p>
  ) : (
    <>
    <h1 className="font-black text-4xl text-blue-700">Editar Cliente</h1>

    <Formulario
      cliente={cliente}
      cargando={cargando}
    />

    </>
  )
}

export default EditarCliente
