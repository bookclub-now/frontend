class Book {
  /**
   * @param {string} id Id
   * @param {string} title Title
   * @param {Array} authors Authors
   * @param {string} cover Cover
   * @param {string} chapters Number of chapters
   */
  constructor(id, title, authors, cover, chapters) {
    this.id = id || '';
    this.title = title || '';
    this.authors = Book.getAuthors(authors);
    this.cover = cover || '';
    this.chapters = chapters || '';
  }

  static getAuthors = authors => {
    if (!authors) return '';
    if (!authors.length) return '';

    if (typeof authors === 'string') return authors;

    if (authors.length > 1) {
      return `${authors.slice(0, authors.length - 1).join(', ')} and ${
        authors[authors.length - 1]
      }`;
    }
    return `${authors[0]}`;
  };

  static getMaxResCover = covers => {
    if (covers.medium) return covers.medium;
    if (covers.large) return covers.large;
    if (covers.extraLarge) return covers.extraLarge;
    return '';
  };

  static parseResponse = (response, chapters, authors) => {
    const { volumeInfo, id } = response;
    return new Book(
      id,
      volumeInfo.title,
      authors || volumeInfo.authors,
      Book.getMaxResCover(volumeInfo.imageLinks || {}),
      chapters,
    );
  };

  static parseApiResponse = response =>
    new Book(
      response.google_book_id,
      response.name,
      response.author,
      response.photo_url,
      response.chapters,
    );
}

export default Book;
