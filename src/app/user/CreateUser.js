const { Operation } = require('@amberjs/core');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('src/domain/User');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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',
    },
  }),
);

class CreateUser extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  // async execute(data) {
  //   const { SUCCESS } = this.events;
  //   const userData = {
  //     ...data,
  //   };
  //   const user = new User(userData);
  //   console.log(user, 'user');
  //   try {
  //     this.emit(SUCCESS, await this.UserRepository.add(user.toJSON()));
  //   } catch (error) {
  //     // this.emit(this.events[error.message], error);
  //     if (error.message === 'ValidationError') {
  //       return this.emit(VALIDATION_ERROR, error);
  //     }
  //     this.emit(ERROR, error);
  //   }
  // }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
    const user = new User(data);
    // console.log('data', data);

    try {
      console.log('userRepository', this.UserRepository.model);
      const newUser = await this.UserRepository.add(user.toJSON()).then(res => {
        transporter.sendMail(
          {
            to: data.email,
            from: 'node_dles@gmail.com',
            subject: 'Created User Succeeded!',
            html: '<h1>You Successfully created!</h1>',
          },
          (err, info) => {
            if (err) {
              console.log(err);
              // res.json({ error: err });
            }
            console.log('Message sent: ' + info);
            // res.json({ message: 'message sent! ' });
          },
        );
      });
      console.log('date', data.email);

      this.emit(SUCCESS, newUser);
    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
  }
}

CreateUser.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateUser;
