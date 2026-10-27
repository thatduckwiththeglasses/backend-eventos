# --- Sistema de reserva de eventos: ---

# Descripcion:
Simple sistema de reserva de diversos eventos

Se puede
    crear un evento, ver los eventos, actualizar un evento y eliminar un evento, crear un usuario, reservar un evento, actualizar un usuario y eliminar un usuario



# Instrucciones:

# 1.Como instalar (en Visual Studio Code):
    se deben instalar las sig. dependencias
        -   1. dotenv:
                'npm install dotenv'
        -   2. Node.js:
                'npm install node'
        -   3.express:
                'npm install express'
        -   4.mongoose:
                'npm isntall mongoose'
        -   5.express-handlebars:
                'npm isntall express-handlebars'
        -   6.socket.io:
                'npm isntall socket'
        -   7.mongoose-paginate-v2:
                'npm isntall mongoose-paginate-v2'
        -   8.Bcrypt:
                'npm install bcrypt'


# 2.Como ejecutar (en VSC):
    por ahora se debe ejecutar con el sig. comando
        'npm run dev'

# 3 Variables de entorno:
    hay 2 
    - PORT siendo la variable que indica que puerto se utilizara para el servidor 
    - NODE_ENV que define el tipo de entrono al ejecutar el servidor 
    
    Existe un archivo de ejemplo

# 4 Descripcion de recursos:
#    1.Events:
        id: valor irrepetible para identificar los eventos; tipo int
        title: titulo del evento; tipo string
        description: descripcion del evento; tipo string
        duration: tiempo que dura el evento (en horas); tipo int
        price: precio del evento; tipo int
        capacity: Capacidad del evento; tipo int
        reserved: reservas acumuladas del evento; tipo int; no es requerido para crear servicios
        available: disponibilidad del evento; tipo boolean

#    2.Bookings:
        id: valor para identificar los clientes; tipo int
        clientName: Nombre del cliente con reserva; tipo string
        clientEmail: Email del cliente; tipo string
        date: fecha establecida de la reserva (dd/mm/aaaa); tipo string
        time: hora de la reserva; tipo string
        services: lista de servicios reservados; tipo array
            service: id del servicio reservado; tipo int
            quantity: cantidad de instancias del servicio; tipo int

    