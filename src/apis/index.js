// import axios from '../utils/axios';
import axios from "axios";

export function SearchPost() {
  return axios.create({
    url: '/posts',
    method: 'GET'
  });
}

export function CreatePost(params) {
  return axios.create({
    url: '/post',
    method: 'PUT',
    data: params
  });
}

export function DeletePost(params) {
  return axios.create({
    url: '/post',
    method: 'DELETE',
    data: params
  });
}

export function UpdatePost(params) {
  return axios.create({
    url: '/post',
    method: 'POST',
    data: params
  });
}

export function AddComment(params) {
  return axios.create({
    url: '/comment',
    method: 'PUT',
    data: params
  });
}

export function AddSubscribe(params) {
  return axios.create({
    url: '/subscribe',
    method: 'PUT',
    data: params
  });
}

export function CancelSubscribe(params) {
  return axios.create({
    url: '/subscribe',
    method: 'DELETE',
    data: params
  });
}