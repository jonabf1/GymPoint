const Bee = require('bee-queue');
const AvisePlan = require('../app/jobs/avise_answer');
const AviseEnrollment = require('../app/jobs/avise_enrollment');
const DeletePlan = require('../app/jobs/deletePlan');
const redisConfig = require('../config/redis');

const jobs = [AvisePlan, AviseEnrollment, DeletePlan];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    // console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

module.exports = new Queue();
