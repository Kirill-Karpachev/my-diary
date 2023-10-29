/* eslint-disable @typescript-eslint/no-explicit-any */
export const validation = (values: any) => {
  const errors: any = {};
  if (!values.title) {
    errors.title = true;
  }
  if (!values.date) {
    errors.date = true;
  }
  if (!values.description) {
    errors.description = true;
  }
  return errors;
};
