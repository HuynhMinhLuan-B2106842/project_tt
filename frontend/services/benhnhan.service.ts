import api from './api'

export const getAllBenhNhan = async () => {
  const res = await api.get('/benhnhan')
  return res.data
}

export const timkiembenhnhan = async (ten : string) => {
    const res = await api.get(`/benhnhan/timkiem/${ten}`)
    return res.data
}

export const capNhatBenhNhan = async (id: string, data: any) => {
  const res = await api.put(`/benhnhan/${id}`, data)
  return res.data
}


export const xoaBenhNhan = async (id: string) => {
  const res = await api.delete(`/benhnhan/${id}`)
  return res.data
}

