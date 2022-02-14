import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const VerCliente = () => {
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
    <div>
      <h1 className="font-black text-4xl text-blue-700">
        Ver Cliente: {cliente.nombre}
      </h1>
      <p className=" mt-3 uppercase">Información del Cliente</p>

      <p className=" text-2xl mt-4 text-gray-700 mt-10">
        <span className=" text-blue-900 uppercase font-bold">Cliente: </span>
        {cliente.nombre}
      </p>
      <p className=" text-2xl mt-4 text-gray-700">
        <span className=" text-blue-900 uppercase font-bold">Empresa: </span>
        {cliente.empresa}
      </p>
      <p className=" text-2xl mt-4 text-gray-700">
        <span className=" text-blue-900 uppercase font-bold">E-mail: </span>
        {cliente.email}
      </p>
      {cliente.movil && (
        <p className=" text-2xl mt-4 text-gray-700">
          <span className=" text-blue-900 uppercase font-bold">Móvil: </span>
          {cliente.movil}
        </p>
      )}

      {cliente.notas && (
        <p className=" text-2xl mt-4 text-gray-700">
          <span className=" text-blue-900 uppercase font-bold">Notas: </span>
          {cliente.notas}
        </p>
      )}
    </div>
  );
};

export default VerCliente;