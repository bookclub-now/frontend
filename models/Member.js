class Member {
  /**
   * @param {Number} id Id
   * @param {string} firstName First name
   * @param {string} lastName Last name
   * @param {string} photoUrl Profile picture
   */
  constructor(id, firstName, lastName, photoUrl) {
    this.id = id || '';
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.photoUrl = photoUrl || '';
  }

  static parseMember = response =>
    new Member(
      response.item.id,
      response.item.firstName,
      response.item.lastName,
      response.item.photoUrl,
    );
}

export default Member;
