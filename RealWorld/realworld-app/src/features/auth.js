import api from "../api";

export const register = async (
  { username, email, password },
  rejected,
  pending
) => {
  try {
    const data = await api.Auth.login(email, password);

    if (data?.errors) {
      rejected(data.errors);
      return;
    }

    const { token, ...user } = data?.user;
    pending(token, user);

    return { token, user };
  } catch (error) {
    throw error;
  }
};

export const login = async ({ email, password }, rejected, pending) => {
  try {
    const data = await api.Auth.login(email, password);
    if (data?.errors) {
      rejected(data.errors);
      return;
    }
    console.log(data);
    const { token, ...user } = data?.user;
    pending(token, user);

    return { token, user };
  } catch (error) {
    throw error;
  }
};
