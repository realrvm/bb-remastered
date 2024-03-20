export const createPortalRoot = (id: string) => {
  const root = document.createElement("div");
  root.setAttribute("id", id);

  return root;
};
