## Shared Server UI (Admin Page) - TP Taller de Programación 2

__Desplegado en: https://taller-shared-server-ui.herokuapp.com__

Este repositorio fue creado a partir del paquete [create react app](https://github.com/facebook/create-react-app) creado por facebook.

Esta es una aplicación desarrollada en React, y utiliza Redux como herramienta para mantener el estado de la sesión y de las entidades de negocio asociadas a [la API de Shared Server](https://github.com/taller2-2c2018/ApiNodeBackend). 

### Requerimientos:

- node ~8 (carbon)
- npm ~5

### Instalación local

Clonar el proyecto : `git clone git@github.com:taller2-2c2018/shared-server-ui.git`

Instalar dependencias: `npm install`

Ejecutar: `npm start` 

Por default esta aplicación se conecta donde está desplegada la API del Shared sever: https://apinodebackend.herokuapp.com/v0/api .  



### Instalación con docker:

Ver https://github.com/taller2-2c2018/cm-shared-server .

___Opcional:___ Para que la aplicación apunte al Shared Server levantado a través de docker localmente, se puede generar un archivo `.env.local` en la raíz del proyecto, con el siguiente contenido:   
`REACT_APP_LOCAL=1`

Para obtener otro tipo de configuración local de acceso a la API habría que modificar el contenido de `src/api/api.js`.