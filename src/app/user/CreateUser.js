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
  constructor(container) {
    super();
    console.log('container', container);
    const { UserRepository } = container;
    this.UserRepository = UserRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
    const user = new User(data);
    console.log('data', data);
    console.log('user', user);

    try {
      console.log('userRepository', this.UserRepository.model);
      const newUser = await this.UserRepository.add(user.toJSON()).then(res => {
        return transporter.sendMail(
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
        // console.log('data.email', data.email);
      });
      // try {

      //   this.emit(SUCCESS, newUser);
      // } catch (error) {
      //   console.log(error);
      // }
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
