const registerService = async (payload: Record<string, unknown>) => {
  console.log(payload);

  return {hello: "hello"}
};

export const UserServices = {
  registerService,
};
