# Yocket Assignment (Backend)
I build the backend for the assignment using **NodeJs**

## Directory Structure
I am using Typescript, the main dev directory is **_src_** in root folder <br/>
The Vehicles & cities data is present in: _**src/lib/db.ts**_ <br/>
The main route handler for the api endpoints is present in : _**src/routes/capture-fugitive.ts**_

## Api Endpoints
We have total two endpoints. <br/>
### 1. One is for getting vehicles & cities data (GET)
Endpoint: https://nuxt-backend-vez7.onrender.com/capture <br/>
Response Structure:
```
{
    "cities": [
        {
            "id": "60_Yapkashnagar",
            "name": "Yapkashnagar",
            "distance": 60
        },
        {
            "id": "50_Lihaspur",
            "name": "Lihaspur",
            "distance": 50
        },
        {
            "id": "40_Narmis_City",
            "name": "Narmis City",
            "distance": 40
        },
        {
            "id": "30_Shekharvati",
            "name": "Shekharvati",
            "distance": 30
        },
        {
            "id": "20_Nuravgram",
            "name": "Nuravgram",
            "distance": 20
        }
    ],
    "vehicles": [
        {
            "id": "60_EV_Bike",
            "kind": "EV Bike",
            "range": 60,
            "count": 2
        },
        {
            "id": "100_EV_Car",
            "kind": "EV Car",
            "range": 100,
            "count": 1
        },
        {
            "id": "120_EV_SUV",
            "kind": "EV SUV",
            "range": 120,
            "count": 1
        }
    ]
}
```
### 2. Second is for starting the game (POST)
Endpoint: https://nuxt-backend-vez7.onrender.com/capture <br/>
Body Structure:
```
{
    "copChoices":[
        {
            "cop":"0",
            "cityId":"60_Yapkashnagar",
            "vehicleId":"120_EV_SUV"
        },
        {
            "cop":"1",
            "cityId":"50_Lihaspur",
            "vehicleId":"100_EV_Car"
        },
        {
            "cop":"2",
            "cityId":"30_Shekharvati",
            "vehicleId":"60_EV_Bike"
        }
    ]
}
```
Response Structure:
```
{
    "success": true,
    "copIndex": "third"
}
```
```
{
    "success": false
}
```

## Project Build Steps:
### Step-1:
Run command to install dependencies : _**npm i**_
### Step-2:
To run locally: _**npm run dev**_ <br/>
To build the project: _**npx tsc**_ (The build files will be in _**dir**_ directory in root folder)

