export const REACT_APP_BASE_URL = process.env.REACT_APP_API;
export const REACT_APP_FORGET_PASSWORD_URL =
`${process.env.REACT_APP_API}/j4ids-1.0/svcs`;

export const BUSINESS_ORDER = [
  'businessRegStart',
  'businessInfo',
  'setPassword',
  'securityQuestions',
];

export const BUSINESS_FORM_DATA = {
  userType: 'business',
  poc: '',
  username: '',
  email: '',
  businessName: '',
  businessDivision: '',
  businessStreet: '',
  businessStreet2: '',
  businessCity: '',
  businessState: '',
  businessZip: '',
  password: '',
  confirmPassword: '',
  securityQuestion1: '',
  securityQuestion2: '',
  securityQuestion3: '',
  securityAnswer1: '',
  securityAnswer2: '',
  securityAnswer3: '',
  userPhoneNumber: '',
  companyIndustry: '',
  compnayType: 'private',
  companySize: '',
  rating: '',
  companyOverview: '',
  linkCompany: '',
  linkLinkedIn: '',
  linkTwitter: '',
  linkOther: '',
};

export const DEFAULT_APP = {
  questions: [
    { type: 'text', prompt: 'Name' },
    { type: 'email', prompt: 'Email' },
    { type: 'text', prompt: 'Phone Number' },
    { type: 'text', prompt: 'City' },
    { type: 'text', prompt: 'State' },
    { type: 'file', prompt: 'Please upload your resume', options: ['RESUME'] },
  ],
};

export const STUDENT_ORDER = [
  'studentRegStart',
  'studentInfo',
  'setPassword',
  'securityQuestions',
];

export const STUDENT_FORM_DATA = {
  userType: 'student',
  username: '',
  firstName: '',
  lastName: '',
  age: '',
  email: '',
  addressStreet: '',
  addressStreet2: '',
  addressCity: '',
  addressState: '',
  addressZip: '',
  userPhoneNumber: '',
  institution: '',
  gradYear: '',
  gpa: '',
  major: '',
  password: '',
  confirmPassword: '',
  securityQuestion1: '',
  securityQuestion2: '',
  securityQuestion3: '',
  securityAnswer1: '',
  securityAnswer2: '',
  securityAnswer3: '',
  bio: '',
  linkPortfolio: '',
  linkLinkedIn: '',
  linkTwitter: '',
  linkOther: '',
};

export const ADMIN_ORDER = [
  'adminRegStart',
  'setPassword',
  'securityQuestions',
];

export const ADMIN_FORM_DATA = {
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  securityQuestion1: '',
  securityQuestion2: '',
  securityQuestion3: '',
  securityAnswer1: '',
  securityAnswer2: '',
  securityAnswer3: '',
};

export const FILTER_SECURITY_OPTIONS = [
  {
    value: 'What is the name of your first pet?',
    label: 'What is the name of your first pet?',
  },
  {
    value: 'What is the street of your first home?',
    label: 'What is the street of your first home?',
  },
  {
    value: 'What is the make or model of your first car?',
    label: 'What is the make or model of your first car?',
  },
  {
    value: 'What was your childhood nickname?',
    label: 'What was your childhood nickname?',
  },
  {
    value: 'In what city did you meet your spouse / significant other?',
    label: 'In what city did you meet your spouse / significant other?',
  },
  {
    value: 'What is the name of your favorite childhood friend?',
    label: 'What is the name of your favorite childhood friend?',
  },
  {
    value: 'What street did you live on in third grade?',
    label: 'What street did you live on in third grade?',
  },
  {
    value: 'What is the middle name of your youngest child?',
    label: 'What is the middle name of your youngest child?',
  },
  {
    value: 'What is the middle name of your oldest sibling?',
    label: 'What is the middle name of your oldest sibling?',
  },
  {
    value: 'What school did you attend for sixth grade?',
    label: 'What school did you attend for sixth grade?',
  },
  {
    value: 'What was the name of your first stuffed animal?',
    label: 'What was the name of your first stuffed animal?',
  },
  {
    value: 'In what city or town did your parents meet?',
    label: 'In what city or town did your parents meet?',
  },
];

export const REGISTER_FORM_DATA = {
  businessRegStart: ['poc', 'email', 'username'],
  studentRegStart: [
    'username',
    'firstName',
    'lastName',
    'email',
    'addressStreet',
    'addressStreet2',
    'addressCity',
    'addressState',
    'phoneNumber',
    'addressZip',
  ],
  adminRegStart: [
    'username',
    'firstName',
    'lastName',
    'email',
    'addressStreet',
    'addressStreet2',
    'addressCity',
    'addressState',
    'phoneNumber',
    'addressZip',
  ],
  businessInfo: [
    'businessName',
    'addressStreet',
    'addressStreet2',
    'addressCity',
    'addressState',
    'addressZip',
  ],
  studentInfo: ['school', 'graduationYear', 'gpa'],
  setPassword: ['password', 'confirmPassword'],
  securityQuestions: ['securityAnswer1', 'securityAnswer2', 'securityAnswer3'],
};

export const JOB_FORM_DATA = {
  jobTitle: '',
  jobStreet: '',
  jobStreet2: '',
  jobCity: '',
  jobState: '',
  jobZip: '',
  start: '',
  end: '',
  location: '',
  type: '',
  deadline: '',
  description: '',
  skills: '',
  firstName: '',
  lastName: '',
  title: '',
  email: '',
};

export const LOCATION = ['Remote', 'Hybrid', 'On-Site'];

export const type = ['Full-Time', 'Part-Time', 'Other'];

export const expLevel = [
  'Internship',
  'Entry Level',
  'Associate',
  'Mid-Senior Level',
  'Senior Level',
  'Director',
  'Executive',
];

export const COMPANY_INDUSTRIES = [
  'Aerospace & Defense',
  'Agriculture',
  'Arts & Recreation',
  'Construction & Maintenance',
  'Education',
  'Energy & Utilities',
  'Financial Services',
  'Goverment & Public Administration',
  'Hotels & Travel Accommocation',
  'Human Resources & Staffing',
  'Information Technology',
  'Management & Consulting',
  'Media & Communication',
  'Personal Consumer Services',
  'Pharmaceutical & Biotechonology',
  'Restaurant & Food Service',
  'Transportation & Logistics',
];

export const COMPANY_SIZES = [
  '1 to 9',
  '10 to 49',
  '50 to 149',
  '150 to 249',
  '250 to 499',
  '500 to 749',
  '750 to 999',
  '1000 to 1499',
  '1500 to 2499',
  '2500 to 4999',
  '5000 to 9999',
  '10K +',
  '20K +',
  '50K +',
  '100K +',
];

export const PRONOUNS = ['He/Him', 'She/Her', 'They/Them'];

export const GENDERS = [
  'Male',
  'Female',
  'Bi-sexual',
  'Gay',
  'Transgender',
  'Lesbian',
  'Others',
];

export const JOB_DURATION = [
  { value: 1, label: 'Less than 1 month' },
  { value: 4, label: '1-4 months' },
  { value: 8, label: '5-8 months' },
  { value: 12, label: '9-12 months' },
  { value: 13, label: 'More than 12 months' },
];

export const DATE_POSTED = [
  { value: 2, label: 'Last 48 hrs' },
  { value: 7, label: 'Last 7 days' },
  { value: 30, label: 'Last 30 days' },
  { value: 31, label: 'More than 30 days' },
];

export const usStates = {
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FM: 'Federated States Of Micronesia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};
