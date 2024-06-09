import api from "../../config/axios";

export async function getTikets() {
  const { data } = await api.get("tickets");
  return data;
}

