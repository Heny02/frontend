import axios from "axios";

// Configuration Axios de base
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetcher pour récupérer la liste des utilisateurs
export const fetchUsers = async () => {
  try {
    const { data } = await api.get("/utilisateur");
    return data; // Retourne les données récupérées
  } catch (error) {
    // Si l'erreur provient d'axios, elle contient souvent une réponse détaillée
    if (axios.isAxiosError(error)) {
      // On peut aussi renvoyer un message d'erreur si nécessaire
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while fetching users"
      );
    } else {
      // Erreur générale si ce n'est pas une erreur axios
      throw new Error("An unexpected error occurred");
    }
  }
};

// Fetcher pour récupérer un utilisateur par ID
export const fetchUserById = async (userId: string) => {
  const { data } = await api.get(`/utilisateur/${userId}`);
  return data;
};

// Mutation pour créer un utilisateur
export const createUser = async (user: { name: string; email: string }) => {
  const { data } = await api.post("/utilisateur", user);
  return data;
};

// Supprimer un utilisateur par ID
export const deleteUser = async (userId: string) => {
  const { data } = await api.delete(`/users/${userId}`);
  return data;
};

// Mettre à jour un utilisateur
export const updateUser = async (user: {
  id: string;
  name: string;
  email: string;
}) => {
  const { data } = await api.put(`/users/${user.id}`, user);
  return data;
};
