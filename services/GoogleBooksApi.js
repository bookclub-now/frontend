import Config from '../config';

export const searchBooks = async ({ params }) => {
  const uri = `${Config.GOOGLE_BOOKS_API_URL}/books/v1/volumes?q=${serialize({
    paramName: params.query,
  })}&startIndex=${params.index}&maxResults=19&orderBy=relevance`;

  const response = await fetch(uri);

  return handleResponse(response);
};

export const getBook = async ({ params }) => {
  const uri = `${Config.GOOGLE_BOOKS_API_URL}/books/v1/volumes/${params.query}`;

  const response = await fetch(uri);

  return handleResponse(response);
};

const handleResponse = async response => {
  if (response.status >= 400) throw new Error(await response.text());
  const body = await response.json();
  return { ok: response.ok, status: response.status, body };
};

const serialize = obj =>
  Object.keys(obj)
    .filter(key => obj[key])
    .map(key => `${encodeURIComponent(obj[key])}`)
    .join('+');
