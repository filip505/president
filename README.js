# A Presidential assignment

### Run
- Clone it
- `docker-compose up` (start all servers)

sending post request to http://localhost/president with json file of president list will resoult in receiving csv file
```
POST /president HTTP/1.1
Host: localhost
Content-Type: application/json

[
  {
    "id": 15,
    "president": 15,
    "nm": "James Buchanan",
    "pp": "Democrat",
    "tm": "1857-1861"
  },
  {
    "id": 16,
    "president": 16,
    "nm": "Abraham Lincoln",
    "pp": "Republican",
    "tm": "1861-1865"
  }
]```

# CsvServer

## Running
- Clone it
- `cd csvServer` (entering folder)
- `npm install` (install dependencies)
- `npm run dev` (server will start on port 8888)

## Testing
- Clone it
- `cd csvServer` (entering folder)
- `npm install` (install dependencies)
- `npm run test` (running tests on port 8000)

# DataServer

## Running
- Clone it
- `cd dataServer` (entering folder)
- `npm install` (install dependencies)
- `npm run dev` (server will start on port 80)

## Testing
- Clone it
- `cd dataServer` (entering folder)
- `npm install` (install dependencies)
- `npm run test` (running on port 8000)

### techonolgy used:
- Node.js
- Koa (my presonal choice over express because it takes advantage of the new async/await keywords )
- Babel (to be able to use latest javascipt syntax)
- joi (for object validation)
- moment (most popular dependency for working with dates in js)
- supertest (for integration test)
- axios (HTTP client of my choice)

### improvements:

- theoretically user could upload very big json file, what will efect time to parse data and can cause 408 request timeout. To prevent this from happening we could decrease request Size Limit. In the case we want to enable big json files to be uploaded and parsed, we should take different approach by creating post request that will also take user email as param. In that case we could create a stack, and make sure we run few tasks at the time, sending user email with link to access there csv file.

