const { Router } = require('express');
const { BaseController } = require('@amberjs/core');
const Status = require('http-status');

class LoginsController extends BaseController {
  constructor() {
    super();
    const router = Router();
    router.post('/post-login', this.injector('Login'), this.postLogin);
    // router.get('/', this.injector('ListLogins'), this.index);
    // router.post('/', this.injector('CreateLogin'), this.create);
    // router.get('/:id', this.injector('ShowLogin'), this.show);
    // router.put('/:id', this.injector('UpdateLogin'), this.update);
    // router.delete('/:id', this.injector('DeleteLogin'), this.delete);

    return router;
  }

  /**
   * CRUD sample implementation
   * You may delete the commented code below if you have extended BaseController class
   * The following methods are already inherited upon extending BaseController class from @amberjs/core
   */
  postLogin(req, res, next) {
    const { operation } = req;
    const token =
      'ya29.Il-pB1EVJGdbl0rsBua11CmFYjRejeSjO7PfrKA3ysoEQuBYagshARLhU5rvqP7N3Yos9t7JtMh8Cmx4zFBHCyg6CstywjPAyJRBFK2HKs9GALh4ujI57A5B05sGNpMriw';
    console.log('operation', operation);
    operation.on(SUCCESS, result => {
      res.status(Status.OK).json(result);
    });

    operation.execute(token);
  }

  // index(req, res, next) {
  //   const { operation } = req;
  //   const { SUCCESS, ERROR } = operation.events;

  //   operation
  //     .on(SUCCESS, (result) => {
  //       res
  //         .status(Status.OK)
  //         .json(result);
  //     })
  //     .on(ERROR, next);

  //   operation.execute();
  // }

  // show(req, res, next) {
  //   const { operation } = req;

  //   const { SUCCESS, ERROR, NOT_FOUND } = operation.events;

  //   operation
  //     .on(SUCCESS, (result) => {
  //       res
  //         .status(Status.OK)
  //         .json(result);
  //     })
  //     .on(NOT_FOUND, (error) => {
  //       res.status(Status.NOT_FOUND).json({
  //         type: 'NotFoundError',
  //         details: error.details
  //       });
  //     })
  //     .on(ERROR, next);

  //   operation.execute(Number(req.params.id));
  // }

  // create(req, res, next) {
  //   const { operation } = req;
  //   const { SUCCESS, ERROR, VALIDATION_ERROR } = operation.events;

  //   operation
  //     .on(SUCCESS, (result) => {
  //       res
  //         .status(Status.CREATED)
  //         .json(result);
  //     })
  //     .on(VALIDATION_ERROR, (error) => {
  //       res.status(Status.BAD_REQUEST).json({
  //         type: 'ValidationError',
  //         details: error.details
  //       });
  //     })
  //     .on(ERROR, next);

  //   operation.execute(req.body);
  // }

  // update(req, res, next) {
  //   const { operation } = req;
  //   const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = operation.events;

  //   operation
  //     .on(SUCCESS, (result) => {
  //       res
  //         .status(Status.ACCEPTED)
  //         .json(result);
  //     })
  //     .on(VALIDATION_ERROR, (error) => {
  //       res.status(Status.BAD_REQUEST).json({
  //         type: 'ValidationError',
  //         details: error.details
  //       });
  //     })
  //     .on(NOT_FOUND, (error) => {
  //       res.status(Status.NOT_FOUND).json({
  //         type: 'NotFoundError',
  //         details: error.details
  //       });
  //     })
  //     .on(ERROR, next);

  //   operation.execute(Number(req.params.id), req.body);
  // }

  // delete(req, res, next) {
  //   const { operation } = req;
  //   const { SUCCESS, ERROR,  NOT_FOUND } = operation.events;

  //   operation
  //     .on(SUCCESS, () => {
  //       res.status(Status.ACCEPTED).end();
  //     })
  //     .on(NOT_FOUND, (error) => {
  //       res.status(Status.NOT_FOUND).json({
  //         type: 'NotFoundError',
  //         details: error.details
  //       });
  //     })
  //     .on(ERROR, next);

  //   operation.execute(Number(req.params.id));
  // }
}

module.exports = LoginsController;
