export const offset = (currentPage?: string | null, limit?: number) => {
  if (!currentPage) {
    return 0;
  }

  const itemsPerPage = limit || 5;

  return (+currentPage - 1) * itemsPerPage;
}

