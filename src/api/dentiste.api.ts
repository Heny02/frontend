import axios from "axios";

// Configuration Axios de base
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Dentist {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
}

// Fetcher pour récupérer la liste des dentistes
export const fetchDentistes = async (): Promise<Dentist[]> => {
  try {
    const { data } = await api.get("/dentiste");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la récupération des dentistes"
      );
    } else {
      throw new Error("Une erreur inattendue est survenue");
    }
  }
};

// Fetcher pour récupérer un dentiste par ID
export const fetchDentisteById = async (dentisteId: string): Promise<Dentist> => {
  try {
    const { data } = await api.get(`/dentiste/${dentisteId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la récupération du dentiste"
      );
    } else {
      throw new Error("Une erreur inattendue est survenue");
    }
  }
};

// Mutation pour créer un dentiste
export const createDentiste = async (dentiste: Omit<Dentist, "id">): Promise<Dentist> => {
  try {
    const { data } = await api.post("/dentiste", dentiste);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la création du dentiste"
      );
    } else {
      throw new Error("Une erreur inattendue est survenue");
    }
  }
};

// Supprimer un dentiste par ID
export const deleteDentiste = async (dentisteId: string): Promise<void> => {
  try {
    await api.delete(`/dentiste/${dentisteId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la suppression du dentiste"
      );
    } else {
      throw new Error("Une erreur inattendue est survenue");
    }
  }
};

// Mettre à jour un dentiste
export const updateDentiste = async (dentiste: Dentist): Promise<Dentist> => {
  try {
    const { data } = await api.put(`/dentiste/${dentiste.id}`, dentiste);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la mise à jour du dentiste"
      );
    } else {
      throw new Error("Une erreur inattendue est survenue");
    }
  }
};

