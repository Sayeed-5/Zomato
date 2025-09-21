import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
})

export async function toggleLike(foodId) {
  const { data } = await api.post(`/api/food/${foodId}/like`)
  // Expected response could be { liked, likesCount } or { liked, likes }
  const liked = typeof data.liked !== 'undefined' ? data.liked : !!data?.data?.liked
  const likesCount = typeof data.likesCount !== 'undefined' ? data.likesCount : (data?.data?.likesCount ?? data?.likes ?? data?.data?.likes)
  return { liked, likesCount: Number(likesCount ?? 0) }
}

export async function toggleSave(foodId) {
  const { data } = await api.post(`/api/food/${foodId}/save`)
  // Expected response could be { saved, savesCount } or { saved, saves }
  const saved = typeof data.saved !== 'undefined' ? data.saved : !!data?.data?.saved
  const savesCount = typeof data.savesCount !== 'undefined' ? data.savesCount : (data?.data?.savesCount ?? data?.saves ?? data?.data?.saves)
  return { saved, savesCount: Number(savesCount ?? 0) }
} 