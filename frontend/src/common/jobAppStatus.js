export const JobAppStatus = {
  planning: 0,
  applied: 1,
  "a/i": 2,
  offered: 3,
  rejected: 4,
};

export const jobAppStatusMap = {
  [JobAppStatus["planning"]]: "Planning to apply",
  [JobAppStatus["applied"]]: "Applied",
  [JobAppStatus["a/i"]]: "Assessment / Interview",
  [JobAppStatus["offered"]]: "Offered",
  [JobAppStatus["rejected"]]: "Rejected",
};
