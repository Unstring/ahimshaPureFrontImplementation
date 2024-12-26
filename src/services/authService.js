import axios from 'axios';
import forge from 'node-forge';
import { API_CONFIG, API_ENDPOINTS } from '../config/constants';

let publicKeyPem = null;

export const getPublicKey = async () => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.FILES.PUBLIC_KEY}`);
        publicKeyPem = response.data;
        return response.data;
    } catch (error) {
        console.error('Error fetching public key:', error.response?.data || error.message);
        throw error;
    }
};

const encryptData = async (data) => {
    if (!publicKeyPem) {
        await getPublicKey();
    }

    try {
        const dataString = JSON.stringify(data);
        const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
        
        // Split the data into chunks that RSA can handle
        const maxLength = 245; // Maximum length for RSA-2048 with PKCS#1 v1.5 padding
        const dataBytes = forge.util.encodeUtf8(dataString);
        const chunks = [];
        
        for (let i = 0; i < dataBytes.length; i += maxLength) {
            const chunk = dataBytes.slice(i, i + maxLength);
            const encrypted = publicKey.encrypt(chunk, 'RSAES-PKCS1-V1_5');
            chunks.push(forge.util.encode64(encrypted));
        }
        
        return chunks.join('.');
    } catch (error) {
        console.error('Encryption error:', error);
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const encryptedData = await encryptData(userData);
        const response = await axios.post(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`, {
            payload: encryptedData
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const login = async (credentials) => {
    try {
        const encryptedData = await encryptData(credentials);
        const response = await axios.post(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
            payload: encryptedData
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const forgotPassword = async (email) => {
    try {
        const encryptedData = await encryptData({ email });
        const response = await axios.post(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.FORGOT_PASSWORD}`, {
            payload: encryptedData
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const resendVerification = async ({ email, baseUrl }) => {
    try {
        const encryptedData = await encryptData({ email, baseUrl });
        const response = await axios.post(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.RESEND_VERIFICATION}`, {
            payload: encryptedData
        });
        
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const verifyResetCode = async (resetId, code) => {
    console.log({ resetId, code });
    
    try {
        const encryptedData = await encryptData({ resetId, code });
        const response = await axios.post(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.VERIFY_RESET_CODE}`, {
            payload: encryptedData
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const resetPassword = async (resetToken, newPassword) => {
    console.log({ resetToken, newPassword });
    
    try {
        const encryptedData = await encryptData({ resetToken, newPassword });
        const response = await axios.post(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.RESET_PASSWORD}`, {
            payload: encryptedData
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const googleAuthSignUp = async (token) => {
    try {
        // Extract necessary information from the token
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        
        console.log({ tokenPayload });
        
        const authData = {
            // token: token,
            email: tokenPayload.email,
            name: tokenPayload.name,
            picture: tokenPayload.picture,
            // baseUrl: window.location.origin + "/auth/verify/"
        };
        console.log({ authData });
        
        const encryptedData = await encryptData({authData});
        console.log({ encryptedData });
        
        const response = await axios.post(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.GOOGLE_SIGNUP}`, {
            payload: token
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Google Auth Error:', error);
        throw error.response?.data || error;
    }
};

export const googleAuthSignIn = async (token) => {
    try {
        // Extract necessary information from the token
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        
        console.log({ tokenPayload });
        
        const authData = {
            // token: token,
            email: tokenPayload.email,
            name: tokenPayload.name,
            picture: tokenPayload.picture,
            // baseUrl: window.location.origin + "/auth/verify/"
        };
        console.log({ authData });
        
        const encryptedData = await encryptData({authData});
        console.log({ encryptedData });
        
        const response = await axios.post(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.GOOGLE_SIGNIN}`, {
            payload: token
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Google Auth Error:', error);
        throw error.response?.data || error;
    }
};

export const appleAuth = async (token) => {
    try {
        const encryptedData = await encryptData({ token });
        const response = await axios.post(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.APPLE}`, {
            payload: encryptedData
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};