import { Image } from "./photo-interfaces";

export interface Camera {
  _id:        number,
  code:       string,
  name:       string,
  ip:         string,
  user_id:    number,
  created_at: Date,
  updated_at: Date,
  images:     Image[]
  values:     Value[]
}

export interface Value {
  _id: number,
  temperature: number,
  humidity:    number,
  date_value:  Date,
  camera_id:   number,
  created_at:  Date,
  updated_at:  Date,
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
