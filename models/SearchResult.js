class SearchResult {
  /**
   * @param {string} id Id
   * @param {string} title Title
   * @param {Array} authors Authors
   * @param {string} imageLinks Covers
   */
  constructor(id, title, authors, imageLinks) {
    this.id = id || '';
    this.title = title || '';
    this.authors = authors || [''];
    this.imageLinks = {
      smallThumbnail: imageLinks ? imageLinks.smallThumbnail : '',
      thumbnail: imageLinks ? imageLinks.thumbnail : '',
    };
  }

  /**
   * @param {Object} book Book to be casted
   */
  static fromJSON(book) {
    return new SearchResult(
      book.id,
      book.volumeInfo.title,
      book.volumeInfo.authors,
      book.volumeInfo.imageLinks,
    );
  }

  /**
   * @param {Array} books Array of books to be casted
   */
  static parseResponse(books) {
    if (!books) return [];
    return books.map(item => SearchResult.fromJSON(item));
  }
}

export default SearchResult;
