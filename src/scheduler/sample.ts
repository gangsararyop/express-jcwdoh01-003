import cron from "node-cron";

/**
 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
 */

const scheduleTask = () => {
  const scheduleRule = "* * * * *";

  cron.schedule(scheduleRule, () => {
    console.log("Task running every minute");
  });
};

export default scheduleTask;
