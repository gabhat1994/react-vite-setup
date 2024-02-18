export const userSessionConfig = {
  sessionDurationSeconds:
    parseInt(process.env.VITE_SESSION_TIME || '120', 10) * 60,
  countdownTimeSeconds:
    parseInt(process.env.VITE_SESSION_COUNT_TIME || '15', 10) * 60,
};
