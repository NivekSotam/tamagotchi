export const validatePetName = (text: string) => {
  if (!text || text.length <= 0) {
    return 'Nome não pode ficar em branco';
  }
};
