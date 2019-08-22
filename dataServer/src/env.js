const PORT = process.env.PORT ? process.env.PORT : 80
const CSV_HOST_PORT = process.env.PORT ? process.env.PORT : 9001

let CSV_HOST = `http://localhost:${CSV_HOST_PORT}`

if(process.env.NODE_ENV === 'prod'){
  CSV_HOST = `http://csv_server:${CSV_HOST_PORT}`
}

export {
  PORT,
  CSV_HOST
}