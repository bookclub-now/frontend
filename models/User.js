class User {
  /**
   * @param {Number} id Id
   * @param {string} firstName First name
   * @param {string} lastName Last name
   * @param {string} email Email
   * @param {string} passwordHash Password hash
   * @param {string} photoUrl Profile picture
   * @param {Number} type User type
   */
  constructor(id, firstName, lastName, email, passwordHash, photoUrl, type) {
    this.id = id || '';
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.email = email || '';
    this.passwordHash = passwordHash || '';
    this.photoUrl = photoUrl || '';
    this.type = type || '';
  }

  static parseResponse = response =>
    new User(
      response.id,
      response.first_name,
      response.last_name,
      response.email,
      response.password_hash,
      response.photo_url,
      response.type,
    );
}

export default User;
