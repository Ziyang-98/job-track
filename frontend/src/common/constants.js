export const DEFAULT_CONTACT = {
  name: "",
  email: "",
  role: "",
  met: "",
};

export const DEFAULT_JOB_APP = {
  company: "",
  status: 0,
  role: "",
  location: "",
  contacts: [
    {
      ...DEFAULT_CONTACT,
    },
  ],
  jobPosting: "",
  dateApplied: null,
  lastContactDate: null,
  notes: "",
  _id: "",
};
