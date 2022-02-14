import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="font-black text-6xl text-blue-700">Bienvenido</h1>
      <p className=" text-2xl font-bold text-gray-700 mt-3">Administra tus Clientes</p>
      <button 
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border mt-5 border-blue-500 hover:border-transparent rounded"
      onClick={() => navigate(`/clientes/nuevo`)}
      >
        Nuevo Cliente
      </button>
    </>
  );
}
export default Welcome;
