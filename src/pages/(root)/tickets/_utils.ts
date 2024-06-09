import api from "../../../config/axios";

export async function getTicket(id:number) {
    const { data } = await api.get("tickets/"+id);
    return data;
  }
  