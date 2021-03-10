import { ValidationError } from "../exceptions/ValidationError.js";

export async function paginate(config) {
  const {
    model,
    queryConfig,
    resultsPerPage,
    page
  } = config;

  const parsedPage = parseFloat(page); //Handle both cases where it is an integer and a number
  if(!Number.isInteger(parsedPage) || parsedPage <= 0) {
    throw new ValidationError("Page must be a non zero positive integer!", "InvalidPage");
  }

  const result = await model.findAndCountAll({
    ...queryConfig,
    limit: resultsPerPage,
    offset: (page - 1) * resultsPerPage
  });

  return {
    data: result.rows,
    meta: {
      total: result.count,
      perPage: resultsPerPage,
      currentPage: parsedPage
    }
  };
  
}