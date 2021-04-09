export interface Photo {
  id: Number,
  camera_id: Number,
  route: String,
  date_photo: Date,
  created_at: String
}

export interface UserPhotosResponse {
  data: Photo[]
}