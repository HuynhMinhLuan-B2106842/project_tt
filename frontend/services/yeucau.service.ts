import api from './api'

export const getAllYeuCau = async () => {
    const res = await api.get('/yeucau')
    return res.data
}

export const timKiemYeuCau = async (ten: string) => {
    const res = await api.get(`/yeucau/timkiem/${ten}`)
    return res.data
}

export const duyetYeuCau = async (id: string) => {
    const res = await api.put(`/yeucau/duyet/${id}`);
    return res.data;
};

export const tuChoiYeuCau = async (id: string) => {
    const res = await api.delete(`/yeucau/huy/${id}`);
    return res.data;
};
