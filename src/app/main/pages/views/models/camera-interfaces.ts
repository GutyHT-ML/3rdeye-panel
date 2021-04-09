export interface Camera {
  id: Number,
  code: String,
  name: String,
  user_id: String,
  created_at: String,
  updated_at: String
}

export interface StoreCameraRequest{
  code: String,
  name: String
}

export interface StoreCameraResponse{
  status:  String;
  message:  String;
  data:    Camera;
}

export interface UserCamsResponse {
  cameras: Camera[]
}