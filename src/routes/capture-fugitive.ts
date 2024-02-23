import Router from "express"

import {cities, vehicles, City} from "../lib/db";

const captureFugitiveRouter = Router()


interface CopChoice {
    cop: string;
    cityId: string;
    vehicleId: string;
}


captureFugitiveRouter.get('/capture', (req, res, next) => {
    try {
        const data = {
            'cities': cities,
            'vehicles': vehicles,
        }
        return res.status(200).json(data)
    } catch (e) {
        return next(Error("Error"))
    }
})


// Endpoint to handle cop choices and check for fugitive
captureFugitiveRouter.post("/capture", (req, res, next) => {

    try {
        // Assuming request body has an array of cop choices
        const {copChoices}: { copChoices: CopChoice[] } = req.body;

        console.log(copChoices)

        // Validating cop choices
        if (!validateCopChoices(copChoices)) {
            return res.status(400).json({error: 'Invalid cop choices.'});
        }

        // Simulating the fugitive's location randomly
        const fugitiveLocation = cities[Math.floor(Math.random() * cities.length)];

        console.log("FUGITIVE LOCATION", fugitiveLocation)

        // Check if any cop successfully captured the fugitive
        const result = simulateCapture(copChoices, fugitiveLocation);

        // Send the result back to the client
        return res.status(200).json(result);

    } catch (e) {
        return next(Error("Error"))
    }

})


// Function to validate cop choices
function validateCopChoices(copChoices: CopChoice[]): boolean {
    // Check if there are exactly 3 cop choices
    if (copChoices.length !== 3) {
        return false;
    }

    // Check for unique city selections for each cop
    const selectedCitiesName = copChoices.map((choice) => cities.find((city) => city.id === choice.cityId)?.name).filter(Boolean) as string[];
    // Since Set can't have duplicate elements, it must have size 3 for selectedCities to be unique
    const eachSelectedCityUnique = new Set(selectedCitiesName).size === 3


    const selectedVehiclesCountRecord: Record<string, number> = {};
    let selectedVehicleValid = true;

    for (const choice of copChoices) {
        selectedVehiclesCountRecord[choice.vehicleId] = (selectedVehiclesCountRecord[choice.vehicleId] || 0) + 1

        const selectedVehicle = vehicles.find((vehicle) => vehicle.id == choice.vehicleId);
        const selectedCity = cities.find((city) => city.id === choice.cityId);

        if (!selectedVehicle || !selectedCity) {
            selectedVehicleValid = false;
            break;
        }

        if (selectedVehicle.range < selectedCity.distance * 2) {
            selectedVehicleValid = false;
            break;
        }

        if (selectedVehiclesCountRecord[choice.vehicleId] > selectedVehicle.count) {
            selectedVehicleValid = false;
            break;
        }
    }

    return eachSelectedCityUnique && selectedVehicleValid;

}

// Function to check if any cop successfully captures the fugitive
function simulateCapture(copChoices: CopChoice[], fugitiveLocation: City): { success: boolean; capturingCop?: string } {

    // Looping through each cop choice
    for (const choice of copChoices) {


        const vehicle = vehicles.find((v) => v.id === choice.vehicleId);
        const city = cities.find((city) => city.id === choice.cityId)

        if (vehicle && vehicle.range >= 2 * fugitiveLocation.distance && city?.id === fugitiveLocation.id) {
            return {success: true, capturingCop: choice.cop};
        }
    }

    return {success: false};
}


export default captureFugitiveRouter

