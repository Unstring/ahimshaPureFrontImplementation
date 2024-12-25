import axios from 'axios';
import forge from 'node-forge';

const API_URL = 'http://api.ahimsapure.com/api/v1';

let publicKeyPem = null;

export const getPublicKey = async () => {
    try {
        const response = await axios.get(`${API_URL}/files/applicationpublickey`);
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
        const buffer = forge.util.createBuffer(dataString, 'utf8');
        const encrypted = publicKey.encrypt(buffer.getBytes(), 'RSAES-PKCS1-V1_5');
        
        return forge.util.encode64(encrypted);
    } catch (error) {
        console.error('Encryption error:', error);
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const encryptedData = await encryptData(userData);
        const response = await axios.post(`${API_URL}/auth/register`, {
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
        const response = await axios.post(`${API_URL}/auth/login`, {
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
        const response = await axios.post(`${API_URL}/auth/forgot-password`, {
            payload: encryptedData
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}; 