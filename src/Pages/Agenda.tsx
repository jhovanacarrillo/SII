
import { useEffect, useState } from 'react'
import { DataTable } from './Agenda/Datos'
import { columns } from './Agenda/columns'
import type { Agenda } from './Agenda/columns'

function AgendaPage() {
  const [data, setData] = useState<Agenda[]>([])

  useEffect(() => {
    async function fetchData() {
      // Aquí va tu llamada real a la API
      const response: Agenda[] = [
        {
          id: '728ed52f',
         clave: 100,
         imagen: 'fgsgfshfhjs45454',
         nombre_completo: 'Lic. Rocío Campos Mares',
         area: 'DIRECCIÓN DE ORGANIZACIÓN ELECTORAL',
         puesto: 'ASESOR JURÍDICO',
         extensión: '618 825 25 33 Ext.',
          status: 'activo',
          email: 'rocio.campos@iepcdurango.mx',
        },

          {
          id: '728ed52f',
         clave: 200,
         imagen:'fsdsdf',
         nombre_completo: 'Lic. Rocío Campos Mares',
         area: 'DIRECCIÓN DE ORGANIZACIÓN ELECTORAL',
         puesto: 'ASESOR JURÍDICO',
         extensión: '618 825 25 33 Ext.',
          status: 'activo',
          email: 'rocio.campos@iepcdurango.mx',
        },

        {
          id: '728ed52f',
         clave: 300,
         imagen: 'fgsgfshfhjs45454',
         nombre_completo: 'Lic. Rocío Campos Mares',
         area: 'DIRECCIÓN DE ORGANIZACIÓN ELECTORAL',
         puesto: 'ASESOR JURÍDICO',
         extensión: '618 825 25 33 Ext.',
          status: 'activo',
          email: 'rocio.campos@iepcdurango.mx',
        },

        {
          id: '728ed52f',
         clave: 100,
         imagen: 'fgsgfshfhjs45454',
         nombre_completo: 'Lic. Rocío Campos Mares',
         area: 'DIRECCIÓN DE ORGANIZACIÓN ELECTORAL',
         puesto: 'SECRETARIA',
         extensión: '618 825 25 33 Ext.',
          status: 'inactivo',
          email: 'rocio.campos@iepcdurango.mx',
        },

        {
          id: '728ed52f',
         clave: 100,
         imagen: 'fgsgfshfhjs45454',
         nombre_completo: 'Lic. Rocío Campos Mares',
         area: 'DIRECCIÓN DE ORGANIZACIÓN ELECTORAL',
         puesto: 'ASESOR JURÍDICO',
         extensión: '618 825 25 33 Ext.',
          status: 'activo',
          email: 'rocio.campos@iepcdurango.mx',
        },

        {
          id: '728ed52f',
         clave: 100,
         imagen: 'fgsgfshfhjs45454',
         nombre_completo: 'Lic. Rocío Campos Mares',
         area: 'DIRECCIÓN DE ORGANIZACIÓN ELECTORAL',
         puesto: 'ASESOR JURÍDICO',
         extensión: '618 825 25 33 Ext.',
          status: 'inactivo',
          email: 'rocio.campos@iepcdurango.mx',
        },

        {
          id: '728ed52f',
         clave: 100,
         imagen: 'fgsgfshfhjs45454',
         nombre_completo: 'Lic. Rocío Campos Mares',
         area: 'DIRECCIÓN DE ORGANIZACIÓN ELECTORAL',
         puesto: 'ASESOR JURÍDICO',
         extensión: '618 825 25 33 Ext.',
          status: 'inactivo',
          email: 'rocio.campos@iepcdurango.mx',
        },

        {
          id: '728ed52f',
         clave: 100,
         imagen: 'fgsgfshfhjs45454',
         nombre_completo: 'Lic. Rocío Campos Mares',
         area: 'DIRECCIÓN DE ORGANIZACIÓN ELECTORAL',
         puesto: 'ASESOR JURÍDICO',
         extensión: '618 825 25 33 Ext.',
          status: 'activo',
          email: 'rocio.campos@iepcdurango.mx',
        },

        {
          id: '728ed52f',
         clave: 100,
         imagen: 'fgsgfshfhjs45454',
         nombre_completo: 'Lic. Rocío Campos Mares',
         area: 'DIRECCIÓN DE ORGANIZACIÓN ELECTORAL',
         puesto: 'ASESOR JURÍDICO',
         extensión: '618 825 25 33 Ext.',
          status: 'inactivo',
          email: 'rocio.campos@iepcdurango.mx',
        },

        {
          id: '728ed52f',
         clave: 100,
         imagen: 'fgsgfshfhjs45454',
         nombre_completo: 'Lic. Rocío Campos Mares',
         area: 'DIRECCIÓN DE ORGANIZACIÓN ELECTORAL',
         puesto: 'ASESOR JURÍDICO',
         extensión: '618 825 25 33 Ext.',
          status: 'activo',
          email: 'rocio.campos@iepcdurango.mx',
        },

        {
          id: '728ed52f',
         clave: 100,
         imagen: 'fgsgfshfhjs45454',
         nombre_completo: 'Lic. Rocío Campos Mares',
         area: 'DIRECCIÓN DE ORGANIZACIÓN ELECTORAL',
         puesto: 'ASESOR JURÍDICO',
         extensión: '618 825 25 33 Ext.',
          status: 'activo',
          email: 'rocio.campos@iepcdurango.mx',
        },

        {
          id: '728ed52f',
         clave: 100,
         imagen: 'fgsgfshfhjs45454',
         nombre_completo: 'Lic. Rocío Campos Mares',
         area: 'DIRECCIÓN DE ORGANIZACIÓN ELECTORAL',
         puesto: 'ASESOR JURÍDICO',
         extensión: '618 825 25 33 Ext.',
          status: 'inactivo',
          email: 'rocio.campos@iepcdurango.mx',
        },
        {
          id: '728ed52f',
         clave: 100,
         imagen: 'fgsgfshfhjs45454',
         nombre_completo: 'Lic. Rocío Campos Mares',
         area: 'DIRECCIÓN DE ORGANIZACIÓN ELECTORAL',
         puesto: 'ASESOR JURÍDICO',
         extensión: '618 825 25 33 Ext.',
          status: 'activo',
          email: 'rocio.campos@iepcdurango.mx',
        },
        {
          id: '728ed52f',
         clave: 100,
         imagen: 'fgsgfshfhjs45454',
         nombre_completo: 'Lic. Rocío Campos Mares',
         area: 'DIRECCIÓN DE ORGANIZACIÓN ELECTORAL',
         puesto: 'ASESOR JURÍDICO',
         extensión: '618 825 25 33 Ext.',
          status: 'inactivo',
          email: 'rocio.campos@iepcdurango.mx',
        },
      ]
      setData(response)
    }

    fetchData()
  }, [])

  return (

    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white py-10">
  <div className="container mx-auto">
    <DataTable columns={columns} data={data} />
  </div>
</div>
  )
}

export default AgendaPage

