
export interface Vehicle{
    id:string;
    kind:string;
    range:number;
    count:number;
}

export interface City {
    id:string;
    name:string;
    distance:number
}

// Sample data for cities and vehicles
export const cities:City[] = [
    {id:'60_Yapkashnagar', name:'Yapkashnagar', distance: 60 },
    {id:'50_Lihaspur', name: 'Lihaspur', distance: 50 },
    {id: '40_Narmis_City',name: 'Narmis City', distance: 40 },
    {id:'30_Shekharvati', name: 'Shekharvati', distance: 30 },
    {id:'20_Nuravgram', name: 'Nuravgram', distance: 20 },
];


export const vehicles:Vehicle[] = [
    {id:'60_EV_Bike', kind: 'EV Bike', range: 60 ,count:2},
    {id:'100_EV_Car', kind: 'EV Car', range: 100,count:1},
    {id:'120_EV_SUV', kind: 'EV SUV', range: 120,count:1},
];

