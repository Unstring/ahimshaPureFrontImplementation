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