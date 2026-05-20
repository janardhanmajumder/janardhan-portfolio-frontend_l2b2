export const useAppDispatch = () => {
  return (action: any) => {
    console.log("Mock dispatch:", action);
  };
};

export const useAppSelector = <TSelected>(
  selector: (state: any) => TSelected
): TSelected => {
  const mockState = {
    auth: {
      user: {
        name: "Admin",
        email: "admin@example.com",
      },
    },
  };
  return selector(mockState);
};
