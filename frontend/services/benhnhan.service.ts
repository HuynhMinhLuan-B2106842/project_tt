import api from './api'

export const getAllBenhNhan = async () => {
  const res = await api.get('/benhnhan')
  return res.data
}

export const timkiembenhnhan = async (ten : string) => {
    const res = await api.get(`/benhnhan/timkiem/${ten}`)
    return res.data
}