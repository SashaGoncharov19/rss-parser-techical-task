import axios from "axios";

export async function getPosts() {
  const { data } = await axios.get("http://localhost:5000/api/post/get");
  return data;
}

export async function editPost(content, guid) {
  const { data } = await axios.post("http://localhost:5000/api/post/edit", {
    content,
    guid,
  });
  return data;
}
