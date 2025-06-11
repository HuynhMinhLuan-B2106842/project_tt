import api from './api';

export interface TaoLanKhamPayload {
    yeu_cau_id: string;
    ngay_kham: string;
    ghi_chu?: string;
}

export const taoLanKham = async (payload: TaoLanKhamPayload) => {
    const res = await api.post('/lankham', payload);
    return res.data;
};

export const layDanhSachLanKham = async () => {
    const res = await api.get('/lankham');
    return res.data;
};

export const layChiTietLanKham = async (id: string) => {
    const res = await api.get(`/lankham/${id}`);
    return res.data;
};

export const capNhatTrangThaiLanKham = async (id: string, trang_thai: string) => {
    const res = await api.put(`/lankham/${id}`, { trang_thai });
    return res.data;
};

export const xoaLanKham = async (id: string) => {
    const res = await api.delete(`/lankham/${id}`);
    return res.data;
};
