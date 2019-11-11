const { BaseRepository } = require('@amberjs/core');

class UserRepository extends BaseRepository {
  constructor({ UserModel }) {
    super(UserModel);
  }

  async getByEmail(email) {
    return this.model.findOne({
      where: {
        email
      }
    })
  }

  async login(data) {
    const date = new Date();
    const YYYY = date.getFullYear();
    const MM = date.getMonth() + 1;
    const DD = date.getDate();
    const time = date.toTimeString();

    return this.model.findOne({
      where: {
        email: data.email
      }
    }).then((foundUser) => {
      if(foundUser) {
        return this.model.update({
          isLoggedIn: true,
          loginAt: `${YYYY}-${MM}-${DD} ${time}`,
        }, {
          where: {
            email: data.email 
          },
          returning: true
        })
      }
    })
  }
}

module.exports = UserRepository;
