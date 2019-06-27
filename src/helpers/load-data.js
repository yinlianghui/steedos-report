import fetch from 'cross-fetch';
import packageJSON from '../../package.json';

export default async (resourceType, isProxy) => {
    let proxy = "";
    if (isProxy){
        proxy = packageJSON.proxy ? packageJSON.proxy : "";
        // TODO:proxy can't be hard coded.
        proxy = "http://localhost:3200";
    }
    let url = `${proxy}/api/report/${resourceType}`;
    let response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
};