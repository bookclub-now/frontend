import Book from './Book';
import User from './User';

class Club {
  /**
   * @param {Number} id Id
   * @param {Book} book Book
   * @param {User} admin Admin
   * @param {Array<User>} members Members
   * @param {string} shareCode Share Code
   */
  constructor(id, book, admin, members, shareCode) {
    this.id = id || 0;
    this.book = book || new Book();
    this.admin = admin || new User();
    this.members = members || [];
    this.shareCode = shareCode || '';
  }

  static parseResponse = club =>
    // TODO: Add admin when available
    new Club(
      club.id,
      Book.parseApiResponse(club.book),
      null,
      club.members.map(user => User.parseResponse(user)),
      club.join_code,
    );
}

export default Club;
