import axios from "axios";
export const axiosJWT = axios.create()

export interface LoginPayload {
  email: string;
  password: string;
}
export const loginUser = async (payload: LoginPayload) => {
    const res = await axios.post('http://localhost:5000/user/login', payload)
    return res.data
}

export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(`http://localhost:5000/user/detail-user/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    },)
    return res.data
}

export const refreshToken = async () => {
    const res = await axios.post(`http://localhost:5000/user/refresh-token`, {
        withCredentials: true
    })
    return res.data
}


// export const logoutUser = async () => {
//     const res = await axios.post(`http://localhost:5000/user/log-out`)
//     return res.data
// }

// export const updateUser = async (id, data, access_token,) => {
//     const res = await axiosJWT.put(`http://localhost:5000/user/update-user/${id}`, data, {
//         headers: {
//             token: `Bearer ${access_token}`,
//         }
//     })
//     return res.data
// }
