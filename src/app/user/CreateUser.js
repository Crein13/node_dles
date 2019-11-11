const { Operation } = require('@amberjs/core');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('src/domain/User');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API,
    },
  }),
);

class CreateUser extends Operation {
  constructor({ UserRepository }) {
    super();
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
    const user = new User(data);
    console.log('data', data);
    console.log('user', user);

    try {
      const loginUser = await this.UserRepository.login(user);

      if (!loginUser) {
        const newUser = await this.UserRepository.add(user);

        try {
          transporter.sendMail(
            {
              to: data.email,
              from: 'bmatias@stratpoint.com',
              subject: 'Created User Succeeded!',
              html: '<h1>You Successfully created!</h1>',
            },
            (err, info) => {
              if (err) {
                console.log('User already exists');
              }
              console.log(`Message sent: ${info}`);
            },
          );
          this.emit(SUCCESS, newUser);
        } catch (error) {
          console.log(error);
        }
      }

      this.emit(SUCCESS, loginUser);
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
