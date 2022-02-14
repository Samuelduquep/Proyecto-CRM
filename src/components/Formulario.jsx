import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "./Spinner";

const Formulario = ({ cliente, cargando }) => {
  const { nombre, empresa, email, movil, notas, id } = cliente;
  const navigate = useNavigate();
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("Nombre Obligatorio"),

    empresa: Yup.string().required("Debes escribir una empresa"),

    email: Yup.string().required("Email Obligatorio"),

    movil: Yup.number()
      .integer("Numero Invalido")
      .positive("No se aceptan numeros negativos")
      .typeError("Solo Numeros"),

    notas: "",
  });

  const handleSubmit = async (values) => {
    try {
      let respuesta
      if (id) {
        //Editando un Registro
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        //Nuevo Registro
        const url = import.meta.env.VITE_API_URL;
        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      await respuesta.json();
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className=" bg-white rounded-md mt-20 p-6 shadow-md md:w-3/4 mx-auto">
      <p className=" text-gray-600 font-bold text-xl uppercase text-center">
        {id ? "Editar Cliente" : "Registrar un Cliente"}
      </p>

      <Formik
        initialValues={{
          nombre: nombre ?? "",
          empresa: empresa ?? "",
          email: email ?? "",
          movil: movil ?? "",
          notas: notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className=" mt-10">
              <div>
                <label className=" text-gray-800 font-bold" htmlFor="nombre">
                  Nombre:
                </label>
                <Field
                  className=" mt-2 block w-full p-3 bg-gray-100"
                  type="text"
                  placeholder="Nombre del Cliente"
                  id="nombre"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>

              <div>
                <label className=" text-gray-800 font-bold" htmlFor="empresa">
                  Empresa:
                </label>
                <Field
                  className=" mt-2 block w-full p-3 bg-gray-100"
                  type="text"
                  placeholder="Nombre de la Empresa"
                  id="empresa"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>
              <div>
                <label className=" text-gray-800 font-bold" htmlFor="email">
                  E-mail:
                </label>
                <Field
                  className=" mt-2 block w-full p-3 bg-gray-100"
                  type="email"
                  placeholder="Tu E-mail"
                  id="email"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>

              <div>
                <label className=" text-gray-800 font-bold" htmlFor="movil">
                  Móvil:
                </label>
                <Field
                  className=" mt-2 block w-full p-3 bg-gray-100"
                  type="tel"
                  placeholder="Tu Móvil"
                  id="movil"
                  name="movil"
                />
                {errors.movil && touched.movil ? (
                  <Alerta>{errors.movil}</Alerta>
                ) : null}
              </div>
              <div>
                <label className=" text-gray-800 font-bold" htmlFor="notas">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  className=" mt-2 block w-full p-3 bg-gray-100 h-40"
                  type="text"
                  placeholder="Notas del Cliente"
                  id="notas"
                  name="notas"
                />
              </div>

              <input
                className=" mt-4 bg-blue-600 p-3 text-white font-bold uppercase rounded-md hover:bg-blue-800 cursor-pointer transition-shadow"
                type="submit"
                value={id ? "Editar Cliente" : "Agregar Cliente"}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};

export default Formulario;
