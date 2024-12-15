export class CreateAccount {
    _apiUrl = import.meta.env.VITE_API_URL;

    async postInfo(user) {
        console.log(user);

        try {
            const api = await fetch(`${this._apiUrl}/auth/login/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const responseBody = await api.json(); 
            
            if (!api.ok) {
                
                return responseBody
            }

            return responseBody; 
        } catch (error) {
            console.error('Error en la solicitud:', error.message || error);
            throw error; 
        }
    }
}