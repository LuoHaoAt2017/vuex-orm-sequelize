import axios from '../utils/axios';

export function SearchPost() {
  return axios.request({
    url: '/posts',
    method: 'GET',
  });
}

export function QueryPost(postId) {
  return axios.request({
    url: `/post/${postId}`,
    method: 'GET',
  });
}

export function CreatePost(params) {
  return axios.request({
    url: '/post',
    method: 'PUT',
    data: params
  });
}

export function DeletePost(params) {
  return axios.request({
    url: `/post/${params}`,
    method: 'DELETE',
  });
}

export function UpdatePost(params) {
  return axios.request({
    url: '/post',
    method: 'POST',
    data: params
  });
}

// comment
export function SearchComment(postId) {
  return axios.request({
    url: `/comments/${postId}`,
    method: 'GET',
  });
}

export function CreateComment(params) {
  return axios.request({
    url: '/comment',
    method: 'PUT',
    data: params
  });
}

export function ReplyComment(params) {
  return axios.request({
    url: '/reply',
    method: 'PUT',
    data: params
  });
}

export function SearchReply(commentId) {
  return axios.request({
    url: `/replies/${commentId}`,
    method: 'GET',
  });
}

export function DeleteReply(commentId) {
  return axios.request({
    url: `/reply/${commentId}`,
    method: 'DELETE',
  });
}

export function AddSubscribe(params) {
  return axios.request({
    url: '/subscribe',
    method: 'PUT',
    data: params
  });
}

export function CancelSubscribe(params) {
  return axios.request({
    url: '/subscribe',
    method: 'DELETE',
    data: params
  });
}