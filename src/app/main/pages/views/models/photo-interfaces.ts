export interface Image {
  _id:        number,
  camera_id:  number,
  route:      string,
  obj_type:   string,
  distance:   number,
  date_photo: Date,
  created_at: Date,
  updated_at: Date
}

export interface UserPhotosResponse {
  data: Image[]
}
