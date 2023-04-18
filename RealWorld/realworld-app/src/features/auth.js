import api from "../api";

export const register = async (
  { username, email, password },
  rejected,
  pending
) => {
  try {
    const data = await api.Auth.register(username, email, password);

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
    const { token, ...user } = data?.user;
    pending(token, user);

    return { token, user };
  } catch (error) {
    throw error;
  }
};

export const updateUser = async ({ user }, rejected, pending) => {
  try {
    const data = await api.Auth.update(user);
    if (data?.errors) {
      rejected(data.errors);
      return;
    }
    const { token, ...updatedUser } = data?.user;
    pending(token, updatedUser);
  } catch (error) {
    throw error;
  }
};
