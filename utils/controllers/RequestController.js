import Constants from 'expo-constants';
const API_URL = Constants.manifest.extra.apiGatewayUrl;
class RequestController{

    constructor(user) {
        this.user = user
    }

    async getHeaders(){
        const token = await this?.user?.getIdToken(true);
        return token ? {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        } : {
            "Content-Type": "application/json"
        }
    }

    async fetch(route, method, body= null){
        try{
            const response = await fetch(`${API_URL}${route}`, {
                method,
                headers: (await this.getHeaders()),
                body: (body ? JSON.stringify(body): null)
            });

            return await response.json();
        } catch (e) {
            console.log(e);
            throw Error(`There was an error while fetching. Error: ${e}`)
        }
    }
}


export default RequestController;
