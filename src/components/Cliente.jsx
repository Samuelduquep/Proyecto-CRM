import { useNavigate } from "react-router-dom";

const Cliente = ({ cliente, handleEliminar }) => {
  const navigate = useNavigate();
  const { nombre, empresa, email, movil, id } = cliente;
  return (
    <tr className=" border-b hover:bg-blue-100">
      <td className=" p-3 font-bold uppercase text-center">{nombre}</td>
      <td className=" p-3 text-center">
        <p>
          <span className=" text-gray-800 uppercase font-bold">Email: </span>
          {email}
        </p>
        {movil && (
          <p>
            <span className=" text-gray-800 uppercase font-bold">Móvil: </span>
            {movil}
          </p>
        )}
      </td>
      <td className=" p-3 bg-red-50 font-bold uppercase text-center">{empresa}</td>
      <td className=" p-3">
        <button
          class="block w-full uppercase p-0.5 mb-2 mr-auto ml-auto overflow-hidden text-xs text-center font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-cyan-800"
          onClick={() => navigate(`/clientes/${id}`)}
        >
          <span class="block px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            Ver
          </span>
        </button>

        <button class="block w-full uppercase p-0.5 mb-2 mr-auto ml-auto overflow-hidden text-xs text-center font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-800"
        onClick={() => navigate(`/clientes/editar/${id}`)}
        >
          <span class="block px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            Editar
          </span>
        </button>

        <button class="block w-full uppercase p-0.5 mb-2 mr-auto ml-auto overflow-hidden text-xs text-center font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800"
        onClick={()=>handleEliminar(id)}
        >
          <span class="block px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            Eliminar
          </span>
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
